import { h } from 'preact';
import render from 'preact-render-to-json';
import { CollectionForm } from '../collectionForm';

describe('<CollectionForm />', () => {
  it('renders properly', () => {
    const tree = render(<CollectionForm tagList="" />);
    expect(tree).toMatchSnapshot();
  });
});
