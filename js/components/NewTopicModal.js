import React from 'react';
import API from '../API';

class NewTopicModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'NewTopicModal';
  }
  render() {
    return (
      <div>
        <button type="button" className="floatingActionButton" data-toggle="modal" data-target="#myModal">
          <span>+</span>
        </button>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTopicModal;
