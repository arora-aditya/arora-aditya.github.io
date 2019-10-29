import React, { useState, useContext, MouseEvent } from 'react';
import {Link} from 'react-router-dom';
import './index.scss';

import day from '../../assets/icons/day.svg';
import night from '../../assets/icons/night.svg'

import { ThemeSetStore, ThemeStore } from '../../App'

const experience = require('../../assets/data/experience.json');


const workex: { [path: string]: number; }= {
  "name": 1,
  "#/": 1,
  "#/work": 2,
  "#/writing": 3,
  "#/reading": 4,
  "#/projects": 5,
  // "#/links": 6,
  // "#/people": 7
}

export default function Navbar() {
  const [active, setActive] = useState(0);
  const dispatch = useContext(ThemeSetStore);
  const theme = useContext(ThemeStore);
  
  if(active !== workex[window.location.hash]){
    setActive(workex[window.location.hash])
  }
  
  function toggleTheme(e: MouseEvent) {
    e.preventDefault()
    // @ts-ignore
    dispatch({action: 'update', theme: theme == 'light' ? 'dark':'light'});
    e.stopPropagation();
  }
  
  return (
    <nav className="navbar">
      <div className="links">
        <div id="name">Aditya Arora</div>
        <Link className={active === 1?"active": ""} to="/" onClick={() => setActive(1)}><p>About</p></Link>
        <Link className={active === 2?"active": ""} to="work" onClick={() => setActive(2)}><p>Work</p></Link>
        <div className={`work-ex ${active === 2?"show": "hide"}`}>
          {experience.map((job: any, i:number) => {
            return <p className="nohighlight" onClick={() => {
               // @ts-ignore
              document.getElementById(job.company_name).scrollIntoView(
                {behavior: "smooth", block: "center", inline: "center"}
              );
            }} key={i}>{job.company_name}</p>
          })}
        </div>
        <Link className={active === 3?"active": ""}to="writing" onClick={() => setActive(3)}><p>Writing</p></Link>
        <Link className={active === 4?"active": ""}to="reading" onClick={() => setActive(4)}><p>Reading</p></Link>
        <Link className={active === 5?"active": ""}to="projects" onClick={() => setActive(5)}><p>Projects</p></Link>
        {
          // <Link className={active === 6?"active": ""}to="links" onClick={() => setActive(6)}><p>Links</p></Link>
          // <Link className={active === 7?"active": ""}to="people" onClick={() => setActive(7)}><p>People</p></Link>
        }
      </div>
      <div>
        <span className="theme" onClick={(e) => toggleTheme(e)}>
          <img src={theme == "light" ? night:day} alt={theme == "light" ? "moon":"sun"}/>
        </span>
      </div>
    </nav>
  )
}