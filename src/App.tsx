import React, { useReducer, useEffect } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/navbar';
import ScrollToTop from './components/scroll-to-top';

import Home from './pages/home';
import Work from './pages/work';
import Writing from './pages/writing';
import Projects from './pages/projects';
import Reading from './pages/reading';


const ThemeSetStore = React.createContext({});
const ThemeStore = React.createContext({});

function languageReducer(
  state: {theme: string}, 
  action: {type: string, theme: string}
) {
  switch (action.type) {
    case 'update':
      return {theme: action.theme};
    default:
      return {theme: action.theme}
  }
}

export default function App() {
  let [state, dispatch] = useReducer(languageReducer, {theme: 'light'});
  
  useEffect(() => {
    if(window.localStorage && state.theme !== localStorage.getItem('theme')){
      if(localStorage.getItem('theme') !== null){
        dispatch({type: 'update', theme: String(localStorage.getItem('theme'))})
      } 
    }
  }, [])
  
  useEffect(()=>{
    if(window.localStorage){
      localStorage.setItem('theme', state.theme);
    }
  },[state.theme])
  
  return (<div className={`app ${state.theme}`}>
    <Router>
      <ScrollToTop />
      <ThemeStore.Provider value={state.theme}>
        <ThemeSetStore.Provider value={dispatch}>
        <Navbar/>
        </ThemeSetStore.Provider>
          <main className="app-content">
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
          </main>
      </ThemeStore.Provider>
    </Router>
  </div>)
};

export {ThemeStore, ThemeSetStore, App}