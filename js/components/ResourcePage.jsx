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

class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceInfo: {},
      allComments: [],
      token: store.getDatum("token") ? store.getDatum("token") : "",
      replying: false,
      loading: true
    };

    store.registerListener('token', ()=> {
      this.setState({ token: store.getDatum('token') });
    });
  }

  componentWillMount() {
    API.getResourceById(this.props.resourceId)
    .done(data => {
      console.log('got data', data)
      this.setState({
        resourceInfo: data.resource,
        allComments: data.comments,
        loading: false
      });
    })
    .fail(err => console.log(err));
  }

  fetchComments(callback) {
    API.getComments(this.props.resourceId)
    .done(resp => {
      this.setState( {allComments: resp, loading: false} );
      if (callback) callback();
    })
    .fail(err => console.log(err));
  }

  reply(e) {
    e.preventDefault();
    let haveToken = canHazToken();
    if(!haveToken) return pleaseLogin();
    this.setState({ replying: haveToken });
  }

  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.state.resourceInfo._id, body, 'seed')
    .done(resp => (this.fetchComments.bind(this))())
    .fail(err => genErr(err.responseText));
  }

  discard() {
    this.setState({ replying: false });
  }

  render() {
    let commentEls = [];

    commentEls = this.state.allComments.map( (comment, i) => {
      return <Comment {...comment} token={this.state.token}
                                   update={this.fetchComments.bind(this)}
                                   key={i} />
    });

    let addedClasses = classNames('resource', 'active');

    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)} />
                                         : [];
    return (
      <div>
        <div>
          <div className="resourceHead">
            <h4 className="resourceTitle">
              <strong>
                <a href={this.state.resourceInfo.link}>{this.state.resourceInfo.title}</a>
              </strong>
            </h4>
          </div>
          <div className="container resourceContent">
            <div className="panel-body resourceBody">
              <div dangerouslySetInnerHTML={{__html: marked(this.state.resourceInfo.body || '')}} />
            </div>
            <div className="resourceFooter">
              <span className="timeStamp">{formatTime(this.state.resourceInfo.timestamp)}</span>
              <button className="btn btn-success replyResourceButton" href="#" onClick={this.reply.bind(this)}>reply</button>
            </div>
            {newComment}
            {this.state.loading ? <LoadingSpinner /> : []}
            {commentEls}
          </div>
        </div>
      </div>
    )
  }
}

export default ResourcePage;
