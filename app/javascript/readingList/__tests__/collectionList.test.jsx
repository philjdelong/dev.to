import { h } from 'preact';
import render from 'preact-render-to-json';
import { CollectionList } from '../collectionList';
import { mockCollectionList } from '../mocks/mockTestData';

describe('<CollectionList />', () => {
  it('renders properly', () => {
    const tree = render(<CollectionList collections={mockCollectionList} />);
    expect(tree).toMatchSnapshot();
  });
});
