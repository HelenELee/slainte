import React, { useState, useEffect } from 'react';

import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import FlipCard from './FlipCard';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DAY } from '../utils/mutations';
import { QUERY_ACTIVITIES } from '../utils/queries';

const ActivityForm = () => {
  const [userFormData, setUserFormData] = useState({ date: '', mindActivities: [], sleep: '' });

  const [createDay, { error}] = useMutation(CREATE_DAY);
  //get all activitie to use in checkboxes in form
  const { loading, data } = useQuery(QUERY_ACTIVITIES);

  const activities = data?.activities || [];

  console.log("****Activities****")
  
  console.log(activities);

  const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

   const todaysDate = dd + '/' + mm + '/' + yyyy;


  //const [todaysDate, setTodaysDate] = useState('');

  /*
  useEffect(() => {
    console.log("USE EFFECT!!!!");
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

   const formattedToday = dd + '/' + mm + '/' + yyyy;
   //const formattedToday = yyyy + '-' + mm + '-' + dd;
    console.log(formattedToday);
    setTodaysDate(formattedToday);
  }, []);
  */
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const newDay = {
          "date": "02/05/2023",
          "mindActivities": ["Meditate", "Journal"]
        };

        try {
            const response = await createDay({
              variables: {
                input: newDay
              }
            });
      
            if (!response) {
              throw new Error('something went wrong!');
            }
      
            
          } catch (err) {
            console.error(err);
          }
    };

    return (
        <>
        Daily Update
          <StyledForm onSubmit={handleFormSubmit}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            activities.map((act) => {return act.category})
          )}
                <StyledLabel>Date:</StyledLabel>
                <StyledInput type="text" value={todaysDate} onChange={handleInputChange} name="date" placeholder="" ></StyledInput>
                <StyledLabel>What did you do today? </StyledLabel>
                <FlipCard></FlipCard>
                <FlipCard></FlipCard>
                <FlipCard></FlipCard>
                <StyledLabel >How much sleep did you get?</StyledLabel>
                <StyledInput type="text" value="7" onChange={handleInputChange} name="sleep" placeholder="" ></StyledInput>
                
                <StyledButton type="submit" disabled={false}>Submit</StyledButton>
          
            </StyledForm>
          
            
            
        </>
      );

      
};

export default ActivityForm;