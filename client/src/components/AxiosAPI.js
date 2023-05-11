import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlexContainer, FlexChild } from './FlexComponents';
const api_url = "https://type.fit/api/quotes";
let index = 0;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: var(--orange);
`;

const QuoteContainer = () => {
  // Set state for the search result and the search query
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
 

  const getData = (query) =>
      axios.get(query)
      .then((res) => {
        setResult(res.data)
        setIsLoading(false)
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

   useEffect(() => {
    getData(api_url);
  }, []);

  

if (isLoading) {
  index = 0;
} else {
  index = Math.floor(Math.random() * result.length);
}

  return (
    <>
        {
          
          (isLoading ? 
            "Loading..." : 
            
            <div>
              <FlexContainer direction="column">
                <FlexChild>
                    <Title>Get Inspired!</Title>
                </FlexChild>
                <FlexChild>
                    <span>
                      {result[index].text}
                    </span> 
                </FlexChild>
                <FlexChild>
                    <span>
                      - {result[index].author}
                    </span>
                </FlexChild>


              </FlexContainer>
              

            </div>)
           
        }
    
            
    </>  
  );
};

export default QuoteContainer;
