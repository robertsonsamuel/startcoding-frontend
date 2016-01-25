import React from 'react';
import RegisterForm from './RegisterForm';
import {genErr} from '../util/alerts';
import {canHazToken} from '../util/authorization';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    let name = canHazToken().username;
    this.state = { name: name };
  }
  componentDidMount() {
    $('#newCommentBody').focus();
  }
  post() {
    if (this.refs.body.value) {
      this.props.post(this.refs.body.value);
    } else {
      genErr('Comment cannot be blank');
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
          </div>
        </div>
        <div className="panel-body">
          <textarea id="newCommentBody" className="form-control" ref="body" rows="4">
          </textarea>
          <span className="new-comment-buttons">
            <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard</button>
            <button className="btn btn-primary" onClick={this.post.bind(this)}>Post</button>
            <span className="markdownNotice">
              *Green it will render
              <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default NewComment;
