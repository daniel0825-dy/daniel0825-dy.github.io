// Run after bundle exec jekyll build: node .script/check-site.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve('_site');
const index = JSON.parse(fs.readFileSync(path.join(root, 'search.json'), 'utf8'));
assert(index.length > 0);
for (const post of index) {
  assert.equal(typeof post.text, 'string');
  assert(fs.existsSync(path.join(root, decodeURIComponent(post.url), 'index.html')), 'Missing indexed post: ' + post.url);
}
let pages = 0;
let references = 0;
const missing = [];
function visit(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.name.endsWith('.html')) {
      pages++;
      const html = fs.readFileSync(file, 'utf8');
      for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
        const link = match[1].replace(/&amp;/g, '&');
        if (/^(?:[a-z]+:|\/\/)/i.test(link)) continue;
        const url = decodeURIComponent(link.split(/[?#]/)[0]);
        if (!url) continue;
        const target = url.startsWith('/') ? path.join(root, url) : path.resolve(path.dirname(file), url);
        references++;
        if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) missing.push(path.relative(root, file) + ' → ' + link);
      }
    }
  }
}
visit(root);
assert.deepEqual(missing, [], 'Broken internal resource/link paths');
const preview = fs.readFileSync(path.join(root, 'posts/research-style-preview/index.html'), 'utf8');
assert(preview.includes('Oct 9, 2026'), 'Publication date must remain October 9 in UTC build environments');
assert(fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('>2026.10.09</time>'), 'List date must use the configured Korean timezone');
for (const marker of ['<table>', 'class="image-caption"', 'class="source"', 'class="footnotes"', '\\[g = \\frac', 'language-mermaid', 'research-content.js']) assert(preview.includes(marker), 'Missing preview element: ' + marker);
assert.equal((preview.match(/language-mermaid/g) || []).length, 3); // two blocks + include selector
assert(!fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('본문 너비 안에서 줄바꿈됩니다'), 'Main page must not embed full post bodies');
console.log(`PASS: ${pages} HTML pages, ${references} internal resources/links, ${index.length} search entries, report elements`);
