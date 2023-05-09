import React, { useState } from 'react';
//import { Form, Button, Alert } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';
//import { createUser } from '../utils/API';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'


const SignupForm = (props) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
 // const [validated] = useState(false);
  // set state for alert
  //const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    //const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
   
    
    try {
      console.log("USER DATA", userFormData);
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log("ABOUT TO DO AUTH");
      Auth.login(data.addUser.token);
      console.log("****TOKEN********")
      console.log(data.addUser.token);

    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });

    props.handleModalClose();
  };

  return (
    <>
      <StyledForm onSubmit={handleFormSubmit}>
            <StyledLabel>Username:</StyledLabel>
            <StyledInput type="text" value={userFormData.username} onChange={handleInputChange} name="username" placeholder="Your username" required/>
          
            <StyledLabel>Email:</StyledLabel>
            <StyledInput type="text" value={userFormData.email} onChange={handleInputChange} name="email" placeholder="Your email" required/>
            <StyledLabel >Password:</StyledLabel>
            <StyledInput type="password" value={userFormData.password} onChange={handleInputChange} name="password" placeholder="Your password" />
            
            <StyledButton type="submit" disabled={!userFormData.username || !userFormData.password}>Sign up</StyledButton>
      
        </StyledForm>
    </>
  );
};

export default SignupForm;
