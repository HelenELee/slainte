//main form for submitting an activity
import React, { useState } from 'react';
//import package to handle alerts/confirms - used for delete
import { confirmAlert } from 'react-confirm-alert'; 
import '../react-confirm-alert.css'; // Import css
//use fontawesome for faces
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFaceMeh, faFaceFrown, faHandsClapping } from '@fortawesome/free-solid-svg-icons';
//need useNavigate to redirect to another route - heroku does not like assign
import { useNavigate } from "react-router-dom";
//get descriptions that are displayed on front of each card
import {food_description, mind_description, conn_description, exercise_description} from '../data/categories.js';
//get form styling from FormComponent and flex 
import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import { FlexContainer, FlexChild } from './FlexComponents';
//actually contains layout for flip card
import StyledFlipCard from './StyledFlipCard';
//authentication
import Auth from '../utils/auth';
//setup for queries
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DAY, UPDATE_DAY, DELETE_DAY } from '../utils/mutations';
import { QUERY_ACTIVITIES } from '../utils/queries';
//confetti for when you click submit
import { addConfetti } from '../utils/confetti.js';

const DayForm = (props) => {
  //setup for redirect to another route
  const navigate = useNavigate();

  //check if paameter was passed - ie open existing event
  const dayId = (props.dayData ? props.dayData._id : undefined); 

  //set state initially - either based on existing event passed in through props or blanks for new event
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

  //set up queries
  const [createDay ] = useMutation(CREATE_DAY);
  const [updateDay] = useMutation(UPDATE_DAY);
  const [deleteDay] = useMutation(DELETE_DAY);

  //get all activitie to use in checkboxes in form
  const activitiesQuery = useQuery(QUERY_ACTIVITIES);
  const activities = activitiesQuery.data?.activities || [];
 
  //function to ensure all values in arrays are unique
  const onlyUnique = (value, index, array) =>{
    return array.indexOf(value) === index;
  }
  //update array of activities - either checkbox checked - add to array
  //not checked - then remove from array
  const updateArray = (checkValue, arrayValue, theValue) => {
    if (checkValue){
      //console.log("checked");
      return arrayValue.concat(theValue).filter(onlyUnique);            
    } else {
      //console.log("not checked");
      return arrayValue.filter((elem) => {return elem !== theValue}) 
    }
  }
  
  //when something clicked add to correct array and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newArray;
    
   // check which category
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

  const doDelete = (event) => {
    
    confirmAlert({
      title: 'Confirm Deletion.',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteDay(event)
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  };

  //delete day
  const handleDeleteDay = async (event) => {
    event.preventDefault();
    //check user logged in
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
        return false;
    }
    
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
    //window.location.assign('/calendar');
    //when day deleted redirect back to calendar
    return navigate('/calendar');
  }

  //do update when submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const newDay = {
          ...userFormData
        }

        //check if existing day i.e event id exists
        //either a create or an update
        if (!dayId) {
          //create
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
          //update
              try {
                
                const responseUpdate = await updateDay({
                  variables: {
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
         
         addConfetti(); //shower confetti
         return navigate('/calendar');
    };

    return (
        <>
        
          <StyledForm onSubmit={handleFormSubmit}>                
                <FlexContainer direction="column">
                <FlexChild>
                <StyledLabel display="inline-block">Date:</StyledLabel>
                <StyledInput display="inline-block" size="11" type="date" name="date" placeholder="" onChange={handleInputChange} value={userFormData.date}/>
                </FlexChild>
                
                <FlexChild>
                {/* checkbox for rating - uses fontawesome for icons */}
                <StyledLabel >How would you rate your day?</StyledLabel>
                  <input type="radio"
                      name="rating"
                      value="1"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '1' ? true : false}
                    /> <FontAwesomeIcon icon={faFaceFrown} size="2xl" color='var(--dark-pink'/> 
                    
                    
                    <input type="radio" 
                      name="rating"
                      value="2"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '2' ? true : false}
                    /><FontAwesomeIcon icon={faFaceMeh} size="2xl" color="var(--orange)"/> 

                    <input type="radio"
                      name="rating"
                      value="3"
                      onChange={handleInputChange}
                      checked={userFormData.rating === '3' ? true : false}
                    /><FontAwesomeIcon icon={faSmile} size="2xl" color='var(--pale-green)'/> 
              </FlexChild>

                

              <FlexChild>
                <StyledLabel >How much sleep did you get last night?</StyledLabel>
                <StyledInput size= "11" type="text" onChange={handleInputChange} name="sleep" placeholder="" value={userFormData.sleep} ></StyledInput>
                 <br />  
                 </FlexChild>
               </FlexContainer>
                 {/* Set of flip cards with activities */}
                 <StyledLabel>What did you do today? </StyledLabel>
                {activitiesQuery.loading ? (
                  <div>Loading...</div>
                ) : (
                  // check you have activities to display in flip cards
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
                    
                      
                  </>
                     
                   )}
                
               

                <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                {/* if existing event display detele button */}
                {dayId ?
                //  <StyledButton type="button" onClick={handleDeleteDay}>Delete</StyledButton>
                <StyledButton type="button" onClick={doDelete}>Delete</StyledButton>
                  : ""}
                
                
            </StyledForm>
          
            
            
        </>
      );

      
};

export default DayForm;