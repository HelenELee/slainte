import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import FlipCard from './FlipCard';

import Auth from '../utils/auth';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { CREATE_DAY, UPDATE_DAY, DELETE_DAY } from '../utils/mutations';
import { QUERY_ACTIVITIES, GET_DAY } from '../utils/queries';

const DayForm = (props) => {
  // const foodActivities = [];
  // const mindActivities = [];

  // const dayId = undefined;
  // if (props.dayData) {
  //   const {
  //     foodActivities, 
  //     moodActivities,
  //     commsActivities,
  //     mindActivities,
  //     date,
  //     rating,
  //     sleep,
  //     _id} = props.dayData;

  //     dayId = _id;
  // } else {

  // }
  

  //const { dayId } = useParams();
  //const dayId = "645722b9c513b6a41622d138";
  const dayId = (props.dayData ? props.dayData._id : undefined);
 // dayId = _id;
  // console.log("DAY DATA", props.dayData);
  // //const foodActivities = props.dayData.foodActivities
  // console.log("FOODACTIVITIES", foodActivities)
  // console.log("FOODCOUNT", props.dayData.foodCount);

//console.log("ID", _id);

//   const dayDetails =  {
//     "_id": "645611d9b31ff587045df76f",
//     "date": "2023-05-01",
//     "foodActivities": [],
//     "mindActivities": [],
//     "commsActivities": [],
//     "exerciseActivities": [
//         "Yoga",
//         "Zumba",
//         "Jogging",
//         "Weight Training"
//     ],
//     "mindCount": 0,
//     "foodCount": 0,
//     "exerciseCount": 4,
//     "commsCount": 0,
//     "score": 4,
//     "rating": "2",
//     "sleep": 7,
//     "__typename": "Day"
// };

  //console.log("dayId initially= " + dayId);
  

  const [userFormData, setUserFormData] = useState({ 
    date: (props.dayData ? props.dayData.date : ''), 
    //date:'',
    mindActivities: [], 
    foodActivities: (props.dayData ? props.dayData.foodActivities : []), 
    exerciseActivities: [], 
    commsActivities: [], 
    sleep: '', 
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
          newArray = updateArray(event.target.checked, userFormData.commsActivities, value);
          setUserFormData({ ...userFormData, "commsActivities": newArray})
         
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
    console.log("ABOUT TO CALL DELETEDAY");
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
                console.log("newDay before updated", newDay);
                console.log("TRYING UPDATE", dayId);
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
         // window.location.assign('/calendar');
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
                      <FlipCard category="Mind" activities={activities} key="Mind" onClick={handleInputChange} selections={userFormData.mindActivities}></FlipCard>
                      <FlipCard category="Exercise" activities={activities} key="Exercise" onClick={handleInputChange} selections={userFormData.exerciseActivities}></FlipCard>
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
                {dayId ?
                 <StyledButton type="button" onClick={handleDeleteDay}>Delete</StyledButton>
                  : ""}
                
                
            </StyledForm>
          
            
            
        </>
      );

      
};

export default DayForm;