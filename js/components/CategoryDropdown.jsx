import React from 'react';

class CategoryDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categoriesArrary: ['javascript', 'python', 'go', 'ruby','html','css', 'general' ],
      defaultSelector: window.location.hash.replace(/^#\/?|\/$/g, '').split('/')[0]
    };
  }

  render(){

    let categories = this.state.categoriesArrary.map((category, i) => {
      return (
        <option key={i}  value={category} >{category}</option>
      )
    })
    return(
      <div>
        <select value={this.state.defaultSelector} onChange={this.props.selectCategory} className="form-control">
          {categories}
        </select>
      </div>
    )
  }
}

export default CategoryDropdown;
