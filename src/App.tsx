import React from 'react';
import './App.scss';

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/navbar';

import Home from './pages/home';
import Work from './pages/work';
import Writing from './pages/writing';
import Projects from './pages/projects';
import Reading from './pages/reading';

export default function App() {
  return (<div className="app">
    <HashRouter>
      <Navbar/>
      <div className="app-content">
        <Switch>
          <Route path="/reading">
            {Reading()}
          </Route>
          <Route path="/writing">
            {Writing()}
          </Route>
          <Route path="/projects">
            {Projects()}
          </Route>
          <Route path="/work">
            {Work()}
          </Route>
          <Route path="/">
            {Home()}
          </Route>
        </Switch>
      </div>
    </HashRouter>
  </div>)
};
