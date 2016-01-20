import React from 'react';
import API from '../API';
import Comment from './Comment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [] };
  }
  componentWillMount() {
    API.getComments(this.props._id)
    .done( resp => {
      console.log("resp", resp);
      this.setState( {allComments: resp} )
    })
    .fail( err => {
      console.log(err);
    })
  }
  render() {
    let commentEls = this.state.allComments.map(comment => {
      return <Comment {...comment} />
    })
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {this.props.title}
              </a>
            </h4>
          </div>
          <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              {commentEls}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Topic;
