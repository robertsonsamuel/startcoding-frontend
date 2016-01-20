import React from 'react';
import RegisterForm from './RegisterForm';
import API from '../API';

class Comment extends React.Component {
  render() {
    let commentEls = this.props.children.map( (child,i) => {
      return <Comment {...child } key={i} />
    })
    return (
      <div className="panel panel-default comment">
        <div className="panel-heading"><div className="panel-title"><div className="panel-title">{this.props.user.username}</div></div></div>
        <div className="panel-body">
          {this.props.body}
        </div>
        <ol className="panel-footer breadcrumb">
          <span>{this.props.timestamp}</span>
          <li><a href="">edit</a></li>
          <li><a href="">reply</a></li>
          <li><a href="">delete</a></li>
        </ol>
        {commentEls}
      </div>
    )
  }
}

export default Comment;
