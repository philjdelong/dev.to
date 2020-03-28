import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { CollectionArticles } from '../readingList/collectionArticles';

function loadElement() {
  getUserDataAndCsrfToken().then(() => {
    const root = document.getElementById('collection-articles');
    if (root) {
      render(
        <CollectionArticles
          articles={root.dataset.articles}
          collection={root.dataset.collection}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
