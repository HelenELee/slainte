
//main login form for app
import React, { useState } from 'react';

import { StyledForm, StyledInput, StyledButton, StyledLabel } from './FormComponents';
import { validateEmail, checkPassword } from '../utils/helpers';
//set up graphql mutation
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  
  let isValidEmail = userFormData.email !== "" && validateEmail(userFormData.email);
  let isValidPassword = userFormData.password !== "" && checkPassword(userFormData.password);
  
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(false);
  const [error, setError]=useState();
  const [passwordType, setPasswordType] = useState("password");

  //store input in state value
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
      setError('❌ Invalid Username or Password')
    }
    
  };

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

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
            size="50%"
            />
            
            <StyledLabel >Password:</StyledLabel>
            <StyledInput 
            display="inline-block"
            type={passwordType}
            value={userFormData.password} 
            onChange={handleInputChange} 
            onBlur={() => setEnteredPassword(true)}
            name="password" 
            placeholder="Your password"
            size="50%"
             /> <span className="" onClick={togglePassword}>{ passwordType==="password"? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }</span>
            {enteredPassword && enteredEmail ? (isValidPassword && isValidEmail ? "" : <p>❌ Please enter valid details.</p>) : null}
            {error?<p>{error}</p>:null}          
            <br />
            <StyledButton type="submit" disabled={!userFormData.email || !userFormData.password}>Login</StyledButton>
      
        </StyledForm>
      
        
        
    </>
  );
};

export default LoginForm;
