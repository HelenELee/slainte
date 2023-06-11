import React, { useState } from 'react';
//get form styling from FormComponent and flex 
import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import { FlexContainer, FlexChild } from './FlexComponents';
import { isNumber } from '../utils/helpers';
//authentication
import Auth from '../utils/auth';
//need useNavigate to redirect to another route - heroku does not like assign
import { useNavigate } from "react-router-dom";
//setup for queries
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';
import { GET_PROFILE } from '../utils/queries';

const Profile = (props) => {

    const { loading, data } = useQuery(GET_PROFILE);
    const profile = data?.getProfile || [];
    
    //setup for redirect to another route
    const navigate = useNavigate();
    //setup mutation to save profile
    const [updateProfile ] = useMutation(UPDATE_PROFILE);

    const [enteredTarget, setEnteredTarget] = useState(true);

    const [userFormData, setUserFormData] = useState({
        weeklyTarget: (profile.weeklyTarget ? profile.weeklyTarget : ''), 
     });

    //when something clicked add to correct array and update state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "weeklyTarget") {
            if (isNumber(value)) {
                setUserFormData({ ...userFormData, [name]: parseInt(value) });
                setEnteredTarget(true);
            } else {
                setEnteredTarget(false);
            }
            
        } else {
            setUserFormData({ ...userFormData, [name]: value });
        }
        
        console.log(userFormData);
    }


    //do update when submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const profile = {
            ...userFormData
        }
        console.log("submitting", profile);
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
          return navigate('/');
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    console.log("profile - from query", profile);
    return (
        <StyledForm onSubmit={handleFormSubmit}>
            <FlexContainer direction="column">
                <FlexChild>
                    <StyledLabel display="inline-block">Activities per week:</StyledLabel>
                    <StyledInput display="inline-block" size="11" type="text" name="weeklyTarget" placeholder="" value={userFormData.weeklyTarget} onChange={handleInputChange}/>
                    {(enteredTarget ?  "" : <p>❌ Please enter valid number.</p>)}
                    <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                </FlexChild>
            </FlexContainer>
        </StyledForm>                
    )

};

export default Profile;