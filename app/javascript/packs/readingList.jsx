import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { ReadingList } from '../readingList/readingList';

function loadElement() {
  // fetch user information and auth token 
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    // target div from reading list view
    const root = document.getElementById('reading-list');
    // render the ReadingList component with user data and data passed from div
    if (root) {
      render(
        <ReadingList
          availableTags={currentUser.followed_tag_names}
          statusView={root.dataset.view}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

// utilize InstantClick to pre-render on hover
window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
