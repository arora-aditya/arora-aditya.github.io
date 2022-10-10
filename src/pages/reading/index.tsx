import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';
import useReading from '../../hooks/useReading';

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

export default function Reading() {
  const [data, setData] = useState([<p key="loading">Loading...</p>])
  const {reading, dataExists} = useReading();

  
  useEffect(() => {
    if(dataExists){
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
  }, [reading, dataExists])
  
  return <ReadingContainer>
    {data}
  </ReadingContainer>
}