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
      newest: false,
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

  changeTabs(tab){
    let newest = tab === 'newest';
    if (this.state.newest !== newest){
      this.setState({newest: newest}, this.getResources.bind(this));
    }
  }

  getResources(callback, tags, text){
    this.setState({loading: true})

    API.getResources(this.props.category, tags, text, this.state.newest)
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
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a onClick={this.changeTabs.bind(this, 'top')} href="#home" aria-controls="home" role="tab" data-toggle="tab">Top</a></li>
              <li role="presentation"><a onClick={this.changeTabs.bind(this, 'newest')} href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Newest</a></li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="home">
                {this.state.loading ? <LoadingSpinner /> : []}
                {resourceEls}
              </div>
              <div role="tabpanel" className="tab-pane" id="profile">
                {resourceEls}
              </div>
            </div>
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
