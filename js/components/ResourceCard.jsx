import React from 'react';
import API from '../API';
import Comment from './Comment.jsx';
import NewComment from './NewComment.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import classNames from 'classnames';
import {genErr, pleaseLogin} from '../util/alerts';
import {canHazToken} from '../util/authorization';
import {formatTime} from '../util/time';
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

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allComments: [],
      token: store.getDatum("token") ? store.getDatum("token") : "",
      replying: false,
      loading: true
    };

    store.registerListener('token', ()=> {
      this.setState({ token: store.getDatum('token') });
    });
  }
  headerClicked() {
    if (!this.props.isActive) {
      (this.fetchComments.bind(this))();
    }
    this.props.onClick();
  }
  fetchComments(callback) {
    API.getComments(this.props._id)
    .done( resp => {
      this.setState( {allComments: resp, loading: false}, () => {
        console.log("resource state has been set", resp);
      } );
      if (callback) callback();
    })
    .fail( err => {
      console.log(err);
    });
  }
  reply(e) {
    e.preventDefault();
    let haveToken = canHazToken();
    if(!haveToken) return pleaseLogin();
    this.setState({ replying: haveToken });
  }
  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.props._id, body, 'seed')
    .done(resp => (this.fetchComments.bind(this))())
    .fail(err => genErr(err.responseText));
  }
  discard() {
    this.setState({ replying: false });
  }
  render() {
    let commentEls = [];
    let closeResource = [];
    if (this.props.isActive) {
      closeResource = <span className="glyphicon glyphicon-remove closeResource" />;
      commentEls = this.state.allComments.map( (comment, i) => {
        return <Comment {...comment} token={this.state.token}
                                     update={this.fetchComments.bind(this)}
                                     key={i} />
      });
    }
    let addedClasses = classNames('resource');
    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)} />
                                         : [];
    return (
      <div className={addedClasses}>

        <div onClick={this.headerClicked.bind(this)} className="resourceHead">
          <h4 className="resourceTitle">
            <strong>
              <a href={this.props.link}>{this.props.title}</a>
            </strong>
            {closeResource}
          </h4>
          <span className="timeStamp">{formatTime(this.props.timestamp)}</span>
        </div>

      </div>
    )
  }
}

export default Resource;
