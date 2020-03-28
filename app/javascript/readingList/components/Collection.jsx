import { h } from 'preact';
import PropTypes from 'prop-types';

export const Collection = ({ name, slug }) => {
  return (
    <section className="collection item-wrapper">
      <div className="item">
        <a href={`/readingcollections/${slug}`} className="item-title">
          {`${name}`}
        </a>
      </div>
    </section>
  );
};

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
