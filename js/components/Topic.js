import React from 'react';
import API from '../API';
import Comment from './Comment';
import NewComment from './NewComment';
import classNames from 'classnames';
import {genErr} from '../util/alerts';
import {canHazToken} from '../util/authorization';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [], replying: false };
  }
  headerClicked() {
    if (!this.props.isActive) {
      (this.fetchComments.bind(this))();
    }
    this.props.onClick();
  }
  fetchComments() {
    API.getComments(this.props._id)
    .done( resp => {
      this.setState( {allComments: resp} );
    })
    .fail( err => {
      console.log(err);
    })
  }
  reply(e) {
    e.preventDefault();
    this.setState({ replying: canHazToken() });
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
    let closeTopic = [];
    if (this.props.isActive) {
      closeTopic = <span className="glyphicon glyphicon-remove closeTopic" />;
      commentEls = this.state.allComments.map( (comment, i) => {
        return <Comment {...comment} update={this.fetchComments.bind(this)} key={i} />
      });
    }
    let addedClasses = classNames('topic', {active: this.props.isActive});
    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)} />
                                         : [];
    return (
      <div className={addedClasses}>
        <div >
          <div onClick={this.headerClicked.bind(this)} className="topicHead">
            <div className="container">
              <h4 className="topicTitle">{this.props.title} {closeTopic} </h4>
            </div>
          </div>
          <div className="container topicContent">
            <div className="panel-body">
              {this.props.body}
            </div>
            <ol className="panel-footer breadcrumb">
              <span>{this.props.timestamp}</span>
              <li><a href="#" onClick={this.reply.bind(this)}>reply</a></li>
            </ol>
            {newComment}
            {commentEls}
          </div>
        </div>
      </div>
    )
  }
}

export default Topic;
