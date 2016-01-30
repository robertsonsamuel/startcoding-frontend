import React from 'react';
import CategoryDropdown from './CategoryDropdown.jsx'
import '../../css/FilterBar.css';


class FilterBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedValue: this.props.initialCategory
    };
  }
  let categoriesArrary = ['Javascript', 'Python', 'Go', 'Ruby', 'HTML', 'CSS', 'General', 'All' ];
  selectCategory(e){
    window.location.hash = '#/' + e.target.value.toLowerCase();
  }
  render(){
    let categories = this.state.categoriesArrary.map((category, i) => {
      return (
        <option key={i}  value={category} >{category}</option>
      )
    })
    return(
      <div>
        <div className="filterBarContainer">
          <select value={this.state.selectedValue} onChange={this.selectCategory.bind(this)} className="form-control">
            {categories}
          </select>
        </div>
      </div>
    )
  }
}

export default FilterBar;
