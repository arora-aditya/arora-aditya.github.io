import React, { useState } from 'react';
import './index.scss';


interface CardProp {
  key?: number;
  link: string;
  image: string;
  image_alt: string;
  title: string;
  description: string;
}

export default function Card(props: CardProp) {
  const [state, setState] = useState(props);
  
  return (<a className="card" href={state.link} key={state.key}>
            <div className="hover-up">
              <div className="box-shadow">
                <img src={state.image} alt={state.image_alt} />
                <div className="box">
                  <p>
                    <span className="primary">{state.title}</span>
                    <br />
                    <span className="secondary">
                      {state.description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </a>)
};

export {Card};

