(function () {
  'use strict';

  var input = document.getElementById('article-search-input');
  var list = document.getElementById('article-list');
  var status = document.getElementById('article-search-status');
  if (!input || !list || !status) return;

  var items = Array.prototype.map.call(list.querySelectorAll('.post-list-item'), function (element) {
    return { element: element, text: (element.getAttribute('data-search') || '').normalize('NFKC').toLocaleLowerCase() };
  });

  function search() {
    var query = input.value.normalize('NFKC').trim().toLocaleLowerCase();
    var terms = query ? query.split(/\s+/) : [];
    var count = 0;
    items.forEach(function (item) {
      var match = terms.every(function (term) { return item.text.indexOf(term) !== -1; });
      item.element.hidden = !match;
      if (match) count += 1;
    });
    status.hidden = !query;
    status.textContent = count ? '검색 결과 ' + count + '개' : '검색 결과가 없습니다.';
  }

  input.form.addEventListener('submit', function (event) {
    event.preventDefault();
    search();
  });
  input.addEventListener('input', search);
  input.addEventListener('search', search);
  search();
})();
