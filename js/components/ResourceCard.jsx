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

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: store.getDatum("token") ? store.getDatum("token") : "",
    };

    store.registerListener('token', ()=> {
      this.setState({ token: store.getDatum('token') });
    });
  }
  render() {
    return (
      <div className="resource">

        <div className="resourceHead">
          <h4 className="resourceTitle">
            <strong>
              <a href={this.props.link}>{this.props.title}</a>
            </strong>
          </h4>
          <ol className="breadcrumb">
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
