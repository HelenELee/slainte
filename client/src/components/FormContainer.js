//container for DayForm if opening an existing event 
//so query gets done before form opens
import React from 'react';
import { useParams } from 'react-router';
import DayForm from './DayForm';

import { useQuery } from '@apollo/client';
import { GET_DAY } from '../utils/queries';

const FormContainer = (props) => {
  //get id of day if passed in i.e. opening an existing day from calendar
  
  const { dayId } = useParams();  

  //only call query if you have a day id - get details of that day
  const { loading, data } = useQuery(GET_DAY, {variables: { dayID: dayId }});
  const userData = data?.getDay || [];

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (<DayForm dayData={userData} />);

};

export default FormContainer;