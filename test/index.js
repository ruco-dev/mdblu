#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {
  _internal: {
    setFetcher,
    resetFetcher,
    fetchUrl,
    sha256,
    classifyFile,
    resolveNames,
    sanitizeName,
    ensureRootImport,
    adoptLock,
    readLock,
    writeLock,
  },
} = require('../bin/mdblu.js');

// ─── Test runner ──────────────────────────────────────────────────────────────

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdblu-test-'));
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ─── sha256 ───────────────────────────────────────────────────────────────────

test('sha256: produces 64-char lowercase hex', () => {
  const h = sha256('hello');
  assert.strictEqual(h.length, 64);
  assert(/^[0-9a-f]+$/.test(h));
});

test('sha256: stable — same input same output', () => {
  assert.strictEqual(sha256('abc'), sha256('abc'));
});

test('sha256: sensitive — different content → different hash', () => {
  assert.notStrictEqual(sha256('abc'), sha256('def'));
});

// ─── classifyFile ─────────────────────────────────────────────────────────────

const CONTENT = 'hello world\n';
const HASH = sha256(CONTENT);
const OTHER_HASH = sha256('other content\n');

test('classifyFile: ok — local and upstream match lock', () => {
  assert.strictEqual(classifyFile(CONTENT, HASH, HASH), 'ok');
});

test('classifyFile: edited — local changed, upstream matches lock', () => {
  assert.strictEqual(classifyFile('changed\n', HASH, HASH), 'edited');
});

test('classifyFile: outdated — local matches lock, upstream changed', () => {
  assert.strictEqual(classifyFile(CONTENT, HASH, OTHER_HASH), 'outdated');
});

test('classifyFile: conflict — both local and upstream differ from lock', () => {
  assert.strictEqual(classifyFile('locally changed\n', HASH, OTHER_HASH), 'conflict');
});

test('classifyFile: missing — null local content', () => {
  assert.strictEqual(classifyFile(null, HASH, HASH), 'missing');
});

// ─── sanitizeName ─────────────────────────────────────────────────────────────

test('sanitizeName: passes normal template filename', () => {
  assert.strictEqual(sanitizeName('SPEC.md.template'), 'SPEC.md.template');
});

test('sanitizeName: throws on path traversal (..)', () => {
  assert.throws(() => sanitizeName('../evil.template'), /invalid/);
});

test('sanitizeName: throws on absolute path (/etc/passwd)', () => {
  assert.throws(() => sanitizeName('/etc/passwd'), /invalid/);
});

test('sanitizeName: throws on forward slash in name', () => {
  assert.throws(() => sanitizeName('a/b.template'), /invalid/);
});

test('sanitizeName: throws on backslash in name', () => {
  assert.throws(() => sanitizeName('a\\b.template'), /invalid/);
});

// ─── resolveNames ─────────────────────────────────────────────────────────────

const MOCK_MANIFEST = {
  templates: [
    { name: 'SPEC.md.template', title: 'Spec', type: 'planning', tags: [], sha256: 'aaa', bytes: 100 },
    { name: 'MISSION.md.template', title: 'Mission', type: 'planning', tags: [], sha256: 'bbb', bytes: 200 },
    { name: 'HANDOFF.md.template', title: 'Handoff', type: 'handoff', tags: [], sha256: 'ccc', bytes: 300 },
  ],
};

test('resolveNames: resolves by exact filename', () => {
  const r = resolveNames(['SPEC.md.template'], MOCK_MANIFEST);
  assert.strictEqual(r[0].name, 'SPEC.md.template');
});

test('resolveNames: resolves by short name (SPEC)', () => {
  const r = resolveNames(['SPEC'], MOCK_MANIFEST);
  assert.strictEqual(r[0].name, 'SPEC.md.template');
});

test('resolveNames: resolves by .md name (SPEC.md)', () => {
  const r = resolveNames(['SPEC.md'], MOCK_MANIFEST);
  assert.strictEqual(r[0].name, 'SPEC.md.template');
});

test('resolveNames: case-insensitive', () => {
  const r = resolveNames(['spec'], MOCK_MANIFEST);
  assert.strictEqual(r[0].name, 'SPEC.md.template');
});

test('resolveNames: resolves multiple names', () => {
  const r = resolveNames(['SPEC', 'MISSION'], MOCK_MANIFEST);
  assert.strictEqual(r.length, 2);
  assert.strictEqual(r[0].name, 'SPEC.md.template');
  assert.strictEqual(r[1].name, 'MISSION.md.template');
});

// ─── ensureRootImport ─────────────────────────────────────────────────────────

test('ensureRootImport: creates CLAUDE.md with import if absent', () => {
  withTempDir((dir) => {
    ensureRootImport(dir, false);
    const content = fs.readFileSync(path.join(dir, 'CLAUDE.md'), 'utf8');
    assert(content.includes('@.mdblu/CLAUDE.md'));
  });
});

test('ensureRootImport: appends to existing file without losing content', () => {
  withTempDir((dir) => {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# My Project\n');
    ensureRootImport(dir, false);
    const content = fs.readFileSync(path.join(dir, 'CLAUDE.md'), 'utf8');
    assert(content.includes('# My Project'));
    assert(content.includes('@.mdblu/CLAUDE.md'));
  });
});

test('ensureRootImport: idempotent — does not duplicate import line', () => {
  withTempDir((dir) => {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '@.mdblu/CLAUDE.md\n');
    ensureRootImport(dir, false);
    ensureRootImport(dir, false);
    const content = fs.readFileSync(path.join(dir, 'CLAUDE.md'), 'utf8');
    const count = (content.match(/@\.mdblu\/CLAUDE\.md/g) || []).length;
    assert.strictEqual(count, 1, `expected 1 import line, got ${count}`);
  });
});

test('ensureRootImport: skips when --no-claude-link', () => {
  withTempDir((dir) => {
    ensureRootImport(dir, true);
    assert(!fs.existsSync(path.join(dir, 'CLAUDE.md')));
  });
});

// ─── adoptLock ────────────────────────────────────────────────────────────────

test('adoptLock: creates lockfile hashing all present files', () => {
  withTempDir((dir) => {
    fs.mkdirSync(path.join(dir, 'templates'));
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), 'hello');
    fs.writeFileSync(path.join(dir, 'templates', 'SPEC.md.template'), 'spec content');
    const lock = adoptLock(dir, 'master');
    assert.strictEqual(lock.lockVersion, 1);
    assert.strictEqual(lock.ref, 'master');
    assert('CLAUDE.md' in lock.files);
    assert('templates/SPEC.md.template' in lock.files);
    assert.strictEqual(lock.files['CLAUDE.md'].sha256, sha256('hello'));
    assert.strictEqual(
      lock.files['templates/SPEC.md.template'].sha256,
      sha256('spec content')
    );
    assert(fs.existsSync(path.join(dir, 'mdblu.lock')));
  });
});

test('adoptLock: file readable by readLock', () => {
  withTempDir((dir) => {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), 'x');
    adoptLock(dir, 'v1.0.0');
    const lock = readLock(dir);
    assert(lock !== null);
    assert.strictEqual(lock.ref, 'v1.0.0');
  });
});

test('adoptLock: adopted baseline classifies as ok vs same upstream', () => {
  withTempDir((dir) => {
    fs.mkdirSync(path.join(dir, 'templates'));
    fs.writeFileSync(path.join(dir, 'templates', 'SPEC.md.template'), 'orig');
    const lock = adoptLock(dir, 'master');
    const lockHash = lock.files['templates/SPEC.md.template'].sha256;
    // Same upstream → ok
    assert.strictEqual(classifyFile('orig', lockHash, lockHash), 'ok');
    // Local modification → edited
    assert.strictEqual(classifyFile('modified', lockHash, lockHash), 'edited');
  });
});

// ─── lockfile round-trip ──────────────────────────────────────────────────────

test('lockfile: writeLock and readLock round-trip', () => {
  withTempDir((dir) => {
    const lock = {
      lockVersion: 1,
      source: 'github:ruco-dev/mdblu',
      ref: 'master',
      fetchedAt: '2026-07-05T00:00:00Z',
      files: { 'templates/SPEC.md.template': { sha256: 'abc123' } },
    };
    writeLock(dir, lock);
    const read = readLock(dir);
    assert.deepStrictEqual(read, lock);
  });
});

test('lockfile: readLock returns null when no file', () => {
  withTempDir((dir) => {
    assert.strictEqual(readLock(dir), null);
  });
});

// ─── fetchUrl — redirect depth cap ────────────────────────────────────────────

test('fetchUrl: throws after 5 redirects', async () => {
  setFetcher(() =>
    Promise.resolve({ status: 301, body: '', headers: { location: 'http://example.com/r' } })
  );
  try {
    await fetchUrl('http://example.com/start');
    assert.fail('should have thrown');
  } catch (e) {
    assert(/too many redirects/.test(e.message), `unexpected: ${e.message}`);
  } finally {
    resetFetcher();
  }
});

test('fetchUrl: follows up to 5 redirects then resolves', async () => {
  let calls = 0;
  setFetcher(() => {
    calls++;
    if (calls < 5) {
      return Promise.resolve({
        status: 302,
        body: '',
        headers: { location: `http://example.com/${calls}` },
      });
    }
    return Promise.resolve({ status: 200, body: 'final', headers: {} });
  });
  try {
    const body = await fetchUrl('http://example.com/start');
    assert.strictEqual(body, 'final');
    assert.strictEqual(calls, 5);
  } finally {
    resetFetcher();
  }
});

test('fetchUrl: throws on HTTP 404', async () => {
  setFetcher(() => Promise.resolve({ status: 404, body: 'Not Found', headers: {} }));
  try {
    await fetchUrl('http://example.com/missing');
    assert.fail('should have thrown');
  } catch (e) {
    assert(/HTTP 404/.test(e.message));
  } finally {
    resetFetcher();
  }
});

test('fetchUrl: returns body on 200', async () => {
  setFetcher(() => Promise.resolve({ status: 200, body: 'hello', headers: {} }));
  try {
    const body = await fetchUrl('http://example.com/ok');
    assert.strictEqual(body, 'hello');
  } finally {
    resetFetcher();
  }
});

// ─── Bundled manifest integrity ───────────────────────────────────────────────

test('bundled manifest: file exists and is valid JSON', () => {
  const p = path.join(__dirname, '..', 'templates', 'index.json');
  assert(fs.existsSync(p), 'templates/index.json not found');
  const manifest = JSON.parse(fs.readFileSync(p, 'utf8'));
  assert(Array.isArray(manifest.templates));
  assert(manifest.templates.length > 0);
  assert.strictEqual(manifest.manifestVersion, 1);
});

test('bundled manifest: every entry has name, sha256, bytes', () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'templates', 'index.json'), 'utf8')
  );
  for (const e of manifest.templates) {
    assert(e.name, 'entry missing name');
    assert(e.sha256, `${e.name} missing sha256`);
    assert(typeof e.bytes === 'number', `${e.name} missing bytes`);
  }
});

test('bundled manifest: sha256 matches actual file for first template', () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'templates', 'index.json'), 'utf8')
  );
  const first = manifest.templates[0];
  const actual = fs.readFileSync(
    path.join(__dirname, '..', 'templates', first.name),
    'utf8'
  );
  assert.strictEqual(
    sha256(actual),
    first.sha256,
    `sha256 mismatch for ${first.name} — run: node scripts/build-manifest.js`
  );
});

// ─── propose validation logic ─────────────────────────────────────────────────

function checkConventions(content, name) {
  const errors = [];
  if (!name.endsWith('.md.template')) errors.push('filename');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    errors.push('no-frontmatter');
  } else {
    const fm = fmMatch[1];
    if (!/^title:/m.test(fm)) errors.push('no-title');
    if (!/^type:/m.test(fm)) errors.push('no-type');
    if (!/^tags:/m.test(fm)) errors.push('no-tags');
  }
  if (/- \[[ x]\]/.test(content) && (!/## BOT/.test(content) || !/## HUMAN/.test(content))) {
    errors.push('missing-bot-human');
  }
  if (!/Made with \[mdblu\]/.test(content)) errors.push('no-footer');
  return errors;
}

const VALID_TEMPLATE = [
  '---',
  'title: "My Template"',
  'type: planning',
  'tags: [planning]',
  '---',
  '',
  '# My Template',
  '',
  '*Made with [mdblu](https://github.com/ruco-dev/mdblu) · source: `templates/MY.md.template`*',
  '',
].join('\n');

test('propose validation: valid template passes all checks', () => {
  const errors = checkConventions(VALID_TEMPLATE, 'MY.md.template');
  assert.strictEqual(errors.length, 0, `unexpected errors: ${errors.join(', ')}`);
});

test('propose validation: wrong extension fails filename check', () => {
  assert(checkConventions(VALID_TEMPLATE, 'MY.md').includes('filename'));
});

test('propose validation: missing frontmatter fails', () => {
  assert(
    checkConventions('no frontmatter\n*Made with [mdblu]*\n', 'MY.md.template').includes(
      'no-frontmatter'
    )
  );
});

test('propose validation: missing tags field fails', () => {
  const c = '---\ntitle: "T"\ntype: planning\n---\n*Made with [mdblu]*\n';
  assert(checkConventions(c, 'T.md.template').includes('no-tags'));
});

test('propose validation: checkboxes without BOT/HUMAN fails', () => {
  const c = '---\ntitle: "T"\ntype: planning\ntags: [x]\n---\n- [ ] task\n*Made with [mdblu]*\n';
  assert(checkConventions(c, 'T.md.template').includes('missing-bot-human'));
});

test('propose validation: missing footer fails', () => {
  const c = '---\ntitle: "T"\ntype: planning\ntags: [x]\n---\n# T\n';
  assert(checkConventions(c, 'T.md.template').includes('no-footer'));
});

// ─── Run all tests ────────────────────────────────────────────────────────────

async function run() {
  let passed = 0, failed = 0;
  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (e) {
      console.error(`  ✗ ${name}\n    ${e.message}`);
      failed++;
    }
  }
  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

run();
