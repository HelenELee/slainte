import React, { useState } from 'react';
import { redirect } from "react-router-dom";
//import { useParams } from 'react-router';
import {food_description, mind_description, conn_description, exercise_description} from '../data/categories.js';
import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import FlipCard from './FlipCard';
//import { FlexContainer, FlexChild } from './FlexComponents';
import { FlexContainer, FlexChild } from './FlexComponents';
import StyledFlipCard from './StyledFlipCard';
//import StyledFlipCard from "./StyledFlipCard";
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DAY, UPDATE_DAY, DELETE_DAY } from '../utils/mutations';
import { QUERY_ACTIVITIES } from '../utils/queries';

const DayForm = (props) => {
  
  const dayId = (props.dayData ? props.dayData._id : undefined); 

  const [userFormData, setUserFormData] = useState({ 
    date: (props.dayData ? props.dayData.date : ''), 
    mindActivities: (props.dayData ? props.dayData.mindActivities : []),  
    foodActivities: (props.dayData ? props.dayData.foodActivities : []), 
    exerciseActivities: (props.dayData ? props.dayData.exerciseActivities : []), 
    connActivities: (props.dayData ? props.dayData.connActivities : []),  
    sleep: (props.dayData ? props.dayData.sleep : ''),
    rating: (props.dayData ? props.dayData.rating : ''), 
    notes: ''
  });

  const [createDay ] = useMutation(CREATE_DAY);
  const [updateDay] = useMutation(UPDATE_DAY);
  const [deleteDay] = useMutation(DELETE_DAY);

  //get all activitie to use in checkboxes in form
  const activitiesQuery = useQuery(QUERY_ACTIVITIES);
  const activities = activitiesQuery.data?.activities || [];
 
  const onlyUnique = (value, index, array) =>{
    return array.indexOf(value) === index;
  }

  const updateArray = (checkValue, arrayValue, theValue) => {
    if (checkValue){
      //console.log("checked");
      return arrayValue.concat(theValue).filter(onlyUnique);            
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
          newArray = updateArray(event.target.checked, userFormData.connActivities, value);
          setUserFormData({ ...userFormData, "connActivities": newArray})
         
      } 
    } else {
      setUserFormData({ ...userFormData, [name]: value });
    }
    
   
  };

  const handleDeleteDay = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
        return false;
    }
    //console.log("ABOUT TO CALL DELETEDAY");
    try {
      const responseUpdate = await deleteDay({
        variables: {
          dayID: dayId
        }
      });

      if (!responseUpdate) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
    window.location.assign('/calendar');
  }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const newDay = {
          ...userFormData
        }


        if (!dayId) {
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
          
        } else {
              try {
                //console.log("newDay before updated", newDay);
               // console.log("TRYING UPDATE", dayId);
                const responseUpdate = await updateDay({
                  variables: {
                    //dayID: '6454fe966fe4b91da2866cf7',
                    dayID: dayId,
                    input: newDay
                  }
                });
          
                if (!responseUpdate) {
                  throw new Error('something went wrong!');
                }
              } catch (err) {
                console.error(err);
              }
          
        }
         //window.location.assign('/calendar');
         return redirect('/calendar');
    };

    return (
        <>
        
          <StyledForm onSubmit={handleFormSubmit}>
          
          
          
                <StyledLabel>Date:</StyledLabel>
                <input type="text" name="date" placeholder="" onChange={handleInputChange} value={userFormData.date}/>
                 <StyledLabel>What did you do today? </StyledLabel>
                {activitiesQuery.loading ? (
                  <div>Loading...</div>
                ) : (
                  activities &&
                  <>
                    <FlexContainer>
                      <FlexChild>
                      <StyledFlipCard category="Food" desc={food_description} activities={activities} key="Food" onClick={handleInputChange} selections={userFormData.foodActivities}></StyledFlipCard>
                      </FlexChild>
                      <FlexChild>
                      <StyledFlipCard category="Mind" desc={mind_description} activities={activities} key="Mind" onClick={handleInputChange} selections={userFormData.mindActivities}></StyledFlipCard>
                      </FlexChild>
                      <FlexChild>
                      <StyledFlipCard category="Exercise" desc={exercise_description} activities={activities} key="Exercise" onClick={handleInputChange} selections={userFormData.exerciseActivities}></StyledFlipCard>
                      </FlexChild>
                      <FlexChild>
                      <StyledFlipCard category="Connection" desc={conn_description} activities={activities} key="Connection" onClick={handleInputChange} selections={userFormData.connActivities}></StyledFlipCard> 
                      </FlexChild>
                    
                    
                    
                    </FlexContainer>
                    
                      {/* <FlipCard category="Food" activities={activities} key="Food" onClick={handleInputChange} selections={userFormData.foodActivities}></FlipCard>
                      <FlipCard category="Mind" activities={activities} key="Mind" onClick={handleInputChange} selections={userFormData.mindActivities}></FlipCard>
                      <FlipCard category="Exercise" activities={activities} key="Exercise" onClick={handleInputChange} selections={userFormData.exerciseActivities}></FlipCard>
                      <FlipCard category="Communication" activities={activities} key="Communication" onClick={handleInputChange} selections={userFormData.connActivities}></FlipCard> */}
                  </>
                     
                   )}
                <div>
                  <input type="radio"
                      name="rating"
                      value="1"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '1' ? true : false}
                    />Not Great
                    <input type="radio"
                      name="rating"
                      value="2"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '2' ? true : false}
                    />Good
                    <input type="radio"
                      name="rating"
                      value="3"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '3' ? true : false}
                    />Fantastic
                </div>

                
                <StyledLabel >How much sleep did you get?</StyledLabel>
                <StyledInput type="text" onChange={handleInputChange} name="sleep" placeholder="" value={userFormData.sleep} ></StyledInput>
                                
                <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                {dayId ?
                 <StyledButton type="button" onClick={handleDeleteDay}>Delete</StyledButton>
                  : ""}
                
                
            </StyledForm>
          
            
            
        </>
      );

      
};

export default DayForm;