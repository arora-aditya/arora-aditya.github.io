import { useState, useEffect, useCallback } from 'react';
import removeCDATA from '../utils'
import { DateTime } from 'luxon';

interface Book {
    title: string;
    author: string;
    link?: string;
  }

interface Category {
    title: string;
    books: Book[];
  }

const DEFAULT_READING = require('../assets/data/reading.json');

export default function useReading() {  
    const [lastRead, setLastRead] = useState<[DateTime, Book]>();
    const [reading, setReading] = useState<Category[]>(JSON.parse(JSON.stringify(DEFAULT_READING)));
    const [dataExists, setDataExists] = useState<boolean>(false);

    const generateReviewedList = useCallback((responseText: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(responseText, 'text/xml');
        
        let upcoming_books: Book[] = [], currently: Book[] = [], older: Book[] = []
        const pubDateTimes: [DateTime, Book][] = [];
        Array.from(xml.getElementsByTagName('item')).map((item, i) => {
          const link = removeCDATA(item.getElementsByTagName('link')[0].textContent);
          const title = removeCDATA(item.getElementsByTagName('title')[0].textContent);
          const author = removeCDATA(item.getElementsByTagName('dc:creator')[0].textContent);
          const published = (removeCDATA(item.getElementsByTagName('published')[0].textContent) === "true");
          const currently_reading = (removeCDATA(item.getElementsByTagName('currently_reading')[0].textContent) === "true");
          const upcoming = (removeCDATA(item.getElementsByTagName('upcoming')[0].textContent) === "true");
          const pubDate = DateTime.fromHTTP(removeCDATA(item.getElementsByTagName('pubDate')[0].textContent));
          
          
          if(!upcoming && !currently_reading && published){
            const book = {
                "title": title,
                "author": author,
                "link": link,
              } as Book;
            pubDateTimes.push([pubDate, book]);
            older.push(book)
          } else if (!upcoming && !currently_reading && !published) {
            const book = {
                "title": title,
                "author": author,
              } as Book;
            pubDateTimes.push([pubDate, book]);
            older.push(book)
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
        const ma = pubDateTimes.reduce((a, b) => {
            return a[0] > b[0] ? a : b
        });
        setLastRead(ma);
        setDataExists(true);
        
      }, []);
    
    useEffect(() => {
        const getData = async () => {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              generateReviewedList(this.responseText);
            }
          };
    
          xhr.open("GET", "https://blogs.arora-aditya.com/book-rss.xml", true);
          xhr.send();
        };
        getData();
    }, [generateReviewedList])

    return {
        reading,
        dataExists,
        lastRead
    }
}