import wish from './images/experience/wish.png';
import sage from './images/experience/sage.png';
import fino from './images/experience/fino.png';
import kitchenmate from './images/experience/kitchenmate.png';
import draper from './images/experience/draper.png';
import lcbo from './images/experience/LCBO.png';
import uw from './images/experience/uw.png';
import watonomous from './images/experience/WATonomous.png';
import wloop from './images/experience/wloop.png';

import raytracer from './images/projects/raytracer.png';
import ww from './images/projects/ww.png';
import leapmetry from './images/projects/leapmetry.png';
import kaggle from './images/projects/kaggle.jpg';
import leetcode from './images/projects/leetcode.png';
import whizzit from './images/projects/whizzitLogoVertical.png';
import slackr from './images/projects/slackr.png';
import golinks from './images/projects/link.png';
import rtchess from './images/projects/rtchess.png';
import scrambled from './images/projects/scrambled.svg';

import me from './images/me.webp'
import me_jpeg from './images/me.jpeg'

const ExperienceAssets:{ [company_name: string] : string; } = {
  "Wish": wish,
  "Sage Co": sage,
  "KitchenMate": kitchenmate,
  "DraperAI": draper,
  "Machine Intelligence Lab": uw,
  "LCBO|next": lcbo,
  "WATonomous": watonomous,
  "Waterloop": wloop, 
  "FINO Bank": fino
};

const ProjectAssets:{ [company_name: string] : string; } = {
  "RTChess": rtchess,
  "Scrambled": scrambled,
  "RayTracer": raytracer,
  "WaterlooWorks2": ww,
  "LeapMetry": leapmetry,
  "Kaggle": kaggle,
  "Leetcode": leetcode,
  "whiZZit @ETHWaterloo": whizzit,
  "Slackr": slackr,
  "Go links": golinks, 
};



export { ExperienceAssets, ProjectAssets, me, me_jpeg };