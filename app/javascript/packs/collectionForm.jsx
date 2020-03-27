import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { CollectionForm } from '../readingList/collectionForm';

function loadElement() {
  getUserDataAndCsrfToken().then(() => {
    const root = document.getElementById('collection-list');
    if (root) {
      render(<CollectionForm tagList="" />, root, root.firstElementChild);
    }
  });
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
