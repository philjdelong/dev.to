import { h, Component } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

// Imports tags specific to the user and allows search for articles pertaining to search entry
// We can keep this if we're using the same tags for our collections
import {
  defaultState,
  loadNextPage,
  onSearchBoxType,
  performInitialSearch,
  search,
  toggleTag,
  clearSelectedTags,
} from '../searchableItemList/searchableItemList';
import { ItemListItem } from '../src/components/ItemList/ItemListItem';
import { ItemListItemArchiveButton } from '../src/components/ItemList/ItemListItemArchiveButton';
import { ItemListLoadMoreButton } from '../src/components/ItemList/ItemListLoadMoreButton';
import { ItemListTags } from '../src/components/ItemList/ItemListTags';

const STATUS_VIEW_VALID = 'valid';
const STATUS_VIEW_ARCHIVED = 'archived';

// These lines will load the specific collections based on search criteria
const READING_COLLECTIONS_ARCHIVE_PATH = '/reading_collections/archive';
const READING_COLLECTIONS_PATH = '/reading_collections';

// Will show a message if nothing matches search criteria
const FilterText = ({ selectedTags, query, value }) => {
  return (
    <h1>
      {selectedTags.length === 0 && query.length === 0
        ? value
        : 'Nothing with this filter 🤔'}
    </h1>
  );
};

// Exports the ReadingCollection class information to be formatted. NEED HELP
export class ReadingCollection extends Component {
  constructor(props) {
    super(props);

    const { availableTags, statusView } = this.props;
    this.state = defaultState({ availableTags, archiving: false, statusView });

    // bind and initialize all shared functions
    this.onSearchBoxType = debounce(onSearchBoxType.bind(this), 300, {
      leading: true,
    });
    this.loadNextPage = loadNextPage.bind(this);
    this.performInitialSearch = performInitialSearch.bind(this);
    this.search = search.bind(this);
    this.toggleTag = toggleTag.bind(this);
    this.clearSelectedTags = clearSelectedTags.bind(this);
  }

  componentDidMount() {
    const { hitsPerPage, statusView } = this.state;

    this.performInitialSearch({
      containerId: 'reading-collections',
      indexName: 'SecuredReactions',
      searchOptions: {
        hitsPerPage,
        filters: `status:${statusView}`,
      },
    });
  }

  //   Toggle the status of the collection
  toggleStatusView = event => {
    event.preventDefault();

    const { query, selectedTags } = this.state;

    const isStatusViewValid = this.statusViewValid();
    const newStatusView = isStatusViewValid
      ? STATUS_VIEW_ARCHIVED
      : STATUS_VIEW_VALID;

    // update to reading collections from reading list
    const newPath = isStatusViewValid
      ? READING_COLLECTIONS_ARCHIVE_PATH
      : READING_COLLECTIONS_PATH;

    // empty items so that changing the view will start from scratch
    this.setState({ statusView: newStatusView, items: [] });

    this.search(query, {
      page: 0,
      tags: selectedTags,
      statusView: newStatusView,
    });

    // change path in the address bar
    window.history.replaceState(null, null, newPath);
  };

  //   This changes the archive status of an item upon clicking button
  toggleArchiveStatus = (event, item) => {
    event.preventDefault();

    const { statusView, items, totalCount } = this.state;
    window.fetch(`/reading_collections/${item.id}`, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ current_status: statusView }),
      credentials: 'same-origin',
    });
    // count of archived items
    const t = this;
    const newItems = items;
    newItems.splice(newItems.indexOf(item), 1);
    t.setState({
      archiving: true,
      items: newItems,
      totalCount: totalCount - 1,
    });

    // hide the snackbar in a few moments
    setTimeout(() => {
      t.setState({ archiving: false });
    }, 1000);
  };

  // check for view validation
  statusViewValid() {
    const { statusView } = this.state;
    return statusView === STATUS_VIEW_VALID;
  }

  // render this view if items is empty
  renderEmptyItems() {
    const { itemsLoaded, selectedTags, query } = this.state;

    if (itemsLoaded && this.statusViewValid()) {
      return (
        <div className="items-empty">
          <FilterText
            selectedTags={selectedTags}
            query={query}
            value="Your Reading Collections are Lonely"
          />
          <h3>
            Hit the
            <span className="highlight">SAVE</span>
            or
            <span className="highlight">
              Bookmark
              <span role="img" aria-label="Bookmark">
                🔖
              </span>
            </span>
            to start your Collection
          </h3>
        </div>
      );
    }

    // empty items returned
    return (
      <div className="items-empty">
        <FilterText
          selectedTags={selectedTags}
          query={query}
          value="Your Archive List is Lonely"
        />
      </div>
    );
  }

  // render variables as defined above
  render() {
    const {
      items,
      itemsLoaded,
      totalCount,
      availableTags,
      selectedTags,
      showLoadMoreButton,
      archiving,
    } = this.state;

    // return the view status if valid
    const isStatusViewValid = this.statusViewValid();

    // not sure on below line
    const archiveButtonLabel = isStatusViewValid ? 'archive' : 'unarchive';

    // list of rendered items
    const itemsToRender = items.map(item => {
      return (
        <ItemListItem item={item}>
          <ItemListItemArchiveButton
            text={archiveButtonLabel}
            onClick={e => this.toggleArchiveStatus(e, item)}
          />
        </ItemListItem>
      );
    });

    // message display when system is 'working'
    const snackBar = archiving ? (
      <div className="snackbar">
        {isStatusViewValid ? 'Archiving...' : 'Unarchiving...'}
      </div>
    ) : (
      ''
    );

    // return readinglist items based on archived or un-archived 'button toggle' criteria. NEED HELP.
    return (
      <div className="home item-list">
        <div className="side-bar">
          <div className="widget filters">
            <input
              onKeyUp={this.onSearchBoxType}
              placeHolder="search your list"
            />
            <div className="filters-header">
              <h4 className="filters-header-text">my tags</h4>
              {Boolean(selectedTags.length) && (
                <a
                  className="filters-header-action"
                  href={
                    isStatusViewValid
                      ? READING_COLLECTIONS_PATH
                      : READING_COLLECTIONS_ARCHIVE_PATH
                  }
                  onClick={this.clearSelectedTags}
                  data-no-instant
                >
                  clear all
                </a>
              )}
            </div>
            <ItemListTags
              availableTags={availableTags}
              selectedTags={selectedTags}
              onClick={this.toggleTag}
            />

            <div className="status-view-toggle">
              <a
                href={READING_COLLECTIONS_ARCHIVE_PATH}
                onClick={e => this.toggleStatusView(e)}
                data-no-instant
              >
                {isStatusViewValid
                  ? 'View Archive'
                  : 'View Reading Collections'}
              </a>
            </div>
          </div>
        </div>

        <div className="items-container">
          <div className={`results ${itemsLoaded ? 'results--loaded' : ''}`}>
            <div className="results-header">
              {isStatusViewValid ? 'Reading Collection' : 'Archive'}
              {` (${totalCount > 0 ? totalCount : 'empty'})`}
            </div>
            <div>
              {items.length > 0 ? itemsToRender : this.renderEmptyItems()}
            </div>
          </div>

          <ItemListLoadMoreButton
            show={showLoadMoreButton}
            onClick={this.loadNextPage}
          />
        </div>

        {snackBar}
      </div>
    );
  }
}

// What the heck are props
ReadingCollection.defaultProps = {
  statusView: STATUS_VIEW_VALID,
};

ReadingCollection.propTypes = {
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  statusView: PropTypes.oneOf([STATUS_VIEW_VALID, STATUS_VIEW_ARCHIVED]),
};

FilterText.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  query: PropTypes.arrayOf(PropTypes.string).isRequired,
};
