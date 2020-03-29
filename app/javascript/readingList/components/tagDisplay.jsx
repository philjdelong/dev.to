import { h } from 'preact';
import PropTypes from 'prop-types';

export const TagDisplay = ({ tags }) => {
  const tagDisp = tags.map(tagRaw => {
    const tag = tagRaw.trim();
    return (
      <a href={`/t/${tag}`}>
        <span className="tag">{` #${tag}`}</span>
      </a>
    );
  });
  return <section className="tag-display">{tagDisp}</section>;
};

TagDisplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array.isRequired,
};
