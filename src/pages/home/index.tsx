import React from 'react';
import './index.scss';

import {me} from '../../assets';

const about_me = [
  <p>I'm a Software Developer based in Waterloo, Canada. Over last summer I worked at <a className="highlight" href="https://wish.com" target="_blank" rel="noopener noreferrer">Wish</a> as a Software Developer on the Product Payments Team. In my free time, I help run a design agency <a className="highlight" href="https://thesage.co" target="_blank" rel="noopener noreferrer">Sage Co</a> to help develop websites and brand identities for small businesses.</p>,
  <p>I have previously worked as a Software Engineer at <a href="https://kitchenmate.com/" className="highlight" target="_blank"  rel="noopener noreferrer">KitchenMate</a> doing Data Science and Embedded Systems, as a Data Engineer at <a href="https://draper.ai/" className="highlight" target="_blank"  rel="noopener noreferrer">DraperAI</a> building smart tools for Amazon Ads and as an Undergraduate Research Assistant under <a href="https://uwaterloo.ca/electrical-computer-engineering/about/people/karray" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Fakhri Karray</a> to build intelligents bot for customers at Canada's most popular grocery chain to make it easier to find what they need.</p>,
  <p>Eight months out of twelve, I study Computer Engineering at the University of Waterloo, and expect to graduate early 2022.</p>,
  <p>I'm always looking for my next opportunity, so feel free to reach out to me if you want to chat or have any questions!</p>
]

const socials: {[social: string] : string} = {
  "Email": "mailto:me@arora-aditya.com?Subject=Saying Hello!",
  "Resume": "files/Resume.pdf",
  "Github": "https://github.com/arora-aditya",
  "LinkedIn": "https://www.linkedin.com/in/arora-aditya/",
}

export default function Home() {
  return (
    <div className="home">
      <img src={me} alt="me"/>
      <p className="hi-there">Hi there,</p>
      <div className="about-me">
        {about_me.map((text, i) => {
          return <div key={i}>{text}</div>
        })}
      </div>
      <div className="socials">
        {Object.keys(socials).map((key, i) => {
          return <a key={i} target="_blank" rel="noopener noreferrer" className="highlight" href={socials[key]}><p>{key}</p></a>
        })}
      </div>
    </div>
  )
}