import React from 'react';
import API from '../API';
import Comment from './Comment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [], isActive:false };
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
    let commentEls = [];
    if(this.props.isActive){
      commentEls = this.state.allComments.map((comment, i) => {
        console.log("have coments", comment);
        return <Comment {...comment} key={i} />
      });
    }
    console.log("making comments", commentEls);
    let addedClasses = `topic ${(this.props.isActive) ? "active" : ""}`;
    return (
      <div className={addedClasses}>
        <div onClick={this.props.onClick} className="topicHead">
          <h3>{this.props.title}</h3>
        </div>
        {commentEls}
      </div>
    )
  }
}

export default Topic;
