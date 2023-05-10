// see SignupForm.js for comments
import React, { useState } from 'react';

import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';
import { validateEmail, checkPassword } from '../utils/helpers';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
 
  const isValidEmail = userFormData.email !== "" && validateEmail(userFormData.email);
  const isValidPassword = userFormData.password !== "" && checkPassword(userFormData.password);
  

  const [enteredPassword, setEnteredPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(false);

  const [submitClicked, setSubmitClicked] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }


    // setUserFormData({
    //   username: '',
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <>
    
      <StyledForm onSubmit={handleFormSubmit}>
            <StyledLabel>Email:</StyledLabel>
            <StyledInput 
            type="text" 
            value={userFormData.email} 
            onChange={handleInputChange} 
            onBlur={() => setEnteredEmail(true)}
            name="email" 
            placeholder="Your email" 
            required
            size="80%"
            />
            
            <StyledLabel >Password:</StyledLabel>
            <StyledInput 
            type="password" 
            value={userFormData.password} 
            onChange={handleInputChange} 
            onBlur={() => setEnteredPassword(true)}
            name="password" 
            placeholder="Your password"
            size="80%"
             />
            {enteredPassword && enteredEmail ? (isValidPassword && isValidEmail ? "" : <p>❌ Please enter valid details.</p>) : null}
            <br />
            <StyledButton type="submit" disabled={!userFormData.email || !userFormData.password}>Login</StyledButton>
      
        </StyledForm>
      
        
        
    </>
  );
};

export default LoginForm;
