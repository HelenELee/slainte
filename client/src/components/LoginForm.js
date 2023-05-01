// see SignupForm.js for comments
import React, { useState } from 'react';
//import { Form, Button, Alert } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';
import { StyledModal } from "./StyledModal"
//import { loginUser } from '../utils/API';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  //const [validated] = useState(false);
 // const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    //if (form.checkValidity() === false) {
    //  event.preventDefault();
    //  event.stopPropagation();
    //}
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }


    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
    
      <StyledForm onSubmit={handleFormSubmit}>
            <StyledLabel>Email:</StyledLabel>
            <StyledInput type="text" value={userFormData.email} onChange={handleInputChange} name="email" placeholder="Your email" required/>
            <StyledLabel >Password:</StyledLabel>
            <StyledInput type="password" value={userFormData.password} onChange={handleInputChange} name="password" placeholder="Your password" />
            
            <StyledButton type="submit" disabled={!userFormData.email || !userFormData.password}>Login</StyledButton>
      
        </StyledForm>
      
        
        
    </>
  );
};

export default LoginForm;
