import React from 'react';
import '../../css/loadingSpinner.css';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="showbox">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" stroke-miterlimit="10"/>
          </svg>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
