//import QuoteAPI from "../components/QuoteAPI"
import styled from "styled-components";
import Chart from "../components/Chart";
import ChartCategories from "../components/ChartCategories";
import Suggestions from "../components/Suggestions";
//import ListQuotes from "../components/ListQuotes";
import QuoteContainer from "../components/AxiosAPI";
import MainLineChart from "../components/MainLineChart";
//import React, { useEffect, useState } from "react";
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { FlexContainer, FlexChild } from '../components/FlexComponents';
import mainImage from'../images/good-vibes.jpg';

const Wrapper = styled.section`
    padding: 10px;
    margin: 10px;
`

//import mainImage from'../images/natalie-grainger-8uB5kFKWWkk-unsplash_resized.jpg';
//import mainImage from'../images/ashley-whitlatch-MGKGuMP9nLY-unsplash_25.jpg';


export default function App() {
 
  const { loading, data } = useQuery(QUERY_MAIN_CHART);
  const days = data?.me || [];

  

  return (
    <div className="App">
      
       {Auth.loggedIn() ? (
        <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          days &&
          <>
          <Wrapper>

          
            <FlexContainer direction ="column">
                <FlexContainer direction ="row">
                    <FlexChild> 
                      <Suggestions /> 
                    </FlexChild>
                    <FlexChild> 
                      <QuoteContainer />
                    </FlexChild>
                </FlexContainer> 
                <FlexContainer direction="row"> 
                    <FlexChild> 
                        <MainLineChart data={days.days}/>
                    </FlexChild>
                    <FlexChild> 
                        <ChartCategories data={days.days} />
                    </FlexChild>
                </FlexContainer>
            </FlexContainer>
             
              
          </Wrapper>  
          {/* <Chart data={days.days} /> */}
          {/* <QuoteAPI /> */}            
          </>
          
)}
        </>
      ) : (
        <>
        <p>Home Page</p>
        <img src={mainImage} alt="fireSpot" width="100%" height="50%"/>
        </>
        
      )}

      
      
    </div>
  );
}
