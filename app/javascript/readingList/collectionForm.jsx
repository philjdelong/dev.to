import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import linkState from 'linkstate';
import Tags from '../shared/components/tags';

export class CollectionForm extends Component {
  constructor({ tagList }) {
    super({ tagList });
    this.state = {
      title: '',
      tagList,
      error: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitCollection = (e, title, tags) => {
    e.preventDefault();
    const tagArr = tags.split(',');
    if (title.length && tags.length) {
      fetch('/api/reading_collections', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-CSRF-Token': window.csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          tag_list: tagArr,
        }),
        credentials: 'same-origin',
      }).then(() => {
        window.location.href = '/readinglist';
      });
    } else {
      this.setState({ error: 'Please fill out fields' });
    }
  };

  render() {
    const { title, tagList, error } = this.state;

    return (
      <section className="articleform">
        <form className="articleform__form">
          <h1>Add your new collection</h1>
          <input
            type="text"
            name="title"
            placeholder="Collection Name..."
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
          <h4>{`${error}`}</h4>
          <button
            className="articleform__buttons--publish button collection-btn"
            type="button"
            onClick={e => this.submitCollection(e, title, tagList)}
          >
            CREATE COLLECTION
          </button>
        </form>
      </section>
    );
  }
}

CollectionForm.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
