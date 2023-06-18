import React, { useState, useEffect } from 'react';

const api_url = "https://type.fit/api/quotes";

const QuoteAPI = (props) => {
    
    const [quotes, setQuotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const QuoteDisplay = () => {
        const index = Math.floor(Math.random() * quotes.length);
        
        return ( 
        <span>
           {/* {JSON.stringify(quotes[index].text)} */}
           {quotes[index].text}
            {/* <strong>{JSON.stringify(quotes[index].text)}</strong> */}
            {/* <strong>{JSON.stringify(quotes[index].author)}</strong> */}
           
        </span>
        ) 
    }


    const fetchQuoteData = () => {
        fetch(api_url)
          .then(response => {
            return response.json()
          })
          .then(data => {
           // setQuotes(JSON.parse(data))
            setQuotes(data)
            setIsLoading(false)
          })
      };

     

    useEffect(() => {
        console.log("CALLING FETCH QUOTE DATA");
        fetchQuoteData()
        }, []);

    return (
        <>
            
            {
                (isLoading ? "still loading..." : 
                    <section>
                        <header>
                            <span>Inspirational Quotes</span>
                        </header>
                        <div >
                            
                        {/* <QuoteDisplay /> */}
                            {/* {quotes[Math.floor(Math.random() * quotes.length)].text} */}
                            {/* {JSON.stringify(quotes[0].text)} */}
                        </div>
                    </section>
                )
            }
            
        </>


    )

    
}

export default QuoteAPI;


