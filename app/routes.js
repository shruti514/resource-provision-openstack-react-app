import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CreateVM from './components/CreateVM';


export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/create' component={CreateVM} />
  </Route>
);
