chrome.runtime.sendMessage({
  event: 'pageAction:show'
});

function filterItems(filters) {
  var data = JSON.parse(filters);
  var selected = [];
  Object.keys(data).forEach(function(key) {
    if (data[key]) {
      selected.push(key);
    }
  });
  var showAll = (selected.length === 0);

  var menuItems = window.document.querySelectorAll('div[ec-menu-item].ng-scope');
  menuItems.forEach(function(item) {
    if (showAll) {
      item.hidden = false;
      return;
    }

    var itemTags = item.querySelector('.mi-info-bottom .mi-dish-tags');
    var hasAllSelected = true;
    selected.forEach(function(type) {
      var hasType = !!itemTags.querySelector('span[data-content="' + type + '"]');
      if (type === 'Vegetarian') {
        hasType = hasType || !!itemTags.querySelector('span[data-content="Vegan"]');
      }

      hasAllSelected = hasAllSelected && hasType;
    });
    if (!hasAllSelected) {
      item.hidden = true;
    } else {
      item.hidden = false;
    }
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace !== 'sync') {
    return;
  }

  if (changes.filters) {
    filterItems(changes.filters.newValue);
  }
});

var menu = window.document.querySelector('div.page-wrapper');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      chrome.storage.sync.get('filters', function(data) {
        if (data.filters === undefined) {
          return;
        }

        filterItems(data.filters);
      });
    }
  });
});

observer.observe(menu, { childList: true, subtree: true });
