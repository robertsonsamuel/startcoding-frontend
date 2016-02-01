import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import {genErr} from '../util/alerts';
import {canHazToken} from '../util/authorization';
import {MAX_COMMENT_LENGTH} from '../util/CONST.js';
import classNames from 'classnames';
import '../../css/Comment.css';
import '../../css/NewComment.css';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    let name = canHazToken().username;
    this.state = { name: name, body: '' };
  }

  componentDidMount() {
    $('#newCommentTextArea').focus();
  }

  post() {
    if (this.state.body) {
      this.props.post(this.state.body);
    } else {
      genErr('Comment cannot be blank');
      $('#newCommentTextArea').focus();
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
    let commentClasses = classNames("panel", "panel-default", "comment", {odd: this.props.isOdd})
    return (
      <div className={commentClasses}>
        <div className="commentBody newCommentBody">
          <strong>{this.state.name}</strong>
          <textarea id="newCommentTextArea"
                    className="form-control"
                    value={this.state.body}
                    onChange={this.handleBodyChange.bind(this)}
                    rows="4">
          </textarea>
          <div className="new-comment-buttons">
            <span className="markdownNotice">
              *Your post will render <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!
            </span>
            <button className="btn btn-default" onClick={this.discard.bind(this)}>Discard</button>
            <button className="btn btn-primary" onClick={this.post.bind(this)}>Post</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewComment;
