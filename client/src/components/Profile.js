//form to get/update Profile details
import React, { useState } from 'react';

//get form styling from FormComponent and flex 
import { StyledForm, StyledInput, StyledButton, StyledLabel, StyledCheckBoxLabel, SubTitle } from './FormComponents';
import { FlexContainer, FlexChild } from './FlexComponents';

import { isNumber } from '../utils/helpers';
//authentication
import Auth from '../utils/auth';
//need useNavigate to redirect to another route - heroku does not like assign
import { useNavigate } from "react-router-dom";
//setup for queries
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';


const Profile = (props) => {
    
    //setup for redirect to another route
    const navigate = useNavigate();
    //setup mutation to save profile
    const [updateProfile ] = useMutation(UPDATE_PROFILE);

    const [enteredTarget, setEnteredTarget] = useState(true);

    const [userFormData, setUserFormData] = useState({
        weeklyTarget: (props.profileData.weeklyTarget ? props.profileData.weeklyTarget : 0), 
        showProgressDial: (props.profileData.showProgressDial ? props.profileData.showProgressDial : ''), 
     });
     
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
       //handle inputs differently
        if (name === "weeklyTarget") {
            if (isNumber(userFormData.weeklyTarget) || value === "") {
                if (value !== ""){
                    setUserFormData({ ...userFormData, [name]: parseInt(value) });
                    setEnteredTarget(true);
                } else {
                    setUserFormData({ ...userFormData, [name]: 0 });
                    setEnteredTarget(true);
                }
                
            } else {
                setEnteredTarget(false);
            }
            
        } else if (name === "showProgressDial") {
            setUserFormData({ ...userFormData, "showProgressDial": !userFormData.showProgressDial });
        } else {
           setUserFormData({ ...userFormData, [name]: value });
           
        }
        
    }


    //do update when submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        //setup profile object to pass to updateProfile function below
        const profile = {
            ...userFormData
        }
       
        try {
                
            const responseUpdate = await updateProfile({
              variables: {
                input: profile
              }
            });
      
            if (!responseUpdate) {
              throw new Error('something went wrong!');
            }
          } catch (err) {
            console.error(err);
          }
          //success - redirect to dashboard
          return navigate('/dashboard');
    }

    
    return (
        <StyledForm onSubmit={handleFormSubmit}>
           
            <FlexContainer direction="column">
                <FlexChild>
                    <SubTitle>Goals</SubTitle>
                    <StyledLabel display="inline-block">Activities per week: </StyledLabel>
                    <StyledInput display="inline-block" size="11" type="text" name="weeklyTarget" placeholder="" value={userFormData.weeklyTarget} onChange={handleInputChange}/>
                    {(enteredTarget ?  "" : <p>❌ Please enter valid number.</p>)}
                    <br />
                    <SubTitle>Display</SubTitle>
                    <input 
                    type="checkbox" 
                    id="showProgressDial" 
                    name="showProgressDial" 
                    key="showProgressDial" 
                    onChange={handleInputChange} 
                    checked={userFormData.showProgressDial}
                     />
                     <StyledCheckBoxLabel 
                     key="label_showProgressDial" 
                     htmlFor="showProgresDial">Show Progress Dial
                     </StyledCheckBoxLabel>
                    
                    <br></br>
                    <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                </FlexChild>
            </FlexContainer>
        </StyledForm>                
    )

};

export default Profile;