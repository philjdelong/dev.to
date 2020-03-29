/* eslint-disable camelcase */
import { h } from 'preact';
import PropTypes from 'prop-types';
import { TagDisplay } from './tagDisplay';

export const Article = ({
  title,
  path,
  reading_time,
  cached_tag_list,
  created_at,
}) => {
  const tags = cached_tag_list.split(',');
  const createDate = new Date(created_at);
  const createDay = createDate.getDate();
  const createMonth = createDate.getMonth();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <section className="collection item-wrapper">
      <div className="item">
        <a className="new-collection" href={`${path}`}>
          {`${title}`}
        </a>
        <p>{`Reading Time: ${reading_time} min`}</p>
        <p>{`${monthNames[createMonth]} ${createDay}`}</p>
        <div className="featured-tags tags">
          <TagDisplay tags={tags} />
        </div>
      </div>
    </section>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  reading_time: PropTypes.string.isRequired,
  cached_tag_list: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};
