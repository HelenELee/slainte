//import QuoteAPI from "../components/QuoteAPI"
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

//import mainImage from'../images/natalie-grainger-8uB5kFKWWkk-unsplash_resized.jpg';
//import mainImage from'../images/ashley-whitlatch-MGKGuMP9nLY-unsplash_25.jpg';
import mainImage from'../images/good-vibes.jpg';

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
          <QuoteContainer />
          <Chart data={days.days} />
          <ChartCategories data={days.days} />
          <MainLineChart data={days.days}/>
          {/* <QuoteAPI /> */}
          <Suggestions />      
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
