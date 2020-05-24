import React, {useState, useEffect} from 'react';
import removeCDATA from '../utils'
import './index.scss';

interface Book {
  title: string;
  author: string;
  link?: string;
}

interface Category {
  title: string;
  books: Book[];
}

const reading: Category[] =  require('../../assets/data/reading.json');

export default function Reading() {
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  function getBookReviews() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        generateReviewedList(this.responseText);
      }
    };
    xhttp.open("GET", "https://blogs.arora-aditya.com/book-rss.xml", true);
    xhttp.send();
    setSent(true);
  }
  
  useEffect(() => {
    if(!sent){
      getBookReviews();
    }
  }, [sent]);
  
  function generateReviewedList(responseText: string){
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, 'text/xml');

    let items: Book[] = Array.from(xml.getElementsByTagName('item')).map((item, i) => {
      const link = removeCDATA(item.getElementsByTagName('link')[0].textContent);
      const title = removeCDATA(item.getElementsByTagName('title')[0].textContent);
      const author = removeCDATA(item.getElementsByTagName('dc:creator')[0].textContent);
      return {
        "title": title,
        "author": author,
        "link": link,
      }
    });
    reading[0].books = items.concat(reading[0].books)
    setLoading(false)
  }
  
  if(loading) {
    return (
      <div className="reading">
        <p>Loading...</p>
      </div>
    )
    
  }
  
  return <div className="reading">
    {reading.map((category, i) => {
      if(category.books.length > 0){
        return <div key={i} className="category">
          <p className="category-title">{category.title}</p>
          {
            category.books.map((book, j) => {
              if(book.link){
                return <p key={j} className="book"><a className="highlight" href={book.link}>{book.title.replace(/ /g, '\u00a0')}</a> - {book.author.replace(/ /g, '\u00a0')}</p>
              } else {
                return <p className="book" key={j}>{book.title} - {book.author}</p>
              }
            })
          }
        </div>
      } else {
        return ""
      }
    })}
  </div>
}