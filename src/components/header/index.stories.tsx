import React from 'react';
import { action } from '@storybook/addon-actions';
import '@storybook/addon-console';
import Header from '../header'

import draper from '../../assets/images/experience/draper.png'

export default {
  title: 'Header',
  component: Header,
};

export const Default = () =>  {
  return Header({
    header: "Test"
  });
};

export const Link = () =>  {
  return Header({
    header: "Test",
    link: "https://google.com"
  });
};
