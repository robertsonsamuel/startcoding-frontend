import React from 'react';
import API from '../API';
import Comment from './Comment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [] };
  }
  componentWillMount() {
    API.getComments(this.props._id)
    .done( resp => {
      console.log("resp", resp);
      this.setState( {allComments: resp} )
    })
    .fail( err => {
      console.log(err);
    })
  }
  render() {
    let commentEls = this.state.allComments.map(comment => {
      return <Comment {...comment} />
    })
    return (
      <div>
        <h3>{this.props.title}</h3>
        {commentEls}
      </div>
    )
  }
}

export default Topic;
