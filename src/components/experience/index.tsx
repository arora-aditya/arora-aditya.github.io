import React, { useState } from 'react';
import './index.scss';

interface ExperienceProp {
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
  
  return (<div className="experience">
            <div className="logo">
                <img className="img-responsive" src={state.company_logo} />
            </div>
            <div className="col-md-8 pad-s">
              <p className="primary">
                {state.title}&nbsp;
                <a href={state.company_website} className="highlight" target="_blank">
                  {state.company_name}
                </a>
              </p>
              <p className="secondary">{state.location}</p>
              <p className="secondary">{state.timeline}</p>
              <div className="points">
                {state.points.map((point, i) => {
                  return (
                    <div className="point">{'- ' + point + "\n"}</div>
                  )
                })}
              </div>
            </div>
          </div>)
};

export {Experience};

