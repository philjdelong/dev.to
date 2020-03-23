import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
// Is this the connection of the user to the reading list? yes.
import { ReadingList } from '../readingList/readingList';

function loadElement() {
  // CSRF cross site request forgery
  // gets a curretUser object   .then returns a "promise" and when it resolves, the thing in the .then is what it resolves to
  // so it returns a currentuser
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    // document means the entire UI of the site and grabs the reading-list id (element w/ the id of reading list)
    const root = document.getElementById('reading-list');
    if (root) {
      render(
        // data is "passed down"
        <ReadingList
          // availableTags is a PROP
          availableTags={currentUser.followed_tag_names} // so here's the currentUser's followed_tag_names
          statusView={root.dataset.view}
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
