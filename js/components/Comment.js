import React from 'react';
import RegisterForm from './RegisterForm';
import API from '../API';
import NewComment from './NewComment';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { replying: false };
  }
  reply(e) {
    e.preventDefault();
    this.setState({ replying: true });
  }
  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.props._id, body)
    .done(resp => console.log(resp))
    .fail(err => alert(err.responseText));
  }
  discard() {
    this.setState({ replying: false });
  }
  render() {
    let commentEls = this.props.children.map(child => {
      return <Comment {...child} />
    })
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading"><div className="panel-title"><div className="panel-title">{this.props.user.username}</div></div></div>
        <div className="panel-body">
          {this.props.body}
        </div>
        <ol className="panel-footer breadcrumb">
          <span>{this.props.timestamp}</span>
          <li><a href="#">edit</a></li>
          <li><a href="#" onClick={this.reply.bind(this)}>reply</a></li>
          <li><a href="#">delete</a></li>
        </ol>
        {this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                           discard={this.discard.bind(this)} /> : []}
        {commentEls}
      </div>
    )
  }
}

export default Comment;
