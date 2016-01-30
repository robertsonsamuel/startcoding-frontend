import React from 'react';
import CONST from '../util/CONST.js'
class CategoryDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categoriesArrary: CONST.ALL_CATEGORIES,
      selectedValue: this.props.initialCategory
    };
  }
  changeState(){
    console.log('changed');
  }
  selectCategory(e){
    this.setState({selectedValue: e.target.value});
    this.props.selectCategory(e.target.value);
  }

  render(){

    let categories = this.state.categoriesArrary.map((category, i) => {
      return (
        <option key={i}  value={category} >{category}</option>
      )
    })
    return(
      <div>
        <select value={this.state.selectedValue} onChange={this.selectCategory.bind(this)} className="form-control">
          {categories}
        </select>
      </div>
    )
  }
}

export default CategoryDropdown;
