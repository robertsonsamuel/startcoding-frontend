import React from 'react';
import API from '../API';
import {canHazToken} from '../util/authorization';
import {pleaseLogin,genErr} from '../util/alerts';

class NewTopicModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'NewTopicModal';
  }
  newTopic(){
    if(!canHazToken()) return pleaseLogin();
    $('#newTopicModal').modal('show');
  }
  createTopic(){
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    if(title.length === 0 || body.length === 0){
      return genErr('Title and Body both required!')
    }
    $('#newTopicModal .input').prop('disabled', true); // disable inputs
    API.postTopic(title, body)
    .done(() =>{
      this.refs.title.value = '';
      this.refs.body.value = '';
      this.props.topicPosted(() => {
        $('#newTopicModal .input').prop('disabled', false);
      });
    })
    .fail(err => genErr(err.responseText));
  }
  render() {
    return (
      <div>
        <button type="button" className="floatingActionButton" onClick={this.newTopic.bind(this)}  data-target="#newTopicModal">
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
                <input type="text" ref="title" className="newTopicTitle input" placeholder="Title" required />
                <textarea id="newTitleBody" placeholder="..." className="form-control input" ref="body" rows="4" required >
                </textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default input" data-dismiss="modal">Discard</button>
                <button type="button" className="btn btn-primary input" onClick={this.createTopic.bind(this)}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTopicModal;
