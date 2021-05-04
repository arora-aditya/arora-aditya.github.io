import React from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';

import { ProjectAssets } from '../../assets';


interface Project {
  link: string;
  image_alt: string;
  title: string;
  description: string;
}

const projects: Project[] = require('../../assets/data/projects.json');

const ProjectsContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
`

const Project = styled.div`
margin-bottom: 2vh;
display: flex;
flex-direction: column;
`

const ProjectImg = styled.div`
display: block;
height:40vh;
width:30vw;
@media only screen and (max-width: 768px){
  width: 90vw;
}
background-repeat: no-repeat;
background-size: cover;
background-position: center;
border-radius: 2px;
background-image: url('${props => ProjectAssets[props.title!]}');
border: 0.5px solid #EEE;
`

const ProjectTitle = styled.div`
font-weight: 500;
width:30vw;
@media only screen and (max-width: 768px){
  width: 90vw;
}
`

const ProjectDescription = styled.div`
width:30vw;
@media only screen and (max-width: 768px){
  width: 90vw;
}
`

export default function Projects() {
  return (
    <ProjectsContainer>
    {projects.map((project, i) => 
      <FancyLink key={i} href={project.link} target="_blank" rel="noopener noreferrer">
        <Project>
          <ProjectImg title={project.title}></ProjectImg>
          <ProjectTitle className="highlight">{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
        </Project>
      </FancyLink>
    )}
    </ProjectsContainer>
  )
}