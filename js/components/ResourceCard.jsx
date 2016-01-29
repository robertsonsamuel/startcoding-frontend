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

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: store.getDatum("token") ? store.getDatum("token") : "",
      me: store.getDatum('me'),
      score: this.props.upvotes - this.props.downvotes
    };

    store.registerListener('token', ()=> {
      this.setState({ token: store.getDatum('token') });
    });
  }
  componentWillMount(){
    store.registerListener('me', () => {
      let me = store.getDatum('me')
      this.setState({me: me})
    })
  }
  handleVote(vote) {

    if (!this.state.me) {
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

    API.postResourceVote(id, vote)
    .done( resp => {
      //this.props.update();
    })
    .fail( err => console.log("error voting", err));

  }

  render() {
    let showUpvote = this.state.me ? this.state.me.upvotes.has(this.props._id) : false;
    let showDownvote = this.state.me ? this.state.me.downvotes.has(this.props._id) : false;
    console.log(showDownvote, showUpvote);
    return (
      <div className="resource">

        <div className="resourceHead">
          <div className="panel-heading">
            <h4 className="resourceTitle">
              <strong>
                <a href={this.props.link}>{this.props.title}</a>
              </strong>
            </h4>
            <Votebox score={this.state.score} up={showUpvote} down={showDownvote} handleVote={this.handleVote.bind(this)} />
          </div>
          <ol className="breadcrumb resourceBreadCrumb">
            <li className=""><span className="timeStamp">{formatTime(this.props.timestamp)}</span></li>
            <li><a href={`/#/resource/${this.props._id}`}>Discussions</a></li>
            <li><a href="#">Save</a></li>
          </ol>
        </div>

      </div>
    )
  }
}

export default Resource;
