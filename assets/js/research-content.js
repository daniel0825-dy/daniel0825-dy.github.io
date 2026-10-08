(function () {
  'use strict';
  document.querySelectorAll('.post-content table').forEach(function (table, index) {
    var region = document.createElement('div');
    region.className = 'table-scroll';
    region.tabIndex = 0;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', table.caption ? table.caption.textContent : '표 ' + (index + 1) + ' (가로 스크롤)');
    table.parentNode.insertBefore(region, table);
    region.appendChild(table);
  });
})();
