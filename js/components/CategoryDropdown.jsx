import React from 'react';
import {CORRECT_CASE, POSTABLE_CATEGORIES} from '../util/CONST.js'

class CategoryDropdown extends React.Component {
  constructor(props){
    super(props)
  }

  selectCategory(e){
    this.props.selectCategory(e.target.value);
  }

  render(){
    let defaultValue = CORRECT_CASE[this.props.initialCategory.toLowerCase()];

    let categories = POSTABLE_CATEGORIES.map((category, i) => {
      return (
        <option key={i} value={category} >{category}</option>
      )
    });

    return(
      <div>
        <select id="modalCategoryDropdown"
                defaultValue={defaultValue}
                onChange={this.selectCategory.bind(this)}
                className="form-control">
          {categories}
        </select>
      </div>
    )
  }
}

export default CategoryDropdown;
