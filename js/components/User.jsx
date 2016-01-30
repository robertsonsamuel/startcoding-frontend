import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import ResourceCard from './ResourceCard.jsx';
import FilterBar from './FilterBar.jsx';
import NewResourceModal from './NewResourceModal.jsx';
import classNames from 'classnames';
import {genErr} from '../util/alerts';
import {store} from '../util/store';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResources: [],
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.meId) return (this.getUserSavedResources.bind(this))();
    (this.getUserSavedResources.bind(this))()
  }
  componentDidUpdate(prevProps){
    if (prevProps.category !== this.props.category) {
      (this.getUserSavedResources.bind(this))()
    }
  }
  handleResourceClick(resourceId){
    this.setState({activeResource:this.state.activeResource === resourceId ? false : resourceId});
  }
  getUserSavedResources(callback){
    this.setState({loading: true})
    API.savedResources(this.props.meId)
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
                           me={this.props.me}
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
      </div>
    )
  }
}

export default User;
