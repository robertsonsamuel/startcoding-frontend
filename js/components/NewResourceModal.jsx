import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import CategoryDropdown from './CategoryDropdown.jsx';
import {canHazToken} from '../util/authorization';
import {pleaseLogin,genErr} from '../util/alerts';
import '../../css/newResourceModal.css';
import '../../css/reactTags.css';
import {store} from '../util/store';
import {MAX_RESOURCE_TITLE_LENGTH, MAX_RESOURCE_BODY_LENGTH} from '../util/CONST.js';

// needed for fancy auto-complete tags box
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const ReactTags = require('./reactTags').WithContext;

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
      suggestions: store.getDatum('allTags'),
      title: '',
      body: ''
    };
  }

  setFreshTags() {
    this.setState({ suggestions: store.getDatum('allTags') });
  }
  componentWillMount() {
    store.registerListener('allTags', this.setFreshTags.bind(this));
  }
  componentWillUnmount() {
    store.stopListening('allTags', this.setFreshTags.bind(this));
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
    tags.push({
      id: tags.length + 1,
      text: tag
    });
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

  createResource(e){
    e.preventDefault();
    let title = this.state.title;
    let body = this.state.body;
    let aLink = this.refs.aLink.value;

    let tagSet = new Set(this.state.tags.map(tag => tag.text));
    let tags = [...tagSet];

    let category = (this.state.selectedValue === '-select one-') ? 'general' : this.state.selectedValue;
    if (category.toLowerCase() === 'all') category = 'general';

    if (title.length === 0 || body.length === 0 || aLink.length === 0){
      return genErr('Title and Body both required!')
    }

    $('#newResourceModal .input').prop('disabled', true); // disable inputs
    this.setState({ loading: true });
    console.log('category problem?',category);
    API.postResource(title, body, aLink, tags, category)
    .done((resource) => {
      $('#newResourceModal').modal('hide');
      API.getAllTags(); // get new list of tags

      // reinitialize
      this.setState({ loading: false, tags: [] });
      this.refs.aLink.value = '';
      this.setState({ title: '', body: '' });

      // possibly add the new resource to main
      this.props.optimisticallyAdd(resource);
      location.hash = `#/${this.props.initialCategory}/resource/${resource._id}`;
    })
    .fail(err => {
      genErr(err.responseText);
    })
    .always(() => {
      $('#newResourceModal .input').prop('disabled', false);
      this.setState({ loading: false });
    });
  }

  handleTitleChange(e) {
    if (e.target.value.length > MAX_RESOURCE_TITLE_LENGTH) {
      let allowedText = e.target.value.slice(0, MAX_RESOURCE_TITLE_LENGTH);
      this.setState({ title: allowedText });
    } else {
      this.setState({ title: e.target.value });
    }
  }

  handleBodyChange(e) {
    if (e.target.value.length > MAX_RESOURCE_BODY_LENGTH) {
      let allowedText = e.target.value.slice(0, MAX_RESOURCE_BODY_LENGTH);
      this.setState({ body: allowedText });
    } else {
      this.setState({ body: e.target.value });
    }
  }

  render() {
    console.log("initial category", this.props.initialCategory);
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
              <form onSubmit={this.createResource.bind(this)}>
              <div className="modal-body row">
                <div className="col-sm-12">
                  <input type="text"
                         className="newResourceTitle input form-control"
                         placeholder="Title"
                         value={this.state.title}
                         onChange={this.handleTitleChange.bind(this)}
                         required />
                  <br/>
                  <input type="url" ref="aLink" className="newResourceLink input form-control" placeholder="http://" required />
                  <br/>
                </div>
                <div className="spinnerContainer">
                  {this.state.loading ? <LoadingSpinner /> : []}
                </div>
                <br/>
                <div className="col-sm-12">
                  <textarea id="newTitleBody"
                            placeholder="Details"
                            className="form-control input"
                            value={this.state.body}
                            rows="5"
                            onChange={this.handleBodyChange.bind(this)}
                            required >
                  </textarea>
                  <span style={{float: 'right', color: 'grey'}}>
                    {this.state.body.length}/{MAX_RESOURCE_BODY_LENGTH}
                  </span>
                </div>
                <div className="col-xs-12">
                  <label htmlFor="reactTags">Tags:</label>
                  <ReactTags tags={this.state.tags}
                             suggestions={this.state.suggestions}
                             handleDelete={this.handleDelete.bind(this)}
                             handleAddition={this.handleAddition.bind(this)}
                             handleDrag={this.handleDrag.bind(this)} />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="categoryDropdown">Category:</label>
                  <CategoryDropdown initialCategory={this.props.initialCategory}
                                    selectCategory={this.selectCategory.bind(this)} />
                </div>
                <div className="col-sm-6">
                </div>
              </div>
              <div className="modal-footer">
                <span className="markdownNotice">*Your post will render <a href="https://help.github.com/articles/markdown-basics/">markdown</a>!</span>
                <button type="button" className="btn btn-default input" data-dismiss="modal">Discard</button>
                <button type="submit" className="btn btn-primary input">Post</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(NewResourceModal);
