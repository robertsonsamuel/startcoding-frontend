import React from 'react';
import RegisterForm from './RegisterForm';
import NewComment from './NewComment';
import LoadingSpinner from './LoadingSpinner';
import EditComment from './EditComment';
import classNames from 'classnames';
import API from '../API';
import {confirmDelete,genErr,pleaseLogin} from '../util/alerts';
import {formatTime} from '../util/time';
import {isAuthorized, parseToken} from '../util/authorization';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replying: false,
      editing: false,
      updating: false,
      loading: false
    };
  }
  reply(e) {
    if (this.state.editing) return;
    e.preventDefault();
    if(!this.props.token) return pleaseLogin();
    this.setState({ replying: this.props.token });
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
    this.setState({ replying: false, loading: true });
    API.postComment(this.props._id, body)
    .done(resp => {
      this.props.update(() => {
        this.setState({ loading: false });
      });
    })
    .fail(err => genErr(err.responseText));
  }
  updateComment(update) {
    this.setState({ editing: false, updating: true });
    API.updateComment(this.props._id, update)
    .done(resp => {
      this.props.update(() => {
        this.setState({ updating: false });
      })
    })
    .fail(err => genErr(err.responseText));
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
    let payload = parseToken(this.props.token);
    let changeButtons = classNames({
      disabled: (payload.id != this.props.user._id) || !this.props.timestamp
    })

    let commentEls = this.props.children.map( (child, i) => {
      return <Comment {...child} token={this.props.token} update={this.props.update} key={i} />
    });
    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)}/>
                                         : [];
    let commentBody = this.state.editing ? <EditComment update={this.updateComment.bind(this)}
                                                        discard={this.discard.bind(this)}
                                                        body={this.props.body}/>
                                         : <div>{this.props.body}</div>
    let timestamp;
    if (this.props.editTime) {
      timestamp = `*edited ${formatTime(this.props.editTime)}`;
    } else {
      timestamp = this.props.timestamp ? formatTime(this.props.timestamp) : '';
    }
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading"><div className="panel-title"><div className="panel-title">{this.props.user.username}</div></div></div>
        <div className="panel-body">
          {this.state.updating ? <LoadingSpinner /> : []}
          {commentBody}
        </div>
        <ol className="panel-footer breadcrumb">
          <span>{timestamp}</span>
          <li><a href="#" className={changeButtons} onClick={this.edit.bind(this)}>edit</a></li>
          <li><a href="#" onClick={this.reply.bind(this)}>reply</a></li>
          <li><a href="#" className={changeButtons} onClick={this.delete.bind(this)}>delete</a></li>
        </ol>
        {newComment}
        {this.state.loading ? <LoadingSpinner /> : []}
        {commentEls}
      </div>
    )
  }
}

export default Comment;
