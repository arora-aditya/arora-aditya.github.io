import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';

const experience = require('../../assets/data/experience.json');

const workex: { [path: string]: number; }= {
  "name": 1,
  "#/work": 2,
  "#/writing": 3,
  "#/reading": 4,
  "#/projects": 5,
  // "#/links": 6,
  // "#/people": 7
}

export default function Navbar() {
  const [active, setActive] = useState(0);
  
  if(active !== workex[window.location.hash]){
    setActive(workex[window.location.hash])
  }
  
  return (
    <nav className="navbar">
      <Link id="name" to="/" onClick={() => setActive(1)}>Aditya Arora</Link>
      <Link className={active === 2?"active": ""}to="work" onClick={() => setActive(2)}><p>Work</p></Link>
      <div className={`work-ex ${active === 2?"show": "hide"}`}>
        {experience.map((job: any, i:number) => {
          return <div className="nohighlight" onClick={() => {
             // @ts-ignore
            document.getElementById(job.company_name).scrollIntoView(
              {behavior: "smooth", block: "end", inline: "nearest"}
            );
          }} key={i}><p>{job.company_name}</p></div>
        })}
      </div>
      <Link className={active === 3?"active": ""}to="writing" onClick={() => setActive(3)}><p>Writing</p></Link>
      <Link className={active === 4?"active": ""}to="reading" onClick={() => setActive(4)}><p>Reading</p></Link>
      <Link className={active === 5?"active": ""}to="projects" onClick={() => setActive(5)}><p>Projects</p></Link>
      {
        // <Link className={active === 6?"active": ""}to="links" onClick={() => setActive(6)}><p>Links</p></Link>
        // <Link className={active === 7?"active": ""}to="people" onClick={() => setActive(7)}><p>People</p></Link>
      }
    </nav>
  )
}