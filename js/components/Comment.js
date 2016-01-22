import React from 'react';
import RegisterForm from './RegisterForm';
import NewComment from './NewComment';
import EditComment from './EditComment';
import API from '../API';
import {confirmDelete} from '../util/alerts';
import {canHazToken, isAuthorized} from '../util/authorization';
import {formatTime} from '../util/time';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { replying: false, editing: false };
  }
  reply(e) {
    if (this.state.editing) return;
    e.preventDefault();
    this.setState({ replying: canHazToken() });
  }
  edit(e){
    if (this.state.replying) return;
    e.preventDefault();
    this.setState({ editing: isAuthorized(this.props.user._id) });
  }
  delete() {
    confirmDelete(this.deleteComment.bind(this))
  }
  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.props._id, body)
    .done(resp => this.props.update())
    .fail(err => alert(err.responseText));
  }
  updateComment(update) {
    this.setState({ editing: false });
    API.updateComment(this.props._id, update)
    .done(resp => this.props.update())
    .fail(err => alert(err.responseText));
  }
  deleteComment(){
    API.deleteComment(this.props._id)
    .done(resp => this.props.update())
    .fail(err => swal('Delete Failed',err.responseText,'error'));
  }
  discard() {
    this.setState({ replying: false });
    this.setState({ editing: false });
  }
  render() {
    let commentEls = this.props.children.map( (child, i) => {
      return <Comment {...child} update={this.props.update} key={i} />
    });
    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)} />
                                         : [];
    let commentBody = this.state.editing ? <EditComment update={this.updateComment.bind(this)}
                                                        discard={this.discard.bind(this)}
                                                        body={this.props.body}/>
                                         : <div>{this.props.body}</div>
    let timestamp = this.props.editTime ? `*edited ${formatTime(this.props.editTime)}`
                                        : formatTime(this.props.timestamp);
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading"><div className="panel-title"><div className="panel-title">{this.props.user.username}</div></div></div>
        <div className="panel-body">
          {commentBody}
        </div>
        <ol className="panel-footer breadcrumb">
          <span>{timestamp}</span>
          <li><a href="#" onClick={this.edit.bind(this)}>edit</a></li>
          <li><a href="#" onClick={this.reply.bind(this)}>reply</a></li>
          <li><a href="#" onClick={this.delete.bind(this)}>delete</a></li>
        </ol>
        {newComment}
        {commentEls}
      </div>
    )
  }
}

export default Comment;
