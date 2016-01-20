import React from 'react';
import API from '../API';
import Comment from './Comment';
import NewComment from './NewComment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allComments: [], replying: false };
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
  reply(e) {
    e.preventDefault();
    this.setState({ replying: true });
  }
  postComment(body) {
    this.setState({ replying: false });
    API.postComment(this.props._id, body, 'seed')
    .done(resp => (this.fetchComments.bind(this))())
    .fail(err => alert(err.responseText));
  }
  discard() {
    this.setState({ replying: false });
  }
  componentWillMount() {
    (this.fetchComments.bind(this))();
  }
  render() {
    let commentEls = this.state.allComments.map(comment => {
      return <Comment {...comment} update={this.fetchComments.bind(this)} />
    });
    let newComment = this.state.replying ? <NewComment post={this.postComment.bind(this)}
                                                       discard={this.discard.bind(this)} />
                                         : [];
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
            </div>
            <ol className="panel-footer breadcrumb">
              <span>{this.props.timestamp}</span>
              <li><a href="#" onClick={this.reply.bind(this)}>reply</a></li>
            </ol>
            <div className="panel-body">
              {newComment}
              {commentEls}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Topic;
