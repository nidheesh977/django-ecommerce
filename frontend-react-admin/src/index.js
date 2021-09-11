import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import CreateProduct from './components/createProduct';
import HandleProductCheckout from './components/handleProductCheckout';
import HandleCartCheckout from './components/handleCartCheckout';
import Login from './components/login';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "popper.js/dist/umd/popper.min.js"


ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path = "/" component = {CreateProduct} />
        <Route exact path = "/handle-product-checkout/" component = {HandleProductCheckout} />
        <Route exact path = "/handle-cart-checkout/" component = {HandleCartCheckout} />
        <Route exact path = "/login/" component = {Login} />
      </Switch>
    </React.StrictMode>,
  </Router>,
  document.getElementById('root')
);
