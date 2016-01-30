import React from 'react';
import CONST from '../util/CONST.js'
import '../../css/FilterBar.css';

class FilterBar extends React.Component {
  constructor(props){
    super(props)
  }
  selectCategory(e){
    window.location.hash = '#/' + e.target.value.toLowerCase();
  }
  render(){
    let categories = CONST.ALL_CATEGORIES.map((cat, i) => {
      return (
        <option key={i}  value={cat} >{cat}</option>
      )
    })
    return(
      <div>
        <div className="filterBarContainer">
          <select defaultValue={this.props.category} onChange={this.selectCategory.bind(this)} className="form-control">
            {categories}
          </select>
        </div>
      </div>
    )
  }
}

export default FilterBar;
