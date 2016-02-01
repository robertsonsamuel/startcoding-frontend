import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import NewComment from './NewComment.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EditComment from './EditComment.jsx';
import Votebox from './Votebox.jsx';
import classNames from 'classnames';
import API from '../API';
import {confirmDelete,genErr,pleaseLogin} from '../util/alerts';
import {formatTime} from '../util/helpers';
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
      score: this.props.upvotes - this.props.downvotes,
      me: store.getDatum('me'),
    };
  }

  setNewMe() {
    let me = store.getDatum('me');
    this.setState({ me: me });
  }

  componentWillMount() {
    store.registerListener('me', this.setNewMe.bind(this) );
  }
  componentWillUnmount() {
    store.stopListening('me', this.setNewMe.bind(this) );
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

  delete(e) {
    e.preventDefault();
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

    if (!this.state.me._id) {
      pleaseLogin();
      return;
    }

    let id = this.props._id;
    let me = this.state.me;

    if (vote === 'up') {
      //handle upvotes set, toggle upvote
      if (me.upvotes.has(id)) {
        me.upvotes.delete(id);
        this.state.score = this.state.score - 1;
      } else {
        me.upvotes.add(id);
        this.state.score = this.state.score + 1;
      }

      //handle downvotes set, remove downvote if one exists
      if(me.downvotes.delete(id)) this.state.score = this.state.score + 1;

    } else if (vote === 'down') {

      //handle downvotes set, toggle downvotes
      if(me.downvotes.has(id)) {
        me.downvotes.delete(id)
        this.state.score = this.state.score + 1;
      } else {
         me.downvotes.add(id);
        this.state.score = this.state.score - 1;
      }
      //handle upvotes set, remove upvote if one exists
      if(me.upvotes.delete(id)) this.state.score = this.state.score - 1;
    }


    store.saveDatum('me', me)

    API.vote(this.props._id, vote)
    .done( resp => {

      //this.props.update();
    })
    .fail( err => console.log("error voting", err));

  }

  deleteComment() {
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
      timestamp = formatTime(this.props.timestamp);
    }
    let showUpvote = this.state.me ? this.state.me.upvotes.has(this.props._id) : false;
    let showDownvote = this.state.me ? this.state.me.downvotes.has(this.props._id) : false;

    return (
      <div className="panel panel-default comment">
        <div className="panel-heading commentTitle commentHeading">
          <span className="panel-title commentUsername">{this.props.user.username}</span>
          <Votebox score={this.state.score}
                   up={showUpvote}
                   down={showDownvote}
                   handleVote={this.handleVote.bind(this)}/>
        </div>
        <div className="panel-body">
          {this.state.updating ? <LoadingSpinner /> : []}
          {commentBody}
        </div>
        <ol className="panel-footer breadcrumb comment">
          <li><span>{timestamp}</span></li>
          <li><a href="" className={changeButtons} onClick={this.edit.bind(this)}>edit</a></li>
          <li><a href="" onClick={this.reply.bind(this)}>reply</a></li>
          <li><a href="" className={changeButtons} onClick={this.delete.bind(this)}>delete</a></li>
        </ol>
        {newComment}
        {this.state.loading ? <LoadingSpinner /> : []}
        {commentEls}
      </div>
    )
  }
}

export default Comment;
