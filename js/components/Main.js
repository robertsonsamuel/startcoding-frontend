import React from 'react';
import API from '../API';
import Topic from './Topic';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [] };
  }
  componentWillMount() {
    API.getTopics()
    .done( resp => {
      this.setState( {allTopics: resp} )
    })
    .fail( err => {
      console.log(err);
    })
  }
  render() {
    let topicEls = this.state.allTopics.map( topic => {
      return <Topic {...topic} />
    });
    return (
      <div>
      <h1>TOPIC LIST</h1>
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          {topicEls}
        </div>
      </div>
    )
  }
}

export default Main;
