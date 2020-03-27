import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import linkState from 'linkstate';
import Tags from '../shared/components/tags';

export class CollectionForm extends Component {
  constructor({ tagList }) {
    super({ tagList });
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      title: '',
      tagList,
      // auth: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitCollection = (e, title, tags) => {
    // check that tag length is > 1, title req handled on input
    // need to modify route also and ensure error handling is included.
    e.preventDefault();
    fetch('/reading_collections', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        tags,
      }),
      credentials: 'same-origin',
    });
  };

  render() {
    const { tagList } = this.state;

    return (
      <div className="articleformcontainer">
        <section className="articleform">
          <form className="articleform__form">
            <h1>Add your new collection</h1>
            <input
              type="text"
              name="title"
              placeholder="Title..."
              onChange={this.handleChange}
              className="articleform__title"
              required
            />
            <Tags
              defaultValue={tagList}
              onInput={linkState(this, 'tagList')}
              maxTags={4}
              autoComplete="off"
              classPrefix="articleform"
            />
            {/* <h4>{`${this.state.error}`}</h4> */}
            <a
              className="articleform__buttons--publish collection-btn"
              type="button"
              href="readinglist"
            >
              CREATE COLLECTION
            </a>
          </form>
        </section>
      </div>
    );
  }
}

CollectionForm.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
