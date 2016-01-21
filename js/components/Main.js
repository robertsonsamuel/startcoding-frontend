import React from 'react';
import API from '../API';
import Topic from './Topic';
import NewTopicModal from './NewTopicModal';
import classNames from 'classnames';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [], activeTopic:false};
  }
  handleTopicClick(topicId){
    this.setState({activeTopic:this.state.activeTopic === topicId ? false : topicId});
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
    let topicEls = this.state.allTopics.map((topic,i) => {
      let topicClasses = this.state.activeTopic === topic._id ? true : false;
      return <Topic {...topic} isActive={topicClasses} onClick={this.handleTopicClick.bind(this,topic._id)} key={i}  />
    });
    let mainClasses = classNames('main', 'panel', {displayTopic : this.state.activeTopic})
    return (
      <div className={mainClasses}>
        <NewTopicModal />
        {topicEls}
      </div>
    )
  }
}

export default Main;
