import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import CategoryDropdown from './CategoryDropdown.jsx';
import {canHazToken} from '../util/authorization';
import {pleaseLogin,genErr} from '../util/alerts';
import '../../css/newResourceModal.css';
import '../../css/reactTags.css';
import {store} from '../util/store';

// needed for fancy auto-complete tags box
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const ReactTags = require('./reactTags').WithContext;
// const ReactTags = require('react-tag-input').WithContext;

// normalize tag names
String.prototype.normalize = function() {
  return this.replace(/\W/g, '').toLowerCase();
}

class NewResourceModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'NewResourceModal.jsx';
    this.state = {
      loading: false,
      selectedValue: this.props.initialCategory,
      tags: [],
      suggestions: store.getDatum('allTags')
    };
  }

  componentWillMount() {
    store.registerListener('allTags', () => {
      this.setState({ suggestions: store.getDatum('allTags') });
    });
  }

  // TAG INPUT STUFF
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }
  handleAddition(tag) {
    let tags = this.state.tags;
    tag = tag.normalize();
    // if (!tags.some(existingTag => existingTag.text == tag)) {
      tags.push({
        id: tags.length + 1,
        text: tag
      });
    // }
    this.setState({ tags: tags });
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags: tags });
  }

  newResource(){
    if(!canHazToken()) return pleaseLogin();
    $('#newResourceModal').modal('show');
  }

  selectCategory(category){
    this.setState({selectedValue: category});
  }

  createResource(){
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    let aLink = this.refs.aLink.value;

    let tagSet = new Set(this.state.tags.map(tag => tag.text));
    let tags = [...tagSet];

    let category = this.state.selectedValue;

    if (title.length === 0 || body.length === 0 || aLink.length === 0){
      return genErr('Title and Body both required!')
    }

    $('#newResourceModal .input').prop('disabled', true); // disable inputs
    this.setState({ loading: true });

    API.postResource(title, body, aLink, tags, category)
    .done((resource) => {
      $('#newResourceModal').modal('hide');
      API.getAllTags(); // get new list of tags

      // reinitialize
      this.setState({ loading: false, tags: [] });
      this.refs.title.value = '';
      this.refs.body.value = '';
      this.refs.aLink.value = '';

      // possibly add the new resource to main
      this.props.optimisticallyAdd(resource);

      // THIS MIGHT BE BREAKING THINGS - NEWLY CREATED RESOURCES HAVE NONZERO SCORE
      // this.props.resourcePosted(() => {
      //   $('#newResourceModal .input').prop('disabled', false);
      // });
    })
    .fail(err => {
      genErr(err.responseText);
    })
    .always(() => {
      $('#newResourceModal .input').prop('disabled', false);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
        <img src="./img/fab.png" id="actionButon" className="floatingActionButton" onClick={this.newResource.bind(this)}  data-target="#newResourceModal" />
        <div className="modal fade" id="newResourceModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="resourceModalLabel">Create a new resource.</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input type="text" ref="title" className="newResourceTitle input" placeholder="Title" required />
                    <br/>
                    <input type="text" ref="aLink" className="newResourceLink input" placeholder="Link or URL" required />
                    <br/>
                  </div>
                </div>
                <div className="spinnerContainer">
                  {this.state.loading ? <LoadingSpinner /> : []}
                </div>
                <br/>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <textarea id="newTitleBody" placeholder="..." className="form-control input" ref="body" rows="5" required >
                    </textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <label htmlFor="reactTags">Tags:</label>
                    <ReactTags tags={this.state.tags}
                               suggestions={this.state.suggestions}
                               handleDelete={this.handleDelete.bind(this)}
                               handleAddition={this.handleAddition.bind(this)}
                               handleDrag={this.handleDrag.bind(this)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <label htmlFor="categoryDropdown">Category:</label>
                    <CategoryDropdown initialCategory={this.props.initialCategory} selectCategory={this.selectCategory.bind(this)} />
                  </div>
                  <div className="col-sm-6 col-md-6">
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <span className="markdownNotice">*Your post will render <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!</span>
                <button type="button" className="btn btn-default input" data-dismiss="modal">Discard</button>
                <button type="button" className="btn btn-primary input" onClick={this.createResource.bind(this)}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(NewResourceModal);
