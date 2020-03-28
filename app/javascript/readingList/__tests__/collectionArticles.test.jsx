import { h } from 'preact';
import render from 'preact-render-to-json';
import { CollectionArticles } from '../collectionArticles';

describe('<CollectionForm />', () => {
  it.skip('renders properly', () => {
    const tree = render(<CollectionArticles />);
    expect(tree).toMatchSnapshot();
  });
});
