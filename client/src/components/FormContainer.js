import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DayForm from './DayForm';

import Auth from '../utils/auth';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_DAY } from '../utils/queries';

const FormContainer = (props) => {
  //get id of day if passed in i.e. opening an existing day from calendar
  //if no day if then new day
  const { dayId } = useParams();
  console.log("dayId initially= " + dayId);
  

  //only call query if you have a day id - get details of that day
  //bug with useQuery - skip does not work
  //using useLazyQuery and useEffect is a workaround to ensure query only called when id exists
  //const [ dayQuery ] = useLazyQuery(GET_DAY);
  const { loading, error, data } = useQuery(GET_DAY, {variables: { dayID: dayId }});

  const userData = data?.getDay || [];
  //const [dayQuery, { data }] = useLazyQuery(GET_DAY, {variables: { dayID: dayId }});

  // useEffect(() => {
  //   console.log("dayId in useEffect = " + dayId);
  //   if (dayId) {
  //     console.log("CALLING DAY_QUERY", dayId);
  //       dayQuery({variables: { dayID: dayId }});
  //       //dayQuery();
        
  //   }
  // }, []);

if (loading) {
  return <h2>LOADING...</h2>;
}
return (<DayForm dayData={userData} />);

  
};

export default FormContainer;