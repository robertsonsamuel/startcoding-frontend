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
      resources: [],
      tagSuggestions: [],
      loading: false,
    };
  }
  componentDidMount() {
    if (this.props.meId) return (this.getUserSavedResources.bind(this))();
    (this.getResources.bind(this))();
    API.getAllTags();
  }
  componentDidUpdate(prevProps){
    if (prevProps.category !== this.props.category) {
      (this.getResources.bind(this))()
    }
  }
  handleResourceClick(resourceId){
    this.setState({activeResource:this.state.activeResource === resourceId ? false : resourceId});
  }
  getResources(callback, tags, text){
    console.log('tags:', tags);
    console.log('text:', text);

    this.setState({loading: true})

    API.getResources(this.props.category, tags, text)
    .done(data => {

      console.log('tags object:', data.tags);

      // sort tags by frequency
      let tags = Object.keys(data.tags).sort((a, b) => data.tags[b] - data.tags[a]);
      this.setState({
        resources: data.resources,
        tagSuggestions: tags,
        loading: false
      });
    })
    .fail( err => genErr(err.responseText))
    .always( () => {
      if (callback) callback();
    });
  }
  render() {
    let resourceEls = this.state.resources.map((resource,i) => {
      let isActive = this.state.activeResource === resource._id;
      return <ResourceCard {...resource}
                           me={this.props.me}
                           isActive={isActive}
                           onClick={this.handleResourceClick.bind(this,resource._id)}
                           key={i} />
    });
    let mainClasses = classNames('main','panel', {displayResource : this.state.activeResource})
    return (
      <div className={mainClasses}>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <FilterBar category={this.props.category}
                       filterResources={this.getResources.bind(this)}
                       suggestions={this.state.tagSuggestions} />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8 resourceList">
            {this.state.loading ? <LoadingSpinner /> : []}
            {resourceEls}
          </div>
        </div>
        <NewResourceModal initialCategory={this.props.category}
                          resourcePosted={this.getResources.bind(this)} />
      </div>
    )
  }
}

export default Main;
