import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import styled, { ThemeProvider } from 'styled-components';

import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import ThemeSetStore from './theme'
import Navbar from './components/navbar';
import ScrollToTop from './components/scroll-to-top';

import Home from './pages/home';
import Work from './pages/work';
import Writing from './pages/writing';
import Projects from './pages/projects';
import Reading from './pages/reading';

const AppContainer = styled.div`
min-height:100vh;
display: flex;
flex-direction: row;  
@media only screen and (max-width: 768px){
  flex-direction: column;  
}
&.light {
  transition: background 0.2s ease-out, color 0.2s ease-out;
  background: #FCFCFC;
}
&.dark {
  background: #191D26;
  color: #FBFDFF;
  transition: background 0.2s ease-out, color 0.2s ease-out;
}
`

const AppContent = styled.main`
min-height: 95vh;
max-width: 50vw;
margin-left: 30vw;
padding-top: 10vh;
padding-left: 10vw;
@media only screen and (max-width: 768px){
  max-width: 95vw;
  margin-left: unset;
  padding-top: 4vh;
  padding-left: 4vw;
  margin-bottom: 4vh;
}
`

export default function App() {
  const [theme, setTheme] = useState("light");
  const [readFromLS, setReadFromLS] = useState(false);

  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-QM6R472DRJ");
  }, [])

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location])


  
  useEffect(() => {
    if(!readFromLS){
      if(window.localStorage && theme !== localStorage.getItem('theme')){
        if(localStorage.getItem('theme') !== null){
          setTheme(String(localStorage.getItem('theme')));
        } 
      }
      setReadFromLS(true);
    }
  }, [readFromLS, theme])
  
  useEffect(()=>{
    if(window.localStorage){
      localStorage.setItem('theme', theme);
    }
  }, [theme])
  
  return (<AppContainer className={`app ${theme}`}>
      <ScrollToTop />
      <ThemeProvider theme={{bg: theme}}>
        <ThemeSetStore.Provider value={setTheme}>
        <Navbar/>
        </ThemeSetStore.Provider>
          <AppContent>
            <Switch>
              <Route path="/reading">
                <Reading />
              </Route>
              <Route path="/writing">
                <Writing />
              </Route>
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/work">
                <Work />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </AppContent>
      </ThemeProvider>
  </AppContainer>)
};

export {ThemeSetStore, App}