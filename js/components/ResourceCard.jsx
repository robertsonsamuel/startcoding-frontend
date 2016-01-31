import React from 'react';
import API from '../API';
import Comment from './Comment.jsx';
import NewComment from './NewComment.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import classNames from 'classnames';
import Votebox from './Votebox.jsx';
import {genErr, pleaseLogin} from '../util/alerts';
import {canHazToken} from '../util/authorization';
import {formatTime} from '../util/time';
import {store} from '../util/store';
import '../../css/reactTags.css';

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.upvotes - this.props.downvotes,
      votingInProcess: false
    };
  }

  saveResource(e){
    e.preventDefault();
    if (!this.props.me) return pleaseLogin();
    let resourceId = this.props._id
    let meId = this.props.me._id
    API.saveResource(meId, resourceId)
  }

  handleVote(vote) {
    console.log("voting", vote, this.state.votingInProcess);
    if (this.state.votingInProcess) return;

    this.setState({ votingInProcess: true });

    if (!this.props.me) {
      pleaseLogin();
      return;
    }

    let id = this.props._id;
    let me = this.props.me;

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

    API.postResourceVote(id, vote)
    .done( resp => this.setState({ votingInProcess: false }))
    .fail( err => console.log("error voting", err));
  }

  render() {
    let showUpvote = this.props.me ? this.props.me.upvotes.has(this.props._id) : false;
    let showDownvote = this.props.me ? this.props.me.downvotes.has(this.props._id) : false;
    let saveButtonText = "save";
    let tags = (this.props.tags || []).map((tag,i) => {
      return <span key={i} className="ReactTags__tag">{tag}</span>
    });

    if (this.props.me) {
      saveButtonText = (this.props.me.savedResources.has(this.props._id)) ? "unsave" : "save";
    }

    console.log('ResourceCard this.state.score', this.state.score);

    return (
      <div className="resource">
        <div className="resourceHead">
          <div className="panel-heading">
            <h4 className="resourceTitle">
              <strong>
                <a href={this.props.link} target="_blank">{this.props.title}</a>
              </strong>
            </h4>
            <Votebox score={this.state.score}
                     up={showUpvote}
                     down={showDownvote}
                     handleVote={this.handleVote.bind(this)} />
          </div>
          <div className="panel-body">
          <div className="ReactTags__selected">
            {tags}
          </div>
          </div>
          <div className="panel-footer">
          <ol className="breadcrumb resourceBreadCrumb">
            <li className="username"><strong>{this.props.user.username}</strong></li>
            <li className=""><span className="timeStamp">{formatTime(this.props.timestamp)}</span></li>
            <li><a href={`/#/resource/${this.props._id}`}>Discussions</a></li>
            <li>
              <a href='' onClick={this.saveResource.bind(this)}>{saveButtonText}</a>
            </li>
          </ol>
        </div>
        </div>

      </div>
    )
  }
}

export default Resource;
