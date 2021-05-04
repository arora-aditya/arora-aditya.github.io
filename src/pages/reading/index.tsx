import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';

import removeCDATA from '../utils'

interface Book {
  title: string;
  author: string;
  link?: string;
}

interface Category {
  title: string;
  books: Book[];
}

const ReadingContainer = styled.div`
display: flex;
flex-direction: column;
`

const ReadingCategory = styled.div`
margin-bottom: 2rem;
`

const ReadingCategoryTitle = styled.p`
font-weight: 500;
`

const ReadingCategoryBook = styled.p`
margin-bottom: 0.1rem;
`

const DEFAULT_READING = require('../../assets/data/reading.json');

export default function Reading() {
  const [data, setData] = useState([<p key="loading">Loading...</p>])
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reading, setReading] = useState<Category[]>(JSON.parse(JSON.stringify(DEFAULT_READING)));
  
  const generateReviewedList = useCallback((responseText: string) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, 'text/xml');
    
    let upcoming_books: Book[] = [], currently: Book[] = [], older: Book[] = []
    Array.from(xml.getElementsByTagName('item')).map((item, i) => {
      const link = removeCDATA(item.getElementsByTagName('link')[0].textContent);
      const title = removeCDATA(item.getElementsByTagName('title')[0].textContent);
      const author = removeCDATA(item.getElementsByTagName('dc:creator')[0].textContent);
      const published = (removeCDATA(item.getElementsByTagName('published')[0].textContent) === "true");
      const currently_reading = (removeCDATA(item.getElementsByTagName('currently_reading')[0].textContent) === "true");
      const upcoming = (removeCDATA(item.getElementsByTagName('upcoming')[0].textContent) === "true");
      if(!upcoming && !currently_reading && published){
        older.push({
          "title": title,
          "author": author,
          "link": link,
        } as Book)
         
      } else if (!upcoming && !currently_reading && !published) {
        older.push({
          "title": title,
          "author": author,
        } as Book)
      } else if (currently_reading) {
        currently.push({
          "title": title,
          "author": author,
        } as Book)
      } else if (upcoming) {
        upcoming_books.push({
          "title": title,
          "author": author,
        } as Book)
      }
      return null;
    });
    setReading([
      { 
        ...DEFAULT_READING[0],
        books: [...older, ...DEFAULT_READING[0].books]
      },
      {
        ...DEFAULT_READING[1],
        books: [...currently, ...DEFAULT_READING[1].books]
      },
      {
        ...DEFAULT_READING[2],
        books: [...upcoming_books, ...DEFAULT_READING[2].books]
      },
    ]);
    setLoaded(true);
  }, []);
  
  useEffect(() => {
    if(loaded){
      setData(reading.map((category, i) => {
        if(category.books.length > 0){
          return <ReadingCategory key={i}>
            <ReadingCategoryTitle>{category.title}</ReadingCategoryTitle>
            {
              category.books.map((book, j) => {
                if(book.link){
                  return <ReadingCategoryBook key={j}><FancyLink className="highlight" href={book.link} target="_blank" rel="noopener noreferrer">{book.title.replace(/ /g, '\u00a0')}</FancyLink> - {book.author.replace(/ /g, '\u00a0')}</ReadingCategoryBook>
                } else {
                  return <ReadingCategoryBook key={j}>{book.title} - {book.author}</ReadingCategoryBook>
                }
              })
            }
          </ReadingCategory>
        } else {
          return <ReadingCategory key={i}></ReadingCategory>
        }
      }));
    }
  }, [reading, loaded])
  
  const getBookReviews = useCallback(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        generateReviewedList(this.responseText);
      }
    };
    xhttp.open("GET", "https://blogs.arora-aditya.com/book-rss.xml", true);
    xhttp.send();
    setSent(true);
  }, [generateReviewedList]);
  
  useEffect(() => {
    if(!sent){
      getBookReviews();
    }
  }, [sent, getBookReviews]);
  
  return <ReadingContainer>
    {data}
  </ReadingContainer>
}