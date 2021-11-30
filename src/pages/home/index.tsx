import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';

import { me, me_jpeg } from '../../assets';

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
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);
  const [artist, setArtist] = useState<string>("");
  const [song, setSong] = useState<string>("");
  const [dataExists, setDataExists] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [lastListenedAt, setLastListenedAt] = useState<string>("");
  
  const about_me = [
    <p>I'm a Software Engineer and Data Scientist based in Canada. Over the past 2 years I've spent all my coops at <FancyLink className="highlight" href="https://wish.com" target="_blank" rel="noopener noreferrer">Wish</FancyLink> first as a Software Engineer on the Payments team and then as a Data Scientist on the Consumer Data Team. In my free time, I've helped start a design agency <FancyLink className="highlight" href="https://thesage.co" target="_blank" rel="noopener noreferrer">Sage Co</FancyLink> to help develop websites and brand identities for small businesses.</p>,
    <p>I have previously worked as a Software Engineer at <FancyLink href="https://kitchenmate.com/" className="highlight" target="_blank" rel="noopener noreferrer">KitchenMate</FancyLink> doing Data Science and Embedded Systems, as a Data Engineer at <FancyLink href="https://draper.ai/" className="highlight" target="_blank"  rel="noopener noreferrer">DraperAI</FancyLink> building smart tools for Amazon Ads and as an Undergraduate Research Assistant under <FancyLink href="https://uwaterloo.ca/electrical-computer-engineering/about/people/karray" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Fakhri Karray</FancyLink> to bring NLP chatbots to production and also under <FancyLink href="https://uwaterloo.ca/electrical-computer-engineering/about/people/dw2wrig" className="highlight" target="_blank" rel="noopener noreferrer">Prof. Derek Wright</FancyLink> to build a platform for the ECE department to manage accreditation requirements</p> ,
    <p>Over the past 4 years, I've studied Computer Engineering at the University of Waterloo, and graduate in early 2022. </p>,
    <p>Outside of work I like to <FancyLink href="https://blogs.arora-aditya.com/books/" className="highlight" target="_blank">read</FancyLink>, <FancyLink href="https://blogs.arora-aditya.com/" className="highlight" target="_blank">write</FancyLink> and listen to <FancyLink href="https://open.spotify.com/user/arora_aditya?si=771564e93f4a49af" className="highlight" target="_blank">music</FancyLink> ({dataExists ? <span>{nowPlaying ? `currently listening to ` : `last listened to `} <FancyLink href={url} className="highlight">{`${song} by ${artist}`}</FancyLink> {lastListenedAt}</span> : "can't reach spotify yet to get the last song"})</p>,
    <p>I'm always looking for my next opportunity, so feel free to reach out to me if you want to chat or have any questions!</p>
  ]

  useEffect(() => {
    const getData = async () => {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          let d = JSON.parse(this.responseText);
          if("@attr" in d && "nowplaying" in d["@attr"]) {
            setNowPlaying(true);
          } else {
            const now = DateTime.now();
            const ts = DateTime.fromSeconds(Number(d["date"]["uts"]));
            if(now.diff(ts).as("hours") < 1) {
              setLastListenedAt(`${Math.round(now.diff(ts).as("minute"))} minutes ago`);
            } else {
              setLastListenedAt(`${Math.round(now.diff(ts).as("hour"))} hours ago`);
            }
          }
          setArtist(d["artist"]["#text"]);
          setSong(d["name"]);
          setUrl(d["url"]);
          setDataExists(true);
        }
      });

      xhr.open("GET", "https://lichess-proxy.herokuapp.com/spotify");
      xhr.send();
    };
    getData();
  }, [])

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