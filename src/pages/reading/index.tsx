import React from 'react';
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
  return <div className="reading">
    {reading.map((category, i) => {
      if(category.books.length > 0){
        return <div key={i} className="category">
          <p className="category-title">{category.title}</p>
          {
            category.books.map((book, j) => {
              if(book.link){
                return <a className="book highlight" key={j} target="blank" rel="noopener noreferrer" href={book.link}><p>{book.title} - {book.author}</p></a>
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