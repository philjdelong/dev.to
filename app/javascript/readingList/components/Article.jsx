/* eslint-disable camelcase */
import { h } from 'preact';
import PropTypes from 'prop-types';

export const Article = ({
  title,
  path,
  reading_time,
  cached_tag_list,
  created_at,
}) => {
  const tags = cached_tag_list.split(',');
  const tagDisp = tags.map(tagRaw => {
    const tag = tagRaw.trim();
    return (
      <a href={`/t/${tag}`}>
        <span className="tag">{` #${tag}`}</span>
      </a>
    );
  });
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
    <section className="coll-article">
      <a className="new-collection" href={`${path}`}>
        {`${title}`}
      </a>
      <p>{`Reading Time: ${reading_time} min`}</p>
      <p>{`${monthNames[createMonth]} ${createDay}`}</p>
      <div className="featured-tags tags">{tagDisp}</div>
      {/* <a href={`${story.cached_user.username}`} className="small-pic-link-wrapper" /> */}
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
