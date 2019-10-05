import React from 'react';
import { action } from '@storybook/addon-actions';
import '@storybook/addon-console';
import Experience from '../experience'

import raytracer from '../../assets/images/raytracer.png'

export default {
  title: 'Experience',
  component: Experience,
};

export const Default = () =>  {
  return Experience({
    company_logo: String(raytracer),
    company_name: "DraperAI",
    company_website: "https://draperai.com",
    title: "Data Engineer",
    timeline: "January 2019 - April 2019",
    location: "Waterloo, ON",
    points: [
      "Reduced customer conversion time by 15% by building a tool to entice new customers",
      "Improved bid accuracy by 30% by analysing suggesting changes to core bidding algorithm",
      "Found 3 high priority production issues affecting 10% of our marquee customers",
      "Built an internal tool to detect and alert system downtime using SQL and Metabase"
    ]
  });
};
