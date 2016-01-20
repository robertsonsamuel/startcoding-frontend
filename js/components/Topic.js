import React from 'react';
import Comment from './Comment';

class Topic extends React.Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.title}
        </h3>
      </div>
    )
  }
}

export default Topic;
