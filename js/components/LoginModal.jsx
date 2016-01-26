import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import {canHazToken} from '../util/authorization';
import {pleaseLogin,genErr} from '../util/alerts';



class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal.jsx';
    this.state = { loading: false };
  }

  // newTopic(){
  //   if(!canHazToken()) return pleaseLogin();
  //   $('#LoginModal').modal('show');
  // }
  // createTopic(){
  //   let title = this.refs.title.value;
  //   let body = this.refs.body.value;
  //   if(title.length === 0 || body.length === 0){
  //     return genErr('Title and Body both required!')
  //   }
  //   $('#LoginModal .input').prop('disabled', true); // disable inputs
  //   this.setState({ loading: true });
  //   API.postTopic(title, body)
  //   .done(() =>{
  //     $('#LoginModal').modal('hide');
  //     this.refs.title.value = '';
  //     this.refs.body.value = '';
  //     this.props.topicPosted(() => {
  //       $('#LoginModal .input').prop('disabled', false);
  //     });
  //   })
  //   .fail(err => {
  //     $('#LoginModal .input').prop('disabled', false);
  //     genErr(err.responseText);
  //   })
  //   .always(() => this.setState({ loading: false }));
  // }

  // {this.state.loading ? <LoadingSpinner /> : []}
 
  render() {
    return (
      <div className="modal fade" id="LoginModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">

              <div className="col-xs-12 col-md-6">Login</div>
              <div className="col-xs-12 col-md-6">Register</div>
                

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal;
