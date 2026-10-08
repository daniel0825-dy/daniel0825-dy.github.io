(function () {
  'use strict';
  var input = document.getElementById('article-search-input');
  var list = document.getElementById('article-list');
  var status = document.getElementById('article-search-status');
  var empty = document.getElementById('article-page-empty');
  var pagination = document.getElementById('article-pagination');
  if (!list || !status || !empty || !pagination) return;
  var pageSize = 10;
  var currentPage = 1;
  var indexRequest = null;
  var indexReady = false;
  var indexFailed = false;
  var searchTimer;
  function normalize(text) { return text.normalize('NFKC').toLocaleLowerCase(); }
  var items = Array.prototype.map.call(list.querySelectorAll('.post-list-item'), function (element) {
    return { element: element, url: element.getAttribute('data-url'), text: normalize(element.getAttribute('data-search') || '') };
  });
  function loadIndex() {
    if (indexRequest) return;
    indexRequest = fetch(list.getAttribute('data-search-index')).then(function (response) {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.json();
    }).then(function (posts) {
      var texts = new Map(posts.map(function (post) { return [post.url, normalize(post.text)]; }));
      items.forEach(function (item) { if (texts.has(item.url)) item.text = texts.get(item.url); });
      indexReady = true;
      render();
    }).catch(function () {
      indexFailed = true;
      render();
    });
  }
  function pageUrl(page) {
    var url = new URL(window.location.href);
    if (page === 1) url.searchParams.delete('page');
    else url.searchParams.set('page', page);
    if (input && input.value.trim()) url.searchParams.set('q', input.value.trim());
    else url.searchParams.delete('q');
    return url.pathname + url.search + url.hash;
  }
  function addLink(page, text, label) {
    var link = document.createElement('a');
    link.className = 'article-page-link';
    link.href = pageUrl(page);
    link.textContent = text;
    link.setAttribute('aria-label', label);
    if (page === currentPage && text === String(page)) link.setAttribute('aria-current', 'page');
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      currentPage = page;
      window.history.pushState(null, '', pageUrl(page));
      render();
      var selected = pagination.querySelector('[aria-current="page"]');
      if (selected) selected.focus();
    });
    pagination.appendChild(link);
  }
  function render() {
    var query = input ? input.value.normalize('NFKC').trim().toLocaleLowerCase() : '';
    if (query && !indexReady && !indexFailed) loadIndex();
    var terms = query ? query.split(/\s+/) : [];
    var matches = items.filter(function (item) {
      return terms.every(function (term) { return item.text.indexOf(term) !== -1; });
    });
    // Reserve pages 1-3 even before enough posts are available.
    var totalPages = Math.max(3, Math.ceil(matches.length / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    items.forEach(function (item) { item.element.hidden = true; });
    var visible = matches.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    visible.forEach(function (item) { item.element.hidden = false; });
    status.hidden = !query;
    status.textContent = matches.length ? '검색 결과 ' + matches.length + '개' : '검색 결과가 없습니다.';
    if (query && !indexReady) status.textContent = indexFailed ? '본문 검색을 불러오지 못했습니다. 제목·요약·분류·태그로 검색합니다.' : '본문 검색 데이터를 불러오는 중입니다.';
    list.setAttribute('aria-busy', String(!!query && !indexReady && !indexFailed));
    empty.hidden = visible.length > 0 || (!!query && matches.length === 0);
    pagination.textContent = '';
    if (currentPage > 1) addLink(currentPage - 1, '‹', '이전 페이지');
    var candidates = totalPages <= 7 ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, currentPage - 1, currentPage, currentPage + 1, totalPages];
    var numbers = candidates.filter(function (page, index) {
      return page >= 1 && page <= totalPages && candidates.indexOf(page) === index;
    }).sort(function (a, b) { return a - b; });
    numbers.forEach(function (page, index) {
      if (index && page - numbers[index - 1] > 1) {
        var gap = document.createElement('span');
        gap.className = 'article-page-gap';
        gap.textContent = '…';
        gap.setAttribute('aria-hidden', 'true');
        pagination.appendChild(gap);
      }
      addLink(page, String(page), page + '페이지');
    });
    if (currentPage < totalPages) addLink(currentPage + 1, '›', '다음 페이지');
  }
  function restore() {
    var params = new URL(window.location.href).searchParams;
    var page = Number(params.get('page'));
    currentPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
    if (input) input.value = params.get('q') || '';
    render();
  }
  if (input) {
    function search() {
      clearTimeout(searchTimer);
      currentPage = 1;
      render();
      window.history.replaceState(null, '', pageUrl(currentPage));
    }
    input.form.addEventListener('submit', function (event) { event.preventDefault(); search(); });
    input.addEventListener('input', function () { clearTimeout(searchTimer); searchTimer = setTimeout(search, 150); });
    input.addEventListener('search', search);
  }
  window.addEventListener('popstate', restore);
  restore();
})();
