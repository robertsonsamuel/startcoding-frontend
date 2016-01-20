import React from 'react';
import RegisterForm from './RegisterForm';
import API from '../API';

class Comment extends React.Component {
  render() {
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading"><div className="panel-title"><div className="panel-title">Paul</div></div></div>
        <div className="panel-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nemo consequuntur tenetur alias eum quas dolore hic repellendus quos, doloribus dignissimos obcaecati vitae modi cumque minima aut quisquam excepturi odio aspernatur, tempore eius. Obcaecati modi, eum harum voluptatibus veniam delectus!
        </div>
        <ol className="panel-footer breadcrumb">
          <span>timestamp</span>
          <li><a href="">edit</a></li>
          <li><a href="">reply</a></li>
          <li><a href="">delete</a></li>
        </ol>
      </div>
    )
  }
}

export default Comment;
