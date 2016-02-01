import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import ResourceCard from './ResourceCard.jsx';
import FilterBar from './FilterBar.jsx';
import NewResourceModal from './NewResourceModal.jsx';
import classNames from 'classnames';
import {genErr} from '../util/alerts';
import {eventEmitter, store} from '../util/store';
import {CORRECT_CASE} from '../util/CONST.js'
import '../../css/Main.css';

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

  selectCategory(category) {
    category = category.toLowerCase();
    let categoryForModal = (category === 'all') ? '-select one-' : CORRECT_CASE[category];
    $('#modalCategoryDropdown').val(categoryForModal);
    window.location.hash = '#/' + category;
  }

  getResources(callback, tags, text){
    this.setState({loading: true})

    API.getResources(this.props.category, tags, text)
    .done(data => {
      // sort tags by frequency
      let tags = Object.keys(data.tags)
        .sort((a, b) => data.tags[b] - data.tags[a] || a > b)
        .map(tag => { return { text: tag, frequency: data.tags[tag] }; });
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

  optimisticallyAdd(resource) {
    if (resource.category.toLowerCase() === this.props.category.toLowerCase()) {
      this.setState({ resources: this.state.resources.concat(resource) });
    }
  }

  render() {
    let filterColClass = "col-sm-12 col-md-4 filterCol " + this.props.category + "Style"
    let resourceEls = this.state.resources.map((resource,i) => {
      return <ResourceCard {...resource}
                           me={this.props.me}
                           key={i} />
    });
    let mainClasses = classNames('main', 'panel');
    return (
      <div className={mainClasses}>
        <div className="row filterRow">
          <div className={filterColClass}>
            <FilterBar category={this.props.category}
                       selectCategory={this.selectCategory.bind(this)}
                       filterResources={this.getResources.bind(this)}
                       suggestions={this.state.tagSuggestions} />
          </div>
          <div className="col-sm-12 col-md-8 resourceList">
            {this.state.loading ? <LoadingSpinner /> : []}
            {resourceEls}
          </div>
        </div>
        <NewResourceModal initialCategory={this.props.category}
                          resourcePosted={this.getResources.bind(this)}
                          optimisticallyAdd={this.optimisticallyAdd.bind(this)} />
      </div>
    )
  }
}

export default Main;
