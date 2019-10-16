import React, { useState } from 'react';
import './index.scss';

interface HeaderProp {
  header: string;
  link?: string;
}

export default function Header(props: HeaderProp) {
  const [state, setState] = useState(props);
  if(state.link){
    return (
      <a className="headerlink" href={state.link}  target="_blank" rel="noopener noreferrer">
        <div>
          <h1>{state.header}</h1>
        </div>
      </a>
    )
  }
  return (<div className="header">
          <h1>{state.header}</h1>
          </div>)
};

export {Header};

