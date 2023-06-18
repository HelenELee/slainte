import React, { useState, useEffect } from 'react';
import { StyledForm, StyledInput, StyledButton, StyledLabel, ErrorSpan } from './FormComponents';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import { validateEmail, checkPassword } from '../utils/helpers';

const SignupForm = (props) => {

  useEffect(() => {
   // console.log("use effect");
  //  clear previous details
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
    
    
  }, [] );

  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  const [addUser] = useMutation(ADD_USER);

  //state variables used for validation
  const [enteredDetails, setEnteredDetails] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    //do various validation
    if (event.target.name === "email") {
      if (userFormData.email !== "" && validateEmail(userFormData.email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
      
    } else if (event.target.name === "password") {
      if (userFormData.password !== "" && checkPassword(userFormData.password)) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    } else {
      
      if (userFormData.username !== "") {
        setIsValidName(true);
      } else {
        
        setIsValidName(false);
      }
    }

    if (userFormData.username !== "" && userFormData.email !== "" && userFormData.password !== "") {
      setEnteredDetails(true);
    }
    
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();   
    
    try {
      //use mutation to create new user
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      //stores token in local storage & reloads
      Auth.login(data.addUser.token);

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
            <StyledInput 
            type="text" 
            value={userFormData.username} 
            onChange={handleInputChange} 
            onBlur={() => setIsValidName(true)}
            name="username" 
            placeholder="Your username" 
            size="50%"
            required/>
          
            <StyledLabel>Email:</StyledLabel>
            <StyledInput 
            type="text" 
            value={userFormData.email} 
            onChange={handleInputChange} 
            onBlur={handleInputChange}
            //onBlur={() => setEnteredEmail(true)}
            name="email" 
            placeholder="Your email" 
            size="50%"
            validInput={isValidEmail}
            required/>
            {(enteredDetails & !isValidEmail ?  <span>❌ Please enter a valid email.</span> : "")}
            <StyledLabel >Password:</StyledLabel>
            <StyledInput 
            type="password" 
            value={userFormData.password} 
            onChange={handleInputChange} 
            //onBlur={() => setEnteredPassword(true)}
            name="password" 
            size="50%"
            placeholder="Your password" />
            {(enteredDetails & !isValidPassword ?  <span>❌ Please enter a valid password.</span> : "")}

            {/* {enteredDetails && (enteredDetails && isValidPassword && isValidEmail && isValidName ? "" : <p>❌ Please enter valid details.</p>)} */}
            <StyledButton 
            type="submit" 
            disabled={!isValidName || !isValidPassword || !isValidEmail}
            >Sign up</StyledButton>
      
        </StyledForm>
    </>
  );
};

export default SignupForm;
