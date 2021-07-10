import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/header'
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Cart from './components/cart';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "popper.js/dist/umd/popper.min.js"

ReactDOM.render(
  <Router>
      <React.StrictMode>
        <Header />
        <Switch>
          <Route exact path = "/" component = {App} />
          <Route path = "/register/" component = {Register} />
          <Route path = "/login/" component = {Login} />
          <Route path = "/logout/" component = {Logout} />
          <Route path = "/cart/" component = {Cart} />
        </Switch>
      </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

