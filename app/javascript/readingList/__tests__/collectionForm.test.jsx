import { h } from 'preact';
import render from 'preact-render-to-json';
import { CollectionForm } from '../collectionForm';

describe('<CollectionForm />', () => {
  let tree;

  beforeEach(() => {
    tree = render(<CollectionForm />);
  });

  it('renders properly', () => {
    expect(tree).toMatchSnapshot();
  });

  it.skip('should update state on input', () => {
    const mockEvent = { target: { name: 'title', value: 'Test collection' } };

    tree
      .find('input')
      .at(0)
      .simulate('change', mockEvent);

    expect(tree.state('name')).toEqual('Test collection');
  });
});
