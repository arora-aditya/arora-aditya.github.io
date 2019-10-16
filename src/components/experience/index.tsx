import React, { useState } from 'react';
import './index.scss';

interface ExperienceProp {
  key: number;
  company_logo: string;
  company_name: string;
  company_website: string;
  title: string;
  timeline: string;
  location: string;
  points: string[];
}

export default function Experience(props: ExperienceProp) {
  const [state, setState] = useState(props);
  
  return (<div className="experience" key={state.key}>
            <div className="logo">
                <img className="img-responsive" src={state.company_logo} />
            </div>
            <div className="details">
              <p className="title">
                {state.title},&nbsp;
                <a href={state.company_website} className="highlight" target="_blank" rel="noopener noreferrer">
                  {state.company_name}
                </a>
              </p>
              <p className="secondary">{state.location}</p>
              <p className="secondary">{state.timeline}</p>
              <div className="points">
                {state.points.map((point, i) => {
                  return (
                    <div key={i} className="point">{'- ' + point + "\n"}</div>
                  )
                })}
              </div>
            </div>
          </div>)
};

export {Experience};

