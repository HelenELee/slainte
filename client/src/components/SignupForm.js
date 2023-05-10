import React, { useState } from 'react';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import { validateEmail, checkPassword } from '../utils/helpers';

const SignupForm = (props) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  
  //const isValidPassword = userFormData.password !== "" && checkPassword(userFormData.password);

  //const [enteredPassword, setEnteredPassword] = useState(false);
  // [enteredEmail, setEnteredEmail] = useState(false);
  const [enteredDetails, setEnteredDetails] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleInputChange = (event) => {
    console.log("********INPUT CHANGE", event.target.name);
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log("UserFormData", userFormData);
    if (event.target.name === "email") {
      if (userFormData.email !== "" && validateEmail(userFormData.email)) {
        console.log("got here!!!");
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
      //const isValidEmail = userFormData.email !== "" && validateEmail(userFormData.email);
    } else if (event.target.name === "password") {
      if (userFormData.password !== "" && checkPassword(userFormData.password)) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    } else {
      if (userFormData.username !== "") {
        setIsValidName(true);
      }
    }

    if (userFormData.username !== "" && userFormData.email !== "" && userFormData.password !== "") {
      setEnteredDetails(true);
    }
    console.log("VALID EMAIL", isValidEmail);
    console.log("VALID PASSWORD", isValidPassword);
    console.log("NAME", isValidName);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();   
    
    try {
      console.log("USER DATA", userFormData);
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      
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
            required/>
            <StyledLabel >Password:</StyledLabel>
            <StyledInput 
            type="password" 
            value={userFormData.password} 
            onChange={handleInputChange} 
            //onBlur={() => setEnteredPassword(true)}
            name="password" 
            placeholder="Your password" />
            
            {enteredDetails && (enteredDetails && isValidPassword && isValidEmail && isValidName ? "" : <p>❌ Please enter valid details.</p>)}
            <StyledButton 
            type="submit" 
            disabled={!isValidName || !isValidPassword || !isValidEmail}
            >Sign up</StyledButton>
      
        </StyledForm>
    </>
  );
};

export default SignupForm;
