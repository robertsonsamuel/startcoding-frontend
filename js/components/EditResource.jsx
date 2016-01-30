import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import {genErr} from '../util/alerts';

class EditResource extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('#editResourceBody').focus();
    this.refs.editText.value = this.props.body;
  }
  update() {
    if (this.refs.editText.value) {
      this.props.update(this.refs.editText.value);
    } else {
      genErr('Resource cannot be blank');
      $('#editResourceBody').focus();
    }
  }
  discard() {
    this.props.discard();
  }
  render() {
    return (
      <div>
        <textarea id="editResourceBody"
          className="form-control"
          ref="editText"
          rows="4"></textarea>
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
