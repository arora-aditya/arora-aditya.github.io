import React from 'react';
import './index.scss';

interface Job {
  company_logo: string;
  company_name: string;
  company_website: string;
  title: string;
  timeline: string;
  location: string;
  points: string[];
}
const experience: Job[] = require('../../assets/data/experience.json');

export default function Home() {
  return (
    <div className="work">
      <div className="jobs">
      {experience.map((job, i) => {
        return (
          <div className="job" key={i} id={job.company_name}>
            <p className="primary">
              {job.title},{' '}
              <a className="highlight" href={job.company_website} target="blank" rel="noopener noreferrer">
                {job.company_name.replace(/\s/g, '\xA0')}
              </a>
            </p>
            <p className="secondary">{job.timeline}, {job.location}</p>
            {job.points.map((point, j) => {
              return <p className="point" key={j}>- {point}</p>
            })}
          </div>
        );
      })}
      </div>
    </div>
  )
}