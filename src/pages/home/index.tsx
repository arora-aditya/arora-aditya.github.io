import React from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';

import useMusic from '../../hooks/useMusic';

import { me, me_jpeg } from '../../assets';
import useReading from '../../hooks/useReading';

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
  const {nowPlaying, artist, song, dataExists, url, lastListenedAt} = useMusic();
  const {lastRead, dataExists: readingExist} = useReading();
  const formattedLastRead = lastRead && <span>last read <FancyLink href={`https://www.goodreads.com/search?q=${lastRead[1].title}`} className="highlight" target="_blank">{lastRead[1].title}</FancyLink> by {lastRead[1].author} - {lastRead[0].toRelative()}</span>

  const about_me = [
    <p>I'm a Software Engineer and Data Scientist based in Canada. I'm currently working at <FancyLink className="highlight" href="https://google.ca" target="_blank" rel="noopener noreferrer">Google</FancyLink> as a Software Engineer on the GCloud - Cost Optimization team. My past experience has been a mix of full-stack and data science.</p>,
    <p>My last 3 internships were at <FancyLink className="highlight" href="https://wish.com" target="_blank" rel="noopener noreferrer">Wish</FancyLink> first as a Software Engineer on the Payments team, and then as a Data Scientist / ML Engineer on the Consumer Data team. Before that I have worked for startups in the Food-tech and Ads space.</p>,
    <p>Over the past 4 years, I've studied Computer Engineering at the University of Waterloo, and graduated in mid-2022. At University, I also worked as an Undergraduate Research Assistant under <FancyLink href="https://uwaterloo.ca/electrical-computer-engineering/about/people/karray" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Fakhri Karray</FancyLink> to bring NLP chatbots to production and also under <FancyLink href="https://uwaterloo.ca/electrical-computer-engineering/about/people/dw2wrig" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Derek Wright</FancyLink> to build a platform for the ECE department to manage accreditation requirements.</p>,
    <p>Outside of work I like to <FancyLink href="https://blogs.arora-aditya.com/books/" className="highlight" target="_blank">read</FancyLink> ({readingExist && formattedLastRead}), <FancyLink href="https://blogs.arora-aditya.com/" className="highlight" target="_blank">write</FancyLink> and listen to <FancyLink href="https://open.spotify.com/user/arora_aditya?si=771564e93f4a49af" className="highlight" target="_blank">music</FancyLink> ({dataExists ? <span>{nowPlaying ? `currently listening to ` : `last listened to `} <FancyLink href={url} className="highlight">{`${song} by ${artist}`}</FancyLink>{lastListenedAt}</span> : "can't reach spotify yet to get the last song"})</p>,
    <p>I'm always looking for my next opportunity, so feel free to reach out to me if you want to chat or have any questions!</p>
  ]

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