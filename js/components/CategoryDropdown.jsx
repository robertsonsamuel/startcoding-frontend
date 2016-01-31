import React from 'react';
import {ALL_CATEGORIES} from '../util/CONST.js'

class CategoryDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categoriesArrary: ALL_CATEGORIES
    };
  }

  selectCategory(e){
    this.props.selectCategory(e.target.value);
  }

  render(){
    let lowerCaseCategories = ALL_CATEGORIES.map(category => category.toLowerCase());
    let index = lowerCaseCategories.indexOf(this.props.initialCategory.toLowerCase());
    let defaultValue = ALL_CATEGORIES[index];

    let categories = this.state.categoriesArrary.map((category, i) => {
      return (
        <option key={i}  value={category} >{category}</option>
      )
    });

    return(
      <div>
        <select id="modalCategoryDropdown" defaultValue={defaultValue} onChange={this.selectCategory.bind(this)} className="form-control">
          {categories}
        </select>
      </div>
    )
  }
}

export default CategoryDropdown;
