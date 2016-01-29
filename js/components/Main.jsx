import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import ResourceCard from './ResourceCard.jsx';
import FilterBar from './FilterBar.jsx';
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
    console.log('componentWillMount',this.props.category);
    (this.getResources.bind(this))();
    eventEmitter.registerListener('goMain', () => {
      this.setState({activeResource: false });
      this.getResources();
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('should component update', nextProps);
    console.log('should component update thisprops', this.props.category);
    let currentResources = JSON.stringify(this.state.allResources);
    return (nextProps.category !== this.props.category) || (nextState.loading !== this.state.loading);
  }
  componentWillUpdate(){
    console.log('componentWillUpdatee');
    (this.getResources.bind(this))();
  }
  handleResourceClick(resourceId){
    this.setState({activeResource:this.state.activeResource === resourceId ? false : resourceId});
  }
  getResources(callback){
    console.log("getting resources", this.props.category);
    API.getResources(this.props.category)
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
      return <ResourceCard {...resource}
                           isActive={isActive}
                           onClick={this.handleResourceClick.bind(this,resource._id)}
                           key={i}/>
    });
    let mainClasses = classNames('main', 'panel', {displayResource : this.state.activeResource})
    return (
      <div className={mainClasses}>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <FilterBar initialCategory={this.props.category}  />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8">
            {this.state.loading ? <LoadingSpinner /> : []}
            {resourceEls}
          </div>
        </div>
        <NewResourceModal initialCategory={this.props.category} resourcePosted={this.getResources.bind(this)} />
      </div>
    )
  }
}

export default Main;
