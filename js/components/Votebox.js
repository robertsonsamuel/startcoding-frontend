import React from 'react';
import API from '../API';
import {store} from '../util/store';
import classNames from 'classnames';
import {pleaseLogin} from '../util/alerts';

class Votebox extends React.Component {
  constructor(props) {
    super(props);
  }
      // up: this.props.upvotes && this.props.upvotes.indexOf(this.props.meId) !== -1,
      // down: this.props.downvotes && this.props.downvotes.indexOf(this.props.meId) !== -1
  render() {
    let disabled = this.props.meId === "";
    let voteClasses = classNames("commentVotebox", { up: this.props.up }, {down: this.props.down}, {disabled: disabled});
    return (
      <span className={voteClasses}>
        <span className="voteBtn glyphicon glyphicon-arrow-up"
              onClick={this.props.handleVote.bind(this,"up")}></span>
        <span className="badge">{this.props.score}</span>
        <span className="voteBtn glyphicon glyphicon-arrow-down"
              onClick={this.props.handleVote.bind(this,'down')}></span>
      </span>
    )
  }
}

export default Votebox;