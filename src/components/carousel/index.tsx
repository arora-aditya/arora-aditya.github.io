import React, { useState } from 'react';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
  DotGroup,
  ImageWithZoom
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './index.scss';

import bet from '../../assets/images/bet320.png';


interface CarouselProp {
  children: React.ReactNode[];
}

export default function Carousel(props: CarouselProp) {
  const [state, setState] = useState(props);
  
  return (
    <CarouselProvider
    visibleSlides={3}
    totalSlides={6}
    step={3}
    naturalSlideWidth={400}
    naturalSlideHeight={500}
    hasMasterSpinner
  >
    <h2 className={"headline"}>Simple Carousel with vertically aligned nav buttons</h2>
    <p>
      Wrap the &lt;Slider /&gt;, &lt;ButtonBack /&gt;, &lt;ButtonNext /&gt; components in a div with
      relative positioning.  Add absolute positioning to the button
    </p>
    <div className={"container"}>
      <Slider className={"slider"}>
        <Slide index={0}>
          <img src={bet} />
        </Slide>
        <Slide index={1}>
          <img src={bet} />
        </Slide>
        <Slide index={2}>
          <img src={bet} />
        </Slide>
        <Slide index={3}>
          <img src={bet} />
        </Slide>
        <Slide index={4}>
          <img src={bet} />
        </Slide>
        <Slide index={5}>
          <img src={bet} />
        </Slide>
      </Slider>
      <ButtonBack className={"buttonBack"}>Back</ButtonBack>
      <ButtonNext className={"buttonNext"}>Next</ButtonNext>
    </div>
    <DotGroup className={"dotGroup"} />
  </CarouselProvider>
  )
};

export {Carousel};

