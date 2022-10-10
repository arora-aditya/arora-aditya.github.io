import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import removeCDATA from '../../utils';
import FancyLink from '../../components/FancyLink';

const WritingContainer = styled.div`
display: flex;
flex-direction: column;
`

const BlogPost = styled(FancyLink)`
margin-bottom: 1rem;
&:hover:after {
  width: 0% !important;
}
`

const BlogTitle = styled.p`
font-weight: 500;
`

const BlogDate = styled.p`
margin-bottom: 0.1rem;
`

const BlogBlurb = styled.p`
color: #888;
`

export default function Writing() {
  const [data, setData] = useState([<></>])
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const generateBlogListings = useCallback((responseText: string) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, 'text/xml');

    let items = Array.from(xml.getElementsByTagName('item')).map((item, i) => {
      return (
          <BlogPost key={i} href={removeCDATA(item.getElementsByTagName('link')[0].textContent)} target="_blank" rel="noopener noreferrer">
            <BlogTitle>{removeCDATA(item.getElementsByTagName('title')[0].textContent)}</BlogTitle>
            <BlogDate>{formatPostDate(removeCDATA(item.getElementsByTagName('pubDate')[0].textContent))}</BlogDate>
            <BlogBlurb>{removeCDATA(item.getElementsByTagName('description')[0].textContent)}</BlogBlurb>
          </BlogPost>
      )
    });
    setData(items);
    setLoading(false);
  }, []);
  
  const getBlog = useCallback(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        generateBlogListings(this.responseText);
      }
    };
    xhttp.open("GET", "https://blogs.arora-aditya.com/rss.xml", true);
    xhttp.send();
    setSent(true);
  }, [generateBlogListings])
  
  useEffect(() => {
    if(!sent){
      getBlog();
    }
  }, [sent, getBlog]);
  
  function formatPostDate(date: string) {
    if (typeof Date.prototype.toLocaleDateString !== 'function') {
      return date
    }

    return new Date(date).toLocaleDateString('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  
  return (
    <WritingContainer>
      {loading ?  <p>Loading...</p> : data }
    </WritingContainer>
  )
}