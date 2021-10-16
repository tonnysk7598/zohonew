import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from '../nav/NavBar';
import CloneContact from './CloneContact';
import CreateContact from './CreateContact';
import DetailsView from './DetailsView';
import EditContact from './EditContact';
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
            <Route path="/create" component={CreateContact} />
            <Route path="/edit/:id" component={EditContact} />
            <Route path="/view/:id" component={DetailsView} />
            <Route path="/clone/:id" component={CloneContact} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
