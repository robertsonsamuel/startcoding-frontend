import React from 'react';
import API from '../API';

class Votebox extends React.Component {
  constructor(props) {
    super(props);
  }
  handleVote(vote) {
    API.vote(this.props.commentId, vote)
    .done( resp => console.log("voted alright", resp))
    .fail( err => console.log("error voting", err));
  }
  render() {
    return (
      <span className="commentVotebox">
        <span className="voteBtn glyphicon glyphicon-arrow-up"
              onClick={this.handleVote.bind(this,"up")}></span>
        <span className="voteBtn glyphicon glyphicon-arrow-down"
              onClick={this.handleVote.bind(this,"down")}></span>
      </span>
    )
  }
}

export default Votebox;
