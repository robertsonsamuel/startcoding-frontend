import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import User from './components/User.jsx';
import SplashPage from './components/splashPage.jsx';
import ResourcePage from './components/ResourcePage.jsx';
import {store} from './util/store'
import '../css/sweetalert.css';
import '../css/google.css';
import '../css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: store.getDatum('me')
    }

  }
  putMeOnState(){
    let me = store.getDatum('me');
    this.setState({me: me})
  }
  componentWillMount(){
    store.registerListener('me', this.putMeOnState.bind(this) )
  }
  componentWillUnmount() {
    store.stopListening('me', this.putMeOnState.bind(this) )
  }
  render() {
    switch (this.props.location[0]) {
      case '':
        return (
          <div>
            <Navbar/>
            <SplashPage/>
          </div>
        )
      case 'resource':
        return (
          <div>
            <Navbar/>
            <ResourcePage resourceId={this.props.location[1]} me={this.state.me} />
          </div>
        )
      case 'user':
        return (
          <div>
            <Navbar/>
            <User category={this.props.location[1]} meId={this.props.location[2]} me={this.state.me}></User>
          </div>
        )
      default:
        return (
          <div>
            <Navbar/>
            <Main category={this.props.location[0]} me={this.state.me}></Main>
          </div>
        )
    }
  }
}

// Split location into `/` separated parts, then render `Application` with it
function handleNewHash() {
  var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
  ReactDOM.render(<App location={location} />, document.getElementById('React'));
}

// Handle the initial route and browser navigation events
handleNewHash()
window.addEventListener('hashchange', handleNewHash, false);
