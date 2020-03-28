import { h } from 'preact';
import PropTypes from 'prop-types';
import { Article } from './components/Article';

export const CollectionArticles = collection => {
  const articles = JSON.parse(collection.articles);
  const articleList = articles.map(article => {
    return <Article {...article} />;
  });

  return <section className="collection item-wrapper">{articleList}</section>;
};

CollectionArticles.propTypes = {
  collection: PropTypes.string.isRequired,
};
