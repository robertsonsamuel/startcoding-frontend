import React from 'react';
import {genErr} from '../util/alerts';
import {MAX_RESOURCE_BODY_LENGTH} from '../util/CONST.js';

class EditResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editText: '' };
  }

  componentDidMount() {
    $('#editResourceBody').focus();
    this.setState({ editText: this.props.body });
  }

  update() {
    if (this.state.editText) {
      this.props.update(this.state.editText);
    } else {
      genErr('Resource cannot be blank');
      $('#editResourceBody').focus();
    }
  }

  discard() {
    this.props.discard();
  }

  handleBodyChange(e) {
    if (e.target.value.length > MAX_RESOURCE_BODY_LENGTH) {
      let allowedText = e.target.value.slice(0, MAX_RESOURCE_BODY_LENGTH);
      this.setState({ editText: allowedText });
    } else {
      this.setState({ editText: e.target.value });
    }
  }

  render() {
    return (
      <div>
        <textarea id="editResourceBody"
                  className="form-control"
                  placeholder="Description Required"
                  value={this.state.editText}
                  onChange={this.handleBodyChange.bind(this)}
                  rows="4">
        </textarea>
        <span className="new-comment-buttons">
          <span className="markdownNotice">*Your post will render <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!</span>
          <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard Changes</button>
          <button className="btn btn-primary" onClick={this.update.bind(this)}>Save Edit</button>
        </span>
      </div>
    )
  }
}

export default EditResource;
