import React from 'react';
import ReactDOM from 'react-dom';
import Product from "./components/product"
import Header from './components/header'
import Register from './components/register';
import Login from './components/login';
import Cart from './components/cart';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "popper.js/dist/umd/popper.min.js"
import CheckoutList from './components/checkoutList';
import Account from './components/account'
import AccountEdit from './components/account-edit'

ReactDOM.render(
  <Router>
      <React.StrictMode>
        <Header />
        <Switch>
          <Route exact path = "/" component = {Product} />
          <Route path = "/register/" component = {Register} />
          <Route path = "/login/" component = {Login} />
          <Route path = "/cart/" component = {Cart} />
          <Route path = "/checkout-list/" component = {CheckoutList} />
          <Route path = "/account/" component = {Account} />
          <Route path = "/account-edit/" component = {AccountEdit} />
        </Switch>
      </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

