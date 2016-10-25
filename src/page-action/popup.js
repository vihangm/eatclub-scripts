window.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('filters', function(data) {
    var filters;
    if (data.filters === undefined) {
      filters = {
        'Vegan': false,
        'Vegetarian': false,
        'Gluten Free': false,
        'Dairy Free': false,
        'Paleo': false,
        'Spicy': false
      };
    } else {
      filters = JSON.parse(data.filters);
    }

    document.body.querySelectorAll('input').forEach(function(input) {
      input.checked = filters[input.value];
      input.addEventListener('change', function() {
        filters[input.value] = input.checked;
        chrome.storage.sync.set({
          'filters': JSON.stringify(filters)
        });
      });
    });
  });
});