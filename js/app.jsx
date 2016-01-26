import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

import Navbar from './components/Navbar.jsx';
// import Main from './components/Main.jsx';
import '../css/sweetalert.css';
import '../css/google.css';
import '../css/style.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <ul>
          <li><Link to="/all">All</Link></li>
          <li><Link to="/js">JS</Link></li>
          <li><Link to="/html">HTML</Link></li>
        </ul>
      </div>
    )
  }
}


class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.params.category}</h1>
        <ul>
          <li><Link to="/">Landing Page</Link></li>
        </ul>
      </div>
    )
  }
}




ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>

      <IndexRoute component={Landing}/>
    
      <Route path=":category" component={Main}/>
    
    </Route>
  </Router>
), document.getElementById('React'))


      // <Route path="users" component={Users}>
      //   <IndexRoute component={UsersIndex}/>
      //   <Route path=":id" component={User}/>
      // </Route>
