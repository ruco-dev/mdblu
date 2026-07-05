#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'templates');
const MANIFEST_PATH = path.join(TEMPLATES_DIR, 'index.json');

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};

  const titleM = yaml.match(/^title:\s*"?(.+?)"?\s*$/m);
  if (titleM) result.title = titleM[1].trim().replace(/^["']|["']$/g, '');

  const typeM = yaml.match(/^type:\s*(.+?)\s*$/m);
  if (typeM) result.type = typeM[1].trim().replace(/^["']|["']$/g, '');

  const tagsInline = yaml.match(/^tags:\s*\[(.+?)\]/m);
  if (tagsInline) {
    result.tags = tagsInline[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
  } else {
    const tagsBlock = yaml.match(/^tags:\s*\n((?:\s+-[^\n]+\n?)+)/m);
    if (tagsBlock) {
      result.tags = tagsBlock[1].trim().split('\n')
        .map(s => s.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, ''));
    }
  }

  return result;
}

function buildManifest() {
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.template'))
    .sort();

  const templates = files.map(name => {
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf8');
    const fm = parseFrontmatter(content);
    return {
      name,
      title: fm.title || name.replace('.template', ''),
      type: fm.type || 'unknown',
      tags: fm.tags || [],
      sha256: sha256(content),
      bytes: Buffer.byteLength(content, 'utf8'),
    };
  });

  const manifest = {
    manifestVersion: 1,
    generated: new Date().toISOString(),
    templates,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`manifest: wrote ${templates.length} entries → templates/index.json`);
}

buildManifest();
