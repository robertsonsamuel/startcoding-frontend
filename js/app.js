import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Comment from './components/Comment';

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Comment />, document.getElementById('test'));
