#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'templates');
const SKILLS_DIR = path.join(REPO_ROOT, 'skills');
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

  const descM = yaml.match(/^description:\s*"?(.+?)"?\s*$/m);
  if (descM) result.description = descM[1].trim().replace(/^["']|["']$/g, '');

  const useWhenM = yaml.match(/^use_when:\s*"?(.+?)"?\s*$/m);
  if (useWhenM) result.use_when = useWhenM[1].trim().replace(/^["']|["']$/g, '');

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

  const relatedInline = yaml.match(/^related_skills:\s*\[(.+?)\]/m);
  if (relatedInline) {
    result.related_skills = relatedInline[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
  } else {
    const relatedBlock = yaml.match(/^related_skills:\s*\n((?:\s+-[^\n]+\n?)+)/m);
    if (relatedBlock) {
      result.related_skills = relatedBlock[1].trim().split('\n')
        .map(s => s.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, ''));
    }
  }

  return result;
}

function buildSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  const skills = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
        const content = fs.readFileSync(full, 'utf8');
        const fm = parseFrontmatter(content);
        const rel = path.relative(SKILLS_DIR, full);
        skills.push({
          name: rel,
          title: fm.title || entry.name.replace('.md', ''),
          type: fm.type || 'skill',
          description: fm.description || '',
          use_when: fm.use_when || '',
          tags: fm.tags || [],
          related_skills: fm.related_skills || [],
          sha256: sha256(content),
          bytes: Buffer.byteLength(content, 'utf8'),
        });
      }
    }
  }
  walk(SKILLS_DIR);
  return skills.sort((a, b) => a.name.localeCompare(b.name));
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

  const skills = buildSkills();

  const manifest = {
    manifestVersion: 1,
    generated: new Date().toISOString(),
    templates,
    skills,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`manifest: wrote ${templates.length} templates, ${skills.length} skills → templates/index.json`);
}

buildManifest();
