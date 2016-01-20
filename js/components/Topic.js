import React from 'react';
import API from '../API';
import Comment from './Comment';
import classNames from 'classnames';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [], isActive:false };
  }
  componentWillMount() {
    API.getComments(this.props._id)
    .done( resp => {
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
        return <Comment {...comment} key={i} />
      });
    }
    let addedClasses = classNames('topic', {active: this.props.isActive});
    return (
      <div className={addedClasses}>
        <div >
          <div onClick={this.props.onClick} className="topicHead">
            <h3>{this.props.title}</h3>
          </div>
          <div className="container">
            {commentEls}
          </div>
        </div>
      </div>
    )
  }
}

export default Topic;
