import React from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink'


import { me, me_jpeg } from '../../assets';

const about_me = [
  <p>I'm a Software Engineer and Data Scientist based in Waterloo, Canada. Over the winter, I worked at <FancyLink className="highlight" href="https://wish.com" target="_blank" rel="noopener noreferrer">Wish</FancyLink> as a Data Scientist on the Consumer Data Team. In the Summmer of 2020, I worked at <FancyLink className="highlight" href="https://wish.com" target="_blank" rel="noopener noreferrer">Wish</FancyLink> as a Software Developer on the Product Payments Team. In my free time, I've helped start a design agency <FancyLink className="highlight" href="https://thesage.co" target="_blank" rel="noopener noreferrer">Sage Co</FancyLink> to help develop websites and brand identities for small businesses.</p>,
  <p>I have previously worked as a Software Engineer at <FancyLink href="https://kitchenmate.com/" className="highlight" target="_blank" rel="noopener noreferrer">KitchenMate</FancyLink> doing Data Science and Embedded Systems, as a Data Engineer at <FancyLink href="https://draper.ai/" className="highlight" target="_blank"  rel="noopener noreferrer">DraperAI</FancyLink> building smart tools for Amazon Ads and as an Undergraduate Research Assistant under <FancyLink href="https://uwaterloo.ca/electrical-computer-engineering/about/people/karray" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Fakhri Karray</FancyLink> to build intelligents bot for customers at Canada's most popular grocery chain to make it easier to find what they need.</p>,
  <p>Eight months out of twelve, I study Computer Engineering at the University of Waterloo, and expect to graduate early 2022.</p>,
  <p>I'm always looking for my next opportunity, so feel free to reach out to me if you want to chat or have any questions!</p>
]

const socials: {[social: string] : string} = {
  "Email": "mailto:me@arora-aditya.com?Subject=Saying Hello!",
  "Resume": "files/Resume.pdf",
  "Github": "https://github.com/arora-aditya",
  "LinkedIn": "https://www.linkedin.com/in/arora-aditya/",
}

const HomeContainer = styled.div`
display: flex;
flex-direction: column;
@media only screen and (max-width: 768px){
  padding-bottom: 3rem;
}
`

const MyImage = styled.img`
max-width: 8.5rem;
`

const HiThere = styled.p`
padding-top: 2vw;
font-weight: 400;
`

const AboutMe = styled.div`
& > div > p {
  display: block;
  padding-top: 1rem;
}
`

const SocialsContainer = styled.div`
max-width: 80%;
padding-top: 1.5rem;
display: flex;
justify-content: space-between;
`

export default function Home() {
  return (
    <HomeContainer>
      <picture>
        <source src={me} type="image/webp" />
        <source src={me_jpeg} type="image/jpeg" />
        <MyImage src={me_jpeg} alt="me"></MyImage>
      </picture>
      <HiThere>Hi there,</HiThere>
      <AboutMe>
        {about_me.map((text, i) => {
          return <div key={i}>{text}</div>
        })}
      </AboutMe>
      <SocialsContainer>
        {Object.keys(socials).map((key, i) => {
          return <FancyLink key={i} target="_blank" rel="noopener noreferrer" className="highlight" href={socials[key]}><p>{key}</p></FancyLink>
        })}
      </SocialsContainer>
    </HomeContainer>
  )
}