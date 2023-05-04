import Chart from "../components/Chart";
import React, { useEffect, useState } from "react";
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

export default function App() {
  //const [data, setdata] = useState();
  const { loading, data } = useQuery(QUERY_MAIN_CHART);
  const days = data?.me || [];

  /*
  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=20");
      const data = await res.json();
      console.log(data);
      //setdata(data?.data);
    };
    fetchDatas();
  }, []);
*/

  return (
    <div className="App">
      
       {Auth.loggedIn() ? (
        <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          days &&
          <Chart data={days.days} />
)}
        </>
      ) : (
        ""
      )}

      
      
    </div>
  );
}
