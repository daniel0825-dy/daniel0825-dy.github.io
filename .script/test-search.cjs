// Run with: node .script/test-search.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/js/article-search.js', 'utf8');
class Element {
  constructor(attrs = {}) { this.attrs = attrs; this.children = []; this.events = {}; this.hidden = false; this.value = ''; }
  getAttribute(key) { return this.attrs[key] || null; }
  setAttribute(key, value) { this.attrs[key] = value; }
  addEventListener(name, fn) { this.events[name] = fn; }
  set textContent(value) { this.text = value; this.children = []; }
  get textContent() { return this.text || ''; }
  appendChild(child) { this.children.push(child); }
  querySelectorAll() { return this.children; }
  querySelector() { return this.children.find(x => x.attrs['aria-current']); }
  focus() {}
}
function harness(count, failed = false) {
  const elements = Object.fromEntries(['article-search-input', 'article-list', 'article-search-status', 'article-page-empty', 'article-pagination'].map(id => [id, new Element()]));
  const input = elements['article-search-input'];
  input.form = new Element();
  const list = elements['article-list'];
  list.attrs['data-search-index'] = '/search.json';
  list.children = Array.from({length: count}, (_, i) => new Element({'data-search': '제목 ' + i, 'data-url': '/posts/' + i + '/'}));
  let fetches = 0;
  const window = {location: {href: 'https://example.com/'}, addEventListener(name, fn) { this[name] = fn; }};
  window.history = Object.fromEntries(['pushState', 'replaceState'].map(name => [name, (_, __, url) => { window.location.href = new URL(url, window.location.href).href; }]));
  const context = {
    document: {getElementById: id => elements[id], createElement: () => new Element()},
    window, URL, Map, setTimeout, clearTimeout,
    fetch: async () => { fetches++; return {ok: !failed, json: async () => list.children.map((_, i) => ({url: '/posts/' + i + '/', text: '제목 ' + i + (i === 20 ? ' 본문전용검색어' : '')}))}; }
  };
  vm.runInNewContext(source, context);
  return {elements, input, list, window, fetches: () => fetches, visible: () => list.children.filter(x => !x.hidden), search: value => {input.value = value; input.events.search();}};
}
async function run() {
  const h = harness(81);
  assert.equal(h.fetches(), 0, 'Initial page must not load article bodies');
  assert.equal(h.visible().length, 10);
  h.elements['article-pagination'].children.find(x => x.attrs['aria-label'] === '2페이지').events.click({button: 0, preventDefault() {}});
  assert.equal(h.visible()[0].attrs['data-url'], '/posts/10/');
  assert.match(h.window.location.href, /page=2/);
  h.window.location.href = 'https://example.com/?page=9'; h.window.popstate();
  assert.equal(h.visible().length, 1);
  assert(h.elements['article-pagination'].children.some(x => x.textContent === '…'));
  h.search('본문전용검색어');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(h.fetches(), 1);
  assert.equal(h.visible().length, 1);
  assert.equal(h.visible()[0].attrs['data-url'], '/posts/20/');
  h.search('제목'); assert.equal(h.fetches(), 1); assert.equal(h.visible().length, 10);
  h.search('없음'); assert.equal(h.visible().length, 0); assert.match(h.elements['article-search-status'].textContent, /없습니다/);
  h.search(''); assert.equal(h.visible().length, 10);
  const empty = harness(0); assert.equal(empty.elements['article-pagination'].children.length, 4); assert.equal(empty.elements['article-page-empty'].hidden, false);
  const fallback = harness(21, true); fallback.search('제목 20');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(fallback.visible().length, 1); assert.match(fallback.elements['article-search-status'].textContent, /불러오지/);
  console.log('PASS: pagination, history, reserved pages, lazy full-text search, index reuse, empty results and network fallback');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
