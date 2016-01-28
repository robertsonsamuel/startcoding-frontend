import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import NewComment from './NewComment.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EditComment from './EditComment.jsx';
import Votebox from './Votebox.jsx';
import classNames from 'classnames';
import API from '../API';
import {confirmDelete,genErr,pleaseLogin} from '../util/alerts';
import {formatTime} from '../util/time';
import {isAuthorized, parseToken} from '../util/authorization';
import {store} from '../util/store';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replying: false,
      editing: false,
      updating: false,
      loading: false,
      me: store.getDatum('me'),
    };
  }

  componentWillMount() {
    store.registerListener('me', () => {
      let me = store.getDatum('me');
      console.log('me!',me);
      this.setState({ me: me });
    });
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

  discard() {
    this.setState({ replying: false });
    this.setState({ editing: false });
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

  handleVote(vote) {
    console.log("voting");

    if (!this.state.me._id) {
      pleaseLogin();
      return;
    }

    let id = this.props._id;
    let me = this.state.me;

    if (vote === 'up') {
      //handle upvotes set, toggle upvote
      me.upvotes.has(id) ? me.upvotes.delete(id) : me.upvotes.add(id);
      //handle downvotes set, remove downvote if one exists
      me.downvotes.delete(id);
    } else if (vote === 'down') {
      //handle downvotes set, toggle downvotes
      me.downvotes.has(id) ? me.downvotes.delete(id) : me.downvotes.add(id);
      //handle upvotes set, remove upvote if one exists
      me.upvotes.delete(id);
    }

    store.saveDatum('me', me)

    API.vote(this.props._id, vote)
    .done( resp => {
      //this.props.update();
    })
    .fail( err => console.log("error voting", err));

  }

  deleteComment(){
    API.deleteComment(this.props._id)
    .done(resp => this.props.update())
    .fail(err => swal('Delete Failed',err.responseText,'error'));
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
                                                      : <div dangerouslySetInnerHTML={{__html: marked(this.props.body)}} />
    let timestamp;
    if (this.props.editTime) {
      timestamp = `*edited ${formatTime(this.props.editTime)}`;
    } else {
      timestamp = this.props.timestamp ? formatTime(this.props.timestamp) : '';
    }
    let showUpvote = this.state.me ? this.state.me.upvotes.has(this.props._id) : false;
    let showDownvote = this.state.me ? this.state.me.downvotes.has(this.props._id) : false;

    return (
      <div className="panel panel-default comment">
        <div className="panel-heading commentTitle">
          <span className="panel-title commentUsername">{this.props.user.username}</span>
          <Votebox score={this.props.upvotes - this.props.downvotes}
                   up={showUpvote}
                   down={showDownvote}
                   handleVote={this.handleVote.bind(this)}/>
        </div>
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
