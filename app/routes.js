import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CreateVM from './components/CreateVM';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Charts from './components/Charts';
import Profile from './components/Profile';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/create' component={CreateVM} />
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={SignUp}/>
    <Route path='/charts' component={Charts}/>
    <Route path='/profile' component={Profile}/>
  </Route>
);
