(function () {
  var container = document.querySelector('.container');
  if (!container) return;

  function getSectionHeading(text) {
    var h2s = container.querySelectorAll('h2');
    for (var i = 0; i < h2s.length; i += 1) {
      if ((h2s[i].textContent || '').trim().toLowerCase() === text.toLowerCase()) {
        return h2s[i];
      }
    }
    return null;
  }

  var storyHeading = getSectionHeading('Recipe Story');
  if (storyHeading) {
    var intro = storyHeading.nextElementSibling;
    if (intro && intro.classList.contains('intro')) {
      intro.classList.add('story-card');

      var storyLayout = intro.querySelector('.chef-bio.reverse') || intro.querySelector('.chef-bio');
      if (storyLayout) {
        storyLayout.classList.add('story-grid');

        var image = storyLayout.querySelector('img');
        if (image && !image.parentElement.classList.contains('story-media')) {
          var figure = document.createElement('figure');
          figure.className = 'story-media';
          image.parentElement.insertBefore(figure, image);
          figure.appendChild(image);
        }

        var textWrap = null;
        var kids = storyLayout.children;
        for (var k = 0; k < kids.length; k += 1) {
          if (kids[k].tagName === 'DIV') {
            textWrap = kids[k];
            break;
          }
        }

        if (textWrap) {
          textWrap.classList.add('story-copy');
        }
      }
    }
  }

  if (!container.querySelector('.recipe-sections')) {
    var ingredientsHeading = getSectionHeading('Ingredients');
    var instructionsHeading = getSectionHeading('Instructions');

    if (ingredientsHeading && instructionsHeading) {
      var wrapper = document.createElement('div');
      wrapper.className = 'recipe-sections';

      var ingredientsCard = document.createElement('section');
      ingredientsCard.className = 'section-card';

      var instructionsCard = document.createElement('section');
      instructionsCard.className = 'section-card';

      container.insertBefore(wrapper, ingredientsHeading);
      wrapper.appendChild(ingredientsCard);
      wrapper.appendChild(instructionsCard);

      var stopForInstructions = instructionsHeading;
      var node = ingredientsHeading;
      while (node && node !== stopForInstructions) {
        var next = node.nextElementSibling;
        ingredientsCard.appendChild(node);
        node = next;
      }

      var stopForAfterInstructions = container.querySelector('.notes, .notes-card, .print-button');
      node = instructionsHeading;
      while (node && node !== stopForAfterInstructions) {
        var nextInstr = node.nextElementSibling;
        instructionsCard.appendChild(node);
        node = nextInstr;
      }

      var stepsList = instructionsCard.querySelector('ol');
      if (stepsList) {
        stepsList.classList.add('steps');
      }
    }
  }

  var notes = container.querySelector('.notes');
  if (notes) {
    notes.classList.add('notes-card');
  }
})();