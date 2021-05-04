import React, { useState, useContext, MouseEvent } from 'react';
import {Link} from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';


import day from '../../assets/icons/day.svg';
import night from '../../assets/icons/night.svg'

import { ThemeSetStore } from '../../App'

const experience = require('../../assets/data/experience.json');

const NavbarContainer = styled.nav`
position: fixed;
padding-top: 10vh;
padding-left: 10vw;
padding-right: 10vw;
@media only screen and (max-width: 768px){
  position: static;
  padding-top: 4vh;
  padding-left: 4vw;
}
justify-content: center;
display: flex;
flex-direction: column;
justify-content: space-between;
font-weight: 500;
min-height: 61vh;
@media only screen and (max-width: 768px){
  flex-direction: row;
  min-height: auto;
}
`

const LinksContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
#work.active{
  margin-bottom: 0.25rem;
}

a {
  margin-bottom: 1rem;
  width: fit-content;
  p {
    width: fit-content;
  }
  &.highlight.active {
    p {
      width: fit-content;
      border-bottom: none;
    }
  }
}
`

const Name = styled.div`
user-select: none;
font-size: 1.1rem;
margin-bottom: 1rem;
width: fit-content;
`

const WorkEx = styled.div`
outline: none;
-webkit-tap-highlight-color: rgba(100, 255, 255, 0);
cursor: pointer;
font-weight: normal;
opacity: 0.7;
font-weight: 300;
margin-bottom: 1rem;
border-left: 1px solid #DBDBDB;
&.hide {
  display: none;
}
&.show {
  display: block;
  margin-left: 0.75vw;
}
p {
  margin-left: 1vw;
  user-select: none;
  margin-bottom: 0.1vh;
}
a {
  margin-bottom: 10vh;
  p {
    color: inherit;
    border-bottom: none;
  }
}
`

const ThemeContainer = styled.span`
margin-top: 4rem;
`

const workex: { [path: string]: number; }= {
  "name": 1,
  "/": 1,
  "/work": 2,
  "/writing": 3,
  "/reading": 4,
  "/projects": 5,
}

const FancyLink = styled(Link)`
text-decoration: none;
position: relative;
color: inherit;
position:relative;
display:inline-block;
transition: all 0.3s ease-out;
&.active {
  p {
    color: ${props => props.theme.bg === 'light' ? 'black' : '#FBFDFF'};
    border-bottom: none;
  }
}
&:visited {
  color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
}
&.highlight {
  color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
  &:after {
    content: "";
    border-bottom:solid transparent 2px;
    border-radius: 2px;
    position: absolute;
    display:block;
    left: 0;
    margin:0 auto;
    top:90%;
    background-color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
    opacity: 0.5;
    height: 1px;
    width: 0%;
    transition: width 0.3s ease;
  }
  &.active {
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
  &:hover {
    &:after {
      width: 100%;
    }
  }
}
&.nohighlight {
  color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
}
`

export default function Navbar() {
  const [active, setActive] = useState(0);
  const setTheme = useContext(ThemeSetStore);
  const theme = useContext(ThemeContext);
  
  if(active !== workex[window.location.pathname]){
    setActive(workex[window.location.pathname])
  }
  
  function toggleTheme(e: MouseEvent) {
    e.preventDefault();
    setTheme(theme.bg === 'light' ? 'dark':'light');
    e.stopPropagation();
  }
  
  return (
    <NavbarContainer>
      <LinksContainer>
        <Name>Aditya Arora</Name>
        <FancyLink className={`highlight ${active === 1?"active": ""}`} to="/" onClick={() => setActive(1)}><p>About</p></FancyLink>
        <FancyLink className={`highlight ${active === 2?"active": ""}`} id={active === 2?"work": ""} to="work" onClick={() => setActive(2)}><p>Work</p></FancyLink>
        <WorkEx className={`${active === 2?"show": "hide"}`}>
          {experience.map((job: any, i:number) => {
            return <p className="nohighlight" onClick={() => {
               // @ts-ignore
              document.getElementById(job.company_name).scrollIntoView(
                {behavior: "smooth", block: "center", inline: "center"}
              );
            }} key={i}>{job.company_name}</p>
          })}
        </WorkEx>
        <FancyLink className={`highlight ${active === 3?"active": ""}`} to="writing" onClick={() => setActive(3)}><p>Writing</p></FancyLink>
        <FancyLink className={`highlight ${active === 4?"active": ""}`} to="reading" onClick={() => setActive(4)}><p>Reading</p></FancyLink>
        <FancyLink className={`highlight ${active === 5?"active": ""}`} to="projects" onClick={() => setActive(5)}><p>Projects</p></FancyLink>
      </LinksContainer>
      <div>
        <ThemeContainer onClick={(e) => toggleTheme(e)}>
          <img src={theme.bg === "light" ? night:day} alt={theme.bg === "light" ? "moon":"sun"}/>
        </ThemeContainer>
      </div>
    </NavbarContainer>
  )
}