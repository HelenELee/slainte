import QuoteAPI from "../components/QuoteAPI"
import Chart from "../components/Chart";
import Suggestions from "../components/Suggestions";
//import ListQuotes from "../components/ListQuotes";
//import QuoteContainer from "../components/AxiosAPI";
import MainLineChart from "../components/MainLineChart";
//import React, { useEffect, useState } from "react";
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

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
          <Chart data={days.days} />
          <MainLineChart data={days.days}/>
          <QuoteAPI />
          <Suggestions />      
          </>
          
)}
        </>
      ) : (
        ""
      )}

      
      
    </div>
  );
}
