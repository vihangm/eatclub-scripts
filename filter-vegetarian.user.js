// ==UserScript==
// @name           EatClub: Veggie Dish Filter
// @version        1.0.2
// @description    Changes filenames in Differential into sticky headers.
// @match          https://www.eatclub.com/*
// ==/UserScript==

var menu = window.document.querySelector('div.page-wrapper');

function filterItems() {
  var menuItems = window.document.querySelectorAll('div[ec-menu-item].ng-scope:not(.banner-1-menu-item)');
  menuItems.forEach(function(item) {
    var itemTags = item.querySelector('.mi-info-bottom .mi-dish-tags');
    var hasVegetarian = itemTags.querySelector('span[data-content="Vegetarian"]');
    var hasVegan = itemTags.querySelector('span[data-content="Vegan"]');
    if (hasVegetarian == null && hasVegan == null) {
      item.hidden = true;
    }
  });
};

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      filterItems();
    }
  });
});

observer.observe(menu, { childList: true, subtree: true });
