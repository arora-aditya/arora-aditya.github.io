import React from 'react';
import styled from 'styled-components';

import FancyLink from '../../components/FancyLink';

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

const WorkContainer = styled.div`
width: fit-content;
display: flex;
flex-direction: column;
`

const Job = styled.div`
margin-bottom: 2rem;
`

const JobTitle = styled.p`
font-weight: 500;
`

const JobDescription = styled.p`
font-size: 0.9rem;
margin: 0.25rem 0 0.5rem 0;
`

const JobPoint = styled.p`
opacity: 0.7;
font-size: 0.9rem;
margin-bottom: 0.3rem;
`

export default function Home() {
  return (
    <WorkContainer>
      {experience.map((job, i) => {
        return (
          <Job key={i} id={job.company_name}>
            <JobTitle>
              {job.title},{' '}
              <FancyLink className="highlight" href={job.company_website} target="blank" rel="noopener noreferrer">
                {job.company_name.replace(/\s/g, '\xA0')}
              </FancyLink>
            </JobTitle>
            <JobDescription>{job.timeline}, {job.location}</JobDescription>
            {job.points.map((point, j) => {
              return <JobPoint key={j}>- {point}</JobPoint>
            })}
          </Job>
        );
      })}
    </WorkContainer>
  )
}