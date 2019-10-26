import React from 'react';
import './App.scss';

import Card from './components/card';
import Header from './components/header'
import Experience from './components/experience';
import {Carousel} from './components/carousel';

import raytracer from './assets/images/projects/raytracer.png'

import {ExperienceAssets, ProjectAssets} from './assets';
interface Job {
  company_logo: string;
  company_name: string;
  company_website: string;
  title: string;
  timeline: string;
  location: string;
  points: string[];
}

interface Project {
  link: string;
  image_alt: string;
  title: string;
  description: string;
}


const experience: Job[] = require('./assets/data/experience.json');
const projects: Project[] = require('./assets/data/projects.json');

function App() {
  const project_cards = projects.map((project, i) => {
    return (
      Card({
        key: i,
        image: String(ProjectAssets[project.title]),
        link: project.link,
        image_alt: project.image_alt,
        title: project.title,
        description: project.description,
      })
    )
  })
  return (
    <div className="App">
      <div className="container">
      {Header({
        header: "Some of my past experience",
      })}
        <div className="experiences">
          {experience.map((job, i) => {
            return (
              Experience({
                key: i,
                company_logo: String(ExperienceAssets[job.company_name]),
                company_name: job.company_name,
                company_website: job.company_website,
                title: job.title,
                timeline: job.timeline,
                location: job.location,
                points: job.points
              })
            )
          })}
        </div>
        {Header({
          header: "Projects",
          link: "https://github.com/arora-aditya"
        })}
        <div className="projects">
          {Carousel({
            children: project_cards
          })}
        </div>
        {Carousel({children: [Card({
          link: "https://github.com/arora-aditya/just-another-ray-tracer",
          image: String(raytracer),
          image_alt: "Raytracer output",
          title: "Ray Tracer",
          description: "A raytracer built in Rust, with support for shaders, materials and objects!"
        }), Card({
          link: "https://github.com/arora-aditya/just-another-ray-tracer",
          image: String(raytracer),
          image_alt: "Raytracer output",
          title: "Ray Tracer",
          description: "A raytracer built in Rust, with support for shaders, materials and objects!"
        })]})}
      </div>
    </div>
  );
}

export default App;
