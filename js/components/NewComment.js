import React from 'react';
import RegisterForm from './RegisterForm';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    let name = JSON.parse(atob(token.split('.')[1])).username;
    this.state = { name: name };
  }
  componentDidMount() {
    $('#newCommentBody').focus();
  }
  post() {
    if (this.refs.body.value) {
      this.props.post(this.refs.body.value);
    } else {
      alert('Comment cannot be blank');
      $('#newCommentBody').focus();
    }
  }
  discard() {
    this.props.discard();
  }
  render() {
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading">
          <div className="panel-title">
            {this.state.name}
            <span className="new-comment-buttons">
              <button className="btn btn-default" onClick={this.post.bind(this)}>Post</button>
              <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard</button>
            </span>
          </div>
        </div>
        <div className="panel-body">
          <textarea id="newCommentBody" ref="body" rows="4" cols="50">
          </textarea>
        </div>
      </div>
    )
  }
}

export default NewComment;
