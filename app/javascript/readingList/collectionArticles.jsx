import { h } from 'preact';
import PropTypes from 'prop-types';
import { Article } from './components/Article';

export const CollectionArticles = ({ collection, articles }) => {
  const collectionParse = JSON.parse(collection);
  const articlesParse = JSON.parse(articles);
  const articleList = articlesParse.map(article => {
    return <Article {...article} />;
  });

  return (
    <div className="items-container">
      <section className="collection-cont results results--loaded">
        <div className="results-header collection-header">
          {`${collectionParse.name}`}
        </div>
        {articleList}
      </section>
    </div>
  );
};

CollectionArticles.propTypes = {
  collection: PropTypes.string.isRequired,
  articles: PropTypes.string.isRequired,
};
