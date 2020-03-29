import { h } from 'preact';
import PropTypes from 'prop-types';
import { TagDisplay } from './tagDisplay';

export const Collection = ({ name, slug, tags }) => {
  return (
    <section className="collection item-wrapper">
      <div className="item">
        <a href={`/readingcollections/${slug}`} className="item-title">
          {`${name}`}
        </a>
        <TagDisplay tags={tags} />
      </div>
    </section>
  );
};

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array.isRequired,
};
