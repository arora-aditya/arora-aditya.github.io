import React, { useState } from 'react';
import './index.scss';


interface CarouselProp {
  children: React.ReactNode[];
}

export default function Carousel(props: CarouselProp) {
  const [state, setState] = useState(props);
  
  return (<div className="carousel">
            {state.children.map((child,i) => {
              return child
            })}
          </div>)
};

export {Carousel};

