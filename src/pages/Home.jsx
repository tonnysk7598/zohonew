import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from '../nav/NavBar';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';

export default class Home extends Component {
  render() {
    return (
      <div>
          <NavBar />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route component={ErrorPage} />
            </Switch>
          </BrowserRouter>
      </div>
    )
  }
}
