import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CreateVM from './components/CreateVM';
import Index from './components/Index';
import SignUp from './components/SignUp';
import Login from './components/Login';


export default (
  <Route component={App}>
    <Route path='/' component={Index} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={SignUp} />
    <Route path='/home' component={Home} />
    <Route path='/create' component={CreateVM} />
  </Route>
);
