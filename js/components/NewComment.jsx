import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import {genErr} from '../util/alerts';
import {canHazToken} from '../util/authorization';
import {MAX_COMMENT_LENGTH} from '../util/CONST.js';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    let name = canHazToken().username;
    this.state = { name: name, body: '' };
  }

  componentDidMount() {
    $('#newCommentBody').focus();
  }

  post() {
    if (this.state.body) {
      this.props.post(this.state.body);
    } else {
      genErr('Comment cannot be blank');
      $('#newCommentBody').focus();
    }
  }

  discard() {
    this.props.discard();
  }

  handleBodyChange(e) {
    if (e.target.value.length > MAX_COMMENT_LENGTH) {
      let allowedText = e.target.value.slice(0, MAX_COMMENT_LENGTH);
      this.setState({ body: allowedText });
    } else {
      this.setState({ body: e.target.value });
    }
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
          <textarea id="newCommentBody"
                    className="form-control"
                    value={this.state.body}
                    onChange={this.handleBodyChange.bind(this)}
                    rows="4">
          </textarea>
          <span className="new-comment-buttons">
            <span className="markdownNotice">
              *Your post will render <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!
              </span>
            <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard</button>
            <button className="btn btn-primary" onClick={this.post.bind(this)}>Post</button>
          </span>
        </div>
      </div>
    )
  }
}

export default NewComment;
