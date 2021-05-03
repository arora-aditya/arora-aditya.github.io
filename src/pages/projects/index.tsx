import React from 'react';
import './index.scss';

import { ProjectAssets } from '../../assets';


interface Project {
  link: string;
  image_alt: string;
  title: string;
  description: string;
}

const projects: Project[] = require('../../assets/data/projects.json');

export default function Projects() {
  return (
    <div className="projects">
    {projects.map((project, i) => {
      return (
        <a key={i} href={project.link} target="_blank" rel="noopener noreferrer">
          <div className="project">
            <div className="img" style={{backgroundImage: `url(${ProjectAssets[project.title]})`}}></div>
            <a className="primary highlight">{project.title}</a>
            <p className="secondary">{project.description}</p>
          </div>
        </a>
      )
    })}
    </div>
  )
}