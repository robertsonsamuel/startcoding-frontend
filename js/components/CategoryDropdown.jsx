import React from 'react';

class CategoryDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categoriesArrary: ['javascript', 'python', 'go', 'ruby','html','css', 'general' ],
      selectedValue: this.props.initialCategory
    };
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
