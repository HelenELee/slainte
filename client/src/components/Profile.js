import React, { useState } from 'react';
//get form styling from FormComponent and flex 
import { StyledForm, StyledInput, StyledButton, StyledLabel, StyledCheckBoxLabel } from './FormComponents';
import { FlexContainer, FlexChild } from './FlexComponents';
//import ToggleSwitch from "./ToggleSwitch";

import { isNumber } from '../utils/helpers';
//authentication
import Auth from '../utils/auth';
//need useNavigate to redirect to another route - heroku does not like assign
import { useNavigate } from "react-router-dom";
//setup for queries
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';
//import { GET_PROFILE } from '../utils/queries';

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
     //console.log("userFormData.showProgressDial", userFormData.showProgressDial);
     //const [value, setCheckbox] = useState(true);

    //const showProgressDialOrig = props.profileData.showProgressDial
   // let isChecked = (props.profileData.showProgressDial === false ? false : true);
    //when something clicked add to correct array and update state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
       // console.log("handleInputChange name/value" + name, value);
        //console.log("value", value);
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
            // if (value === "true") {
            //     setUserFormData({ ...userFormData, "showProgressDial": true });
            // } else {
            //     setUserFormData({ ...userFormData, "showProgressDial": false });
            // }
            setUserFormData({ ...userFormData, "showProgressDial": !userFormData.showProgressDial });
            //console.log("now - ", userFormData.showProgressDial);
            //console.log(userFormData);
        } else {
           setUserFormData({ ...userFormData, [name]: value });
           //console.log(userFormData);
        }
        
        //console.log("handleInputChange - end ", userFormData);
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
        //console.log("submitting", profile);
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

    //console.log("profile - from props", props);
    return (
        <StyledForm onSubmit={handleFormSubmit}>
            props = {(props.profileData.showProgressDial === false ? "false" : "true")}
            {/* value = {userFormData.showProgressDial} */}
            {/* {(props.profileData.showProgressDial)} */}
            <FlexContainer direction="column">
                <FlexChild>
                    <StyledLabel display="inline-block">Activities per week: </StyledLabel>
                    <StyledInput display="inline-block" size="11" type="text" name="weeklyTarget" placeholder="" value={userFormData.weeklyTarget} onChange={handleInputChange}/>
                    {(enteredTarget ?  "" : <p>❌ Please enter valid number.</p>)}
                    <br /><input 
                    type="checkbox" 
                    id="showProgressDial" 
                    name="showProgressDial" 
                    // value={userFormData.showProgressDial} 
                    key="showProgressDial" 
                    onChange={handleInputChange} 
                    // checked={(userFormData.showProgressDial === false ? false : true)}
                    checked={userFormData.showProgressDial}
                     />
                     <StyledCheckBoxLabel 
                     key="label_showProgressDial" 
                     htmlFor="showProgresDial">Show Progress Dial
                     </StyledCheckBoxLabel>
                    {/* <ToggleSwitch
                        title="toogle switch xs"
                        size="xs"
                        value={value}
                        checked={value}
                        onChange={({ target }) => setCheckbox(!value)}
                        /><StyledLabel display="block">Show Progress Dial: </StyledLabel> */}
                    <StyledButton type="submit" disabled={false}>Submit</StyledButton>
                </FlexChild>
            </FlexContainer>
        </StyledForm>                
    )

};

export default Profile;