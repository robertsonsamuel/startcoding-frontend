import React from 'react';
import API from '../API';
import Topic from './Topic';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [], activeTopic:null};
  }
  handleClick(topicId){
    this.setState({activeTopic:this.state.activeTopic === topicId ? null : topicId})
  }
  componentWillMount() {
    API.getTopics()
    .done( resp => {
      console.log("resp", resp);
      this.setState( {allTopics: resp} )
    })
    .fail( err => {
      console.log(err);
    })
  }
  render() {
    let topicEls = this.state.allTopics.map((topic,i) => {
      let activeClass = this.state.activeTopic === topic._id ? true : false;
      return <Topic {...topic} isActive={activeClass} onClick={this.handleClick.bind(this,topic._id)} key={i}  />
    });
    return (
      <div className="main">
          {topicEls}
      </div>
    )
  }
}

export default Main;
