import React from 'react';
import { action } from '@storybook/addon-actions';
import '@storybook/addon-console';
import Carousel from '../carousel';
import Card from '../card';


import raytracer from '../../assets/images/projects/raytracer.png'

export default {
  title: 'Carousel',
  component: Carousel,
}; 

export const Default = () =>  {
  return Carousel({children: [Card({
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
  })]});
};
