import { h } from 'preact';
import PropTypes from 'prop-types';
import { Collection } from './components/Collection';

export const CollectionList = ({ collections }) => {
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
    <div
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
    </div>
  );
};

CollectionList.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object).isRequired,
};
