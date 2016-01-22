import React from 'react';
import API from '../API';
import {genErr} from '../util/alerts';

class NewTopicModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'NewTopicModal';
  }
  createTopic(){
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    if(title.length === 0 || body.length === 0){
      return genErr('Title and Body both required!')
    }
    API.postTopic(title,body)
    .done(() =>{
      this.refs.title.value = '';
      this.refs.body.value = '';
      this.props.topicPosted()
    })
    .fail(err => genErr(err.responseText));
  }
  render() {
    return (
      <div>
        <button type="button" className="floatingActionButton" data-toggle="modal" data-target="#newTopicModal">
          <span>+</span>
        </button>

        <div className="modal fade" id="newTopicModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="topicModalLabel">Create a new topic.</h4>
              </div>
              <div className="modal-body">
                <input type="text" ref="title" className="newTopicTitle" placeholder="Title" required />
                  <textarea id="newTitleBody" placeholder="..." className="form-control" ref="body" rows="4" required>
                  </textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Discard</button>
                <button type="button" className="btn btn-primary" onClick={this.createTopic.bind(this)}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTopicModal;
