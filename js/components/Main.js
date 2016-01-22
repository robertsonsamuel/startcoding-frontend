import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner';
import Topic from './Topic';
import NewTopicModal from './NewTopicModal';
import classNames from 'classnames';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [], activeTopic: false, loading: true};
  }
  handleTopicClick(topicId){
    this.setState({activeTopic:this.state.activeTopic === topicId ? false : topicId});
  }
  getTopics(callback){
    API.getTopics()
    .done( resp => {
      this.setState( {allTopics: resp, loading: false} )
      $('#newTopicModal').modal('hide');
      if (callback) callback();
    })
    .fail( err => {
      console.log(err);
    })
  }
  componentWillMount() {
    (this.getTopics.bind(this))();
  }
  render() {
    let topicEls = this.state.allTopics.map((topic,i) => {
      let topicClasses = this.state.activeTopic === topic._id ? true : false;
      return <Topic {...topic} isActive={topicClasses} onClick={this.handleTopicClick.bind(this,topic._id)} key={i}  />
    });
    let mainClasses = classNames('main', 'panel', {displayTopic : this.state.activeTopic})
    return (
      <div className={mainClasses}>
        <NewTopicModal topicPosted={this.getTopics.bind(this)} />
        {this.state.loading ? <LoadingSpinner /> : []}
        {topicEls}
      </div>
    )
  }
}

export default Main;
