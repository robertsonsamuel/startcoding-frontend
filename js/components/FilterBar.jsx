import React from 'react';
import CONST from '../util/CONST.js'
import '../../css/FilterBar.css';
import '../../css/reactTags.css';
import {store} from '../util/store';

// needed for fancy auto-complete tags box
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const ReactTags = require('react-tag-input').WithContext;

class FilterBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { tags: [] }
  }

  selectCategory(e) {
    this.setState({ tags: [] });
    window.location.hash = '#/' + e.target.value.toLowerCase();
  }

  doFiltering() {
    let tags = this.state.tags.map(tag => tag.text);
    this.props.filterResources(null, tags, this.refs.textSearch.value);
  }

  // TAG INPUT STUFF
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    (this.doFiltering.bind(this))();
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
    (this.doFiltering.bind(this))();
    this.setState({ tags: tags });
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags: tags });
  }

  render(){
    let categories = CONST.ALL_CATEGORIES.map((category, i) => {
      return (
        <option key={i} value={category}>{category}</option>
      )
    });
    let hotTags = (this.props.suggestions || []).map((tag, i) => {
      return (
        <span className="ReactTags__tag" key={i}>{tag}</span>
      )
    });
    return(
      <div>
        <div className="filterBarContainer">
          <h5>Category:</h5>
          <div className="form-group">
            <select defaultValue={this.props.category} onChange={this.selectCategory.bind(this)} className="form-control">
              {categories}
            </select>
          </div>

          <div style={{width: '100%', marginTop: '1em'}} className="text-center">&bull; &bull; &bull;</div>

          <input type="text" ref="textSearch" placeholder="Text Search"/>
          <button className="btn btn-default" onClick={this.doFiltering.bind(this)}>Go</button>

          <div style={{width: '100%', marginTop: '1em'}} className="text-center">&bull; &bull; &bull;</div>

          <h5>Filter By Tags:</h5>

          <ReactTags tags={this.state.tags}
                     suggestions={this.props.suggestions}
                     handleDelete={this.handleDelete.bind(this)}
                     handleAddition={this.handleAddition.bind(this)}
                     handleDrag={this.handleDrag.bind(this)} />

          <div id="hotTags">
            <h6>Hot Tags:</h6>
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
