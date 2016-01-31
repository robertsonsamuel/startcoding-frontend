import React from 'react';
import {ALL_CATEGORIES} from '../util/CONST.js'
import '../../css/FilterBar.css';
import '../../css/reactTags.css';
import {store} from '../util/store';

// needed for fancy auto-complete tags box
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const ReactTags = require('./reactTags').WithContext;

const TAGS_TO_DISPLAY = 20;

class FilterBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { tags: [] }
  }

  selectCategory(e) {
    let category = e.target.value.toLowerCase();
    if (category === '-select one-') return;
    this.setState({ tags: [] });
    this.props.selectCategory(category);
  }

  doFiltering() {
    let tags = new Set(this.state.tags.map(tag => tag.text));
    this.props.filterResources(null, [...tags], this.refs.textSearch.value);
  }

  // TAG INPUT STUFF
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    (this.doFiltering.bind(this))(); // DELETE THIS TO STOP MAIN FROM UPDATING ON EVERY TAG CHANGE
    this.setState({ tags: tags });
  }
  handleAddition(tag) {
    let tags = this.state.tags;
    tag = tag.normalize();
    // if (!tags.some(existingTag => existingTag.text == tag)) {
      tags.push({
        id: tags.length + 1,
        text: tag
      });
    // }
    (this.doFiltering.bind(this))(); // DELETE THIS TO STOP MAIN FROM UPDATING ON EVERY TAG CHANGE
    this.setState({ tags: tags });
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags: tags });
  }

  render() {
    let categories = ALL_CATEGORIES.map((category, i) => {
      return (
        <option key={i} value={category}>{category}</option>
      )
    });

    let suggestions = this.props.suggestions.map(tagObject => tagObject.text);

    let hotTags = (this.props.suggestions || [])
      .filter(tagObject => {
        return this.state.tags.every(stateTag => stateTag.text !== tagObject.text);
      })
      .slice(0, TAGS_TO_DISPLAY)
      .map((tagObject, i) => {
        return (
          <span className="ReactTags__tag" key={i}>{tagObject.text} ({tagObject.frequency})</span>
        )
      });

    let lowerCaseCategories = ALL_CATEGORIES.map(category => category.toLowerCase());
    let index = lowerCaseCategories.indexOf(this.props.category.toLowerCase());
    let defaultValue = ALL_CATEGORIES[index];

    return (
      <div>
        <div className="filterBarContainer row">
          <div className="well bs-component categorySelector" role='search'>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">Navigate to: </span>
              <select defaultValue={defaultValue}
                      onChange={this.selectCategory.bind(this)}
                      className="form-control">
                {categories}
              </select>
            </div>
          </div>

          <div className="searchBox">
            <div className="searchBar form-group col-xs-9 col-md-8">
              <input className="form-control searchBar" type="text" ref="textSearch" placeholder="Text Search"/>
            </div>
            <button className="btn btn-primary goBtn col-xs-3 col-md-4" onClick={this.doFiltering.bind(this)}>Search</button>
          </div>

          <div className="tagSearch">
            <div className="tagInputBox">
              <ReactTags tags={this.state.tags}
                         suggestions={suggestions}
                         handleDelete={this.handleDelete.bind(this)}
                         handleAddition={this.handleAddition.bind(this)}
                         handleDrag={this.handleDrag.bind(this)} />
            </div>
            <h5>Popular tags:</h5>
            <div className="ReactTags__selected">
              {hotTags}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FilterBar;
