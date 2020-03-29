import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { Collection } from './components/Collection';

export class CollectionList extends Component {
  constructor({ collections }) {
    super({ collections });

    this.state = {
      collections,
    };
  }

  render() {
    const { collections } = this.state;
    const collectionsToRender = collections.map(collection => {
      return (
        <Collection
          key={collection.id}
          name={collection.name}
          tags={collection.tag_list}
          slug={collection.slug}
        />
      );
    });

    return (
      <section
        className="collection-cont results results--loaded"
        id="reading-collection"
      >
        <div className="results-header collection-header">
          {collections.length
            ? `Collections (${collections.length})`
            : 'Collections'}
          <a className="new-collection" href="/readingcollections/new">
            +
          </a>
        </div>
        {collectionsToRender}
      </section>
    );
  }
}

CollectionList.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object).isRequired,
};
