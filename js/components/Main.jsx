import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import Resource from './Resource.jsx';
import NewResourceModal from './NewResourceModal.jsx';
import classNames from 'classnames';
import {genErr} from '../util/alerts';
import {eventEmitter, store} from '../util/store';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResources: [],
      activeResource: false,
      loading: true
    };
  }
  componentWillMount() {
    (this.getResources.bind(this))();
    eventEmitter.registerListener('goHome', () => {
      this.setState({activeResource: false });
      this.getResources();
    })
  }
  handleResourceClick(resourceId){
    this.setState({activeResource:this.state.activeResource === resourceId ? false : resourceId});
  }
  getResources(callback){
    API.getResources()
    .done( resp => {
      this.setState( {allResources: resp, loading: false} );
    })
    .fail( err => genErr(err.responseText))
    .always( () => {
      if (callback) callback();
    });
  }
  render() {
    let resourceEls = this.state.allResources.map((resource,i) => {
      let isActive = this.state.activeResource === resource._id;
      return <Resource {...resource} isActive={isActive}
                               onClick={this.handleResourceClick.bind(this,resource._id)}
                               key={i}/>
    });
    let mainClasses = classNames('main', 'panel', {displayResource : this.state.activeResource})
    return (
      <div className={mainClasses}>
        <h1>{this.props.catagory}</h1>
        <NewResourceModal resourcePosted={this.getResources.bind(this)} />
        {this.state.loading ? <LoadingSpinner /> : []}
        {resourceEls}
      </div>
    )
  }
}

export default Main;
