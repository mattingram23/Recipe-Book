(function () {
  var body = document.body;
  if (!body) return;

  var key = body.dataset.recipeKey;
  if (!key || !window.RECIPE_META || !window.RECIPE_META[key]) return;

  var meta = window.RECIPE_META[key];

  var pageTitle = document.querySelector('.container > h1');
  if (pageTitle && meta.title) {
    pageTitle.textContent = meta.title;
  }

  if (meta.title) {
    document.title = meta.title + ' | My Recipe Collection';
  }

  var breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.textContent = '';

    var homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.textContent = 'Home';
    breadcrumb.appendChild(homeLink);

    var sep1 = document.createElement('span');
    sep1.textContent = '>';
    breadcrumb.appendChild(sep1);

    var categoryLink = document.createElement('a');
    categoryLink.href = 'categories.html';
    categoryLink.textContent = meta.crumb || 'Category';
    breadcrumb.appendChild(categoryLink);

    var sep2 = document.createElement('span');
    sep2.textContent = '>';
    breadcrumb.appendChild(sep2);

    var current = document.createElement('span');
    current.setAttribute('aria-current', 'page');
    current.textContent = meta.title || 'Recipe';
    breadcrumb.appendChild(current);
  }

  var facts = document.querySelector('.recipe-quick-facts');
  if (facts) {
    facts.textContent = '';

    function addFact(label, value) {
      var wrap = document.createElement('div');
      wrap.className = 'recipe-fact';

      var dt = document.createElement('dt');
      dt.textContent = label;

      var dd = document.createElement('dd');
      dd.textContent = value || 'TBD';

      wrap.appendChild(dt);
      wrap.appendChild(dd);
      facts.appendChild(wrap);
    }

    addFact('Category', meta.category);
    addFact('Prep Time', meta.prepTime);
    addFact('Cook Time', meta.cookTime);
    addFact('Servings', meta.servings);
  }
})();