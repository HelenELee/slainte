import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { StyledForm, StyledInput, StyledButton, StyledLabel, Item, RadioButtonLabel, RadioButton } from './FormComponents';
import FlipCard from './FlipCard';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DAY } from '../utils/mutations';
import { QUERY_ACTIVITIES, GET_DAY } from '../utils/queries';

const DayForm = (props) => {

  const { dayId } = useParams();
  console.log("dayId = " + dayId);
  //let dayQuery;

//   const dayQuery = useQuery(GET_DAY,  {
//     variables: { dayID: dayId },
//     //enabled: !!dayId,
//     enabled: false
//    });



  const [userFormData, setUserFormData] = useState({ 
    //date: (dayId && !dayQuery.loading ? dayQuery.data.getDay.date : '2023-05-01'), 
    date:'',
    mindActivities: [], 
    foodActivities: [], 
    exerciseActivities: [], 
    commsActivities: [], 
    sleep: '', 
    notes: ''
  });

  const [createDay, { error}] = useMutation(CREATE_DAY);

  //get all activitie to use in checkboxes in form
  const activitiesQuery = useQuery(QUERY_ACTIVITIES);
  const activities = activitiesQuery.data?.activities || [];
  

  
  const updateArray = (checkValue, arrayValue, theValue) => {
    if (checkValue){
      //console.log("checked");
      return arrayValue.concat(theValue);            
    } else {
      //console.log("not checked");
      return arrayValue.filter((elem) => {return elem !== theValue}) 
    }
  }
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newArray;
   // console.log(name, value);
    if (event.target.name.startsWith("category~")) {
      let catName = event.target.name.split("~")[1];
      //console.log(value);
      switch(catName) {
        case "Food":       
          newArray = updateArray(event.target.checked, userFormData.foodActivities, value);
          setUserFormData({ ...userFormData, "foodActivities": newArray})
          break;
        case "Mind":
          newArray = updateArray(event.target.checked, userFormData.mindActivities, value);
          setUserFormData({ ...userFormData, "mindActivities": newArray})
          break;
        case "Exercise":
          newArray = updateArray(event.target.checked, userFormData.exerciseActivities, value);
          setUserFormData({ ...userFormData, "exerciseActivities": newArray})
          break;
        default:
          newArray = updateArray(event.target.checked, userFormData.commsActivities, value);
          setUserFormData({ ...userFormData, "commsActivities": newArray})
         
      } 
    } else {
      setUserFormData({ ...userFormData, [name]: value });
    }
    
   
  };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

       const newDay = {
        ...userFormData
       }


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
          window.location.assign('/calendar');
    };

    return (
        <>
        Daily Update
          <StyledForm onSubmit={handleFormSubmit}>
         
                <StyledLabel>Date:</StyledLabel>
                <input type="text" name="date" placeholder="" onChange={handleInputChange} value={userFormData.date}/>
                 <StyledLabel>What did you do today? </StyledLabel>
                {activitiesQuery.loading ? (
                  <div>Loading...</div>
                ) : (
                  activities &&
                  <>
                      <FlipCard category="Food" activities={activities} key="Food" onClick={handleInputChange} selections={userFormData.foodActivities}></FlipCard>
                      <FlipCard category="Mind" activities={activities} key="Mind" onClick={handleInputChange}></FlipCard>
                      <FlipCard category="Exercise" activities={activities} key="Exercise" onClick={handleInputChange}></FlipCard>
                      <FlipCard category="Communication" activities={activities} key="Communication" onClick={handleInputChange} selections={userFormData.commsActivities}></FlipCard>
                  </>
                     
                   )}
                <div>
                  <input type="radio"
                      name="rating"
                      value="1"
                      onChange={handleInputChange}
                    />Not Great
                    <input type="radio"
                      name="rating"
                      value="2"
                      onChange={handleInputChange}/>Good
                    <input type="radio"
                      name="rating"
                      value="3"
                      onChange={handleInputChange}/>Fantastic
                </div>

                
                <StyledLabel >How much sleep did you get?</StyledLabel>
                <StyledInput type="text" onChange={handleInputChange} name="sleep" placeholder="" ></StyledInput>
                                
                <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                <StyledButton type="submit" disabled={false} >Update </StyledButton>
                
            </StyledForm>
          
            
            
        </>
      );

      
};

export default DayForm;