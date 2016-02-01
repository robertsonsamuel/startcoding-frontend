import React from 'react';
import API from '../API';
import Comment from './Comment.jsx';
import NewComment from './NewComment.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EditResource from './EditResource.jsx';
import classNames from 'classnames';
import {genErr, pleaseLogin, confirmDelete} from '../util/alerts';
import {isAuthorized, canHazToken, parseToken} from '../util/authorization';
import {formatTime} from '../util/helpers';
import {store} from '../util/store';
import marked from 'marked';
import '../../css/reactTags.css';
import '../../css/ResourcePage.css';

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
      editing: false,
      loading: true,
    };

    store.registerListener('token', ()=> {
      this.setState({ token: store.getDatum('token') });
    });
  }

  componentWillMount() {
    API.getResourceById(this.props.resourceId)
    .done(data => {

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
  edit(e) {
    if (this.state.replying) return;
    if (!this.props.me) return;
    e.preventDefault();
    this.setState({ editing: isAuthorized(this.props.me._id) });
  }
  deleteResource() {
    confirmDelete(() => {
      API.deleteResource(this.state.resourceInfo._id)
      .done((resp) => (this.updateResource.bind(this))(resp))
      .fail(err => genErr(err.responseText));
    })
  }

  discard() {
    this.setState({ replying: false });
    this.setState({ editing: false });
  }
  putResourceEdit(update){
    this.setState({ editing: false, updating: true });
    API.putResource(this.state.resourceInfo._id, update)
    .done(resp => {
      (this.updateResource.bind(this))(resp)
    })
    .fail(err => genErr(err.responseText));
  }

  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.state.resourceInfo._id, body, 'seed')
    .done(resp => (this.fetchComments.bind(this))())
    .fail(err => genErr(err.responseText));
  }
  updateResource(resource) {
    this.setState({
      resourceInfo: resource,
      updating: false
    })
  }

  render() {
    let commentEls = [];
    let postedBy = this.state.resourceInfo.user ? this.state.resourceInfo.user.username : '';
    let tags = this.state.resourceInfo.tags ? this.state.resourceInfo.tags : [];
    let changeButtons = classNames( "btn", "btn-info", "replyResourceButton",
    { hide: (!this.props.me || !this.state.resourceInfo.timestamp || (this.props.me._id !== this.state.resourceInfo.user._id)) })

    commentEls = this.state.allComments.map( (comment, i) => {
      return <Comment {...comment}
              isOdd={true}
              token={this.state.token}
              update={this.fetchComments.bind(this)}
              key={i} />
    });

    let addedClasses = classNames('resource', 'active');

    let tagsEls = tags.map((tag,i) => {
      return <span key={i} className="ReactTags__tag">{tag}</span>
    });

    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)}
                                                       isOdd={true}/>
                                         : [];

    let resourceBody = this.state.editing ?  <EditResource update={this.putResourceEdit.bind(this)}
                                                           discard={this.discard.bind(this)}
                                                           body={this.state.resourceInfo.body}/>
                                          : <div dangerouslySetInnerHTML={{__html: marked(this.state.resourceInfo.body || '')}} />
    return (
      <div className="resourcePage">
        <div className="container resourceContent">
          <div className="panel-body resourceBody">
            <h4 className="resourceTitle resourcePage">
              <strong>
                <a href={this.state.resourceInfo.link} target="_blank">{this.state.resourceInfo.title}</a>
              </strong>
            </h4>
            {this.state.updating ? <LoadingSpinner /> : []}
            {resourceBody}
            <span className="timeStamp resourceTimeStamp">By {postedBy}, </span>
            <span className="timeStamp resourceTimeStamp">{formatTime(this.state.resourceInfo.timestamp)}.</span>
            <div className="ReactTags__selected">
              {tagsEls}
            </div>
          </div>
          <div className="resourceFooter">
            <div className="row">
              <div className="col-xs-12 col-md-4 col-md-offset-8">
              <span className="resourceActionButton"><button className="btn btn-primary replyResourceButton" onClick={this.reply.bind(this)}>Reply</button></span>
              <span className="resourceActionButton"><button className={changeButtons} onClick={this.edit.bind(this)}>Edit</button></span>
              <span className="resourceActionButton"><button className={changeButtons} onClick={this.deleteResource.bind(this)}>Delete</button></span>
              </div>
            </div>
          </div>
          {newComment}
          {this.state.loading ? <LoadingSpinner /> : []}
          {commentEls}
        </div>
      </div>
    )
  }
}

export default ResourcePage;
