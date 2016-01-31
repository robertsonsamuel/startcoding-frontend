import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import ResourceCard from './ResourceCard.jsx';
import FilterBar from './FilterBar.jsx';
import NewResourceModal from './NewResourceModal.jsx';
import classNames from 'classnames';
import {genErr} from '../util/alerts';
import {store} from '../util/store';

function sortTagsByFrequency(resources) {
  let tagFreqs = resources.reduce((tagFreqs, resource) => {
    (resource.tags || []).forEach(tag => {
      tagFreqs[tag] = tagFreqs[tag] ? tagFreqs[tag] + 1 : 1;
    });
    return tagFreqs;
  }, {});

  return Object.keys(tagFreqs).sort((a, b) => {
    return tagFreqs[b] - tagFreqs[a] || a > b;
  });
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      tagsFilter: [],
      textFilter: '',
      resources: [],
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.meId) return (this.getUserSavedResources.bind(this))();
    (this.getUserSavedResources.bind(this))()
  }

  selectCategory(category) {
    this.setState({ category: category });
  }

  filterResources(cb, tags, text) {
    console.log('tags:', tags);
    console.log('text:', text);
    this.setState({ tagsFilter: tags, textFilter: text });
  }

  getUserSavedResources(){
    this.setState({loading: true})
    API.savedResources(this.props.meId)
    .done( resources => {
      this.setState({
        resources: resources,
        loading: false
      });
    })
    .fail( err => genErr(err.responseText));
  }

  render() {
    // filter resources to display:
    // (A) match the category, (B) match every tag given, and (C) query is in title OR query is in some tag
    let query = this.state.textFilter.toLowerCase();
    let filteredResources = this.state.resources.filter(resource => {
      let tags = resource.tags || [];
      return (this.state.category === resource.category || this.state.category === 'all') &&
             (this.state.tagsFilter.every(tag => tags.includes(tag))) &&
             (resource.title.toLowerCase().includes(query) || tags.some(tag => tag.includes(query)) );
    });

    // get list of hot tags for displayed resources
    let tagSuggestions = sortTagsByFrequency(filteredResources);

    let resourceEls = filteredResources.map((resource,i) => {
      let isActive = this.state.activeResource === resource._id;
      return <ResourceCard {...resource}
                           me={this.props.me}
                           isActive={isActive}
                           key={i}/>
    });

    let mainClasses = classNames('main', 'panel', {displayResource : this.state.activeResource})
    
    return (
      <div className={mainClasses}>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <FilterBar category="All"
                       selectCategory={this.selectCategory.bind(this)}
                       filterResources={this.filterResources.bind(this)}
                       suggestions={tagSuggestions} />
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
