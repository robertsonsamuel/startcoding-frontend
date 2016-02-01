import React from 'react';
import '../../css/BackButton.css';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span class="glyphicon-class">glyphicon glyphicon-arrow-left</span>
    )
  }
}

export default BackButton;
