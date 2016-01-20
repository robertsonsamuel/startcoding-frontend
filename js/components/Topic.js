import React from 'react';
import API from '../API';
import Comment from './Comment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [] };
  }
  fetchComments() {
    API.getComments(this.props._id)
    .done( resp => {
      this.setState( {allComments: resp} );
    })
    .fail( err => {
      console.log(err);
    })
  }
  componentWillMount() {
    (this.fetchComments.bind(this))();
  }
  render() {
    let commentEls = this.state.allComments.map(comment => {
      return <Comment {...comment} update={this.fetchComments.bind(this)} />
    })
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {this.props.title} by {this.props.user.username}
              </a>              
            </h4>
          </div>
          <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              {this.props.body}
              {commentEls}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Topic;
