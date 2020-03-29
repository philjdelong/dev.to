import { h } from 'preact';
import render from 'preact-render-to-json';
import { CollectionArticles } from '../collectionArticles';
import { mockArticlesRaw, mockCollectionRaw } from '../mocks/mockTestData';

describe('<CollectionArticles />', () => {
  it('renders properly', () => {
    const tree = render(
      <CollectionArticles
        articles={mockArticlesRaw}
        collection={mockCollectionRaw}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
