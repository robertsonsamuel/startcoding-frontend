import React from 'react';
import RegisterForm from './RegisterForm';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('#editCommentBody').focus();
    this.refs.editText.value = this.props.body;
  }
  update() {
    if (this.refs.editText.value) {
      this.props.update(this.refs.editText.value);
    } else {
      alert('Comment cannot be blank');
      $('#editCommentBody').focus();
    }
  }
  discard() {
    this.props.discard();
  }
  render() {
    return (
      <div>
        <textarea id="editCommentBody"
          className="form-control"
          ref="editText"
          rows="4"></textarea>
        <span className="new-comment-buttons">
          <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard</button>
          <button className="btn btn-primary" onClick={this.update.bind(this)}>Save Edit</button>
        </span>
      </div>
    )
  }
}

export default EditComment;
