import React from 'react';
import CategoryDropdown from './CategoryDropdown.jsx'
import '../../css/FilterBar.css';


class FilterBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedValue: this.props.initialCategory };
  }
  render(){
    return(
      <div>
        <div className="filterBarContainer">
          <h3>{this.props.initialCategory}</h3>
          <CategoryDropdown initialCategory={this.props.initialCategory}  />
        </div>
      </div>

    )
  }
}

export default FilterBar;
