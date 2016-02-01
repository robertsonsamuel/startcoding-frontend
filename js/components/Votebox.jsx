import React from 'react';
import API from '../API';
import {store} from '../util/store';
import classNames from 'classnames';
import {pleaseLogin} from '../util/alerts';
import '../../css/Votebox.css';

class Votebox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let disabled = this.props.meId === "";
    let voteClasses = classNames("voteBox", { up: this.props.up }, {down: this.props.down}, {disabled: disabled});
    return (
      <span className={voteClasses}>
        <span className="voteBtn glyphicon glyphicon-arrow-up"
              onClick={() => this.props.handleVote("up")}></span>
        <span className="badge">{this.props.score}</span>
        <span className="voteBtn glyphicon glyphicon-arrow-down"
              onClick={() => this.props.handleVote('down')}></span>
      </span>
    )
  }
}

export default Votebox;
