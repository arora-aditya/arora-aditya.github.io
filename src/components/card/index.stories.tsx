import React from 'react';
import { action } from '@storybook/addon-actions';
import '@storybook/addon-console';
import Card from '../card'

import raytracer from '../../assets/images/raytracer.png'

export default {
  title: 'Card',
  component: Card,
};

export const Default = () =>  {
  return Card({
    link: "https://github.com/arora-aditya/just-another-ray-tracer",
    image: String(raytracer),
    image_alt: "Raytracer output",
    title: "Ray Tracer",
    description: "A raytracer built in Rust, with support for shaders, materials and objects!"
  });
};
