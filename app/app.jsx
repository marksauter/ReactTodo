import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'

import * as actions from 'actions'
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/'

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!appplicationStyle')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
