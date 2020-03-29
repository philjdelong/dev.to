import { h } from 'preact';
import render from 'preact-render-to-json';
import { ReadingList } from '../readingList';
import { mockCollectionList } from '../mocks/mockTestData';

describe('<ReadingList />', () => {
  it('renders properly', () => {
    const tree = render(
      <ReadingList
        availableTags={['discuss']}
        collections={mockCollectionList}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
