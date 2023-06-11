//component for quotes section
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlexContainer, FlexChild } from './FlexComponents';
import { StyledSection } from './FormComponents';
const api_url = "https://type.fit/api/quotes";
let index = 0;
//styles setup
const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: var(--orange);
`;

const Quote = styled.span`
  font-size: 1.5em;
  color: var(--strong-blue);
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
`;

const QuoteContainer = () => {
  // Set state for the search result and the search query
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
 
  //function to get data
  const getData = (query) =>
      axios.get(query)
      .then((res) => {
        setResult(res.data)
        setIsLoading(false)
      })
      //.then((res) => console.log(res))
      .catch((err) => console.log(err));

  //use useeffect actually get data  , done just on initial load  
  useEffect(() => {
    getData(api_url);
  }, []);

  
//get index so you can get a random quote from api each time
if (isLoading) {
  index = 0;
} else {
  index = Math.floor(Math.random() * result.length);
}
//use Flex components from flex components file
  return (
    <StyledSection>
        {
          
          (isLoading ? 
            "Loading..." : 
            
            <div>
              <FlexContainer direction="column">
                <FlexChild>
                    <Title>Get Inspired!</Title>
                </FlexChild>
                <FlexChild>
                    <Quote>
                      "{result[index].text}"
                    </Quote> 
                </FlexChild>
                <FlexChild>
                    <span><br></br>
                      - {result[index].author}
                    </span>
                </FlexChild>


              </FlexContainer>
              

            </div>)
           
        }
    
            
    </StyledSection>  
  );
};

export default QuoteContainer;
