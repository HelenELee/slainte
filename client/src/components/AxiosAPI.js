import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const api_url = "https://type.fit/api/quotes";
let index = 0;
//import API from '../utils/API_axios';

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

  
  // Destructure the result object to make the code more readable, assign them to empty strings to start
//   const {
//     Title = '',
//     Author = ''
//   } = result;
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
              <span>
              {result[index].text}
              </span> 
              <span>
              {result[index].author}
              </span>
            </div>)
           
        }
    
            
    </>  
  );
};

export default QuoteContainer;
