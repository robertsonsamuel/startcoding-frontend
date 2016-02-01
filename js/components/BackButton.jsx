import React from 'react';
import '../../css/BackButton.css';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="BackButton">
        <span class="glyphicon-class">glyphicon glyphicon-chevron-left</span> Go back
      </div>
    )
  }
}

export default BackButton;
