import React, { useState } from 'react';

import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_DAY } from '../utils/mutations';

const ActivityForm = () => {
  const [userFormData, setUserFormData] = useState({ date: '', mindActivities: [], sleep: '' });

  const [createDay, { error, data }] = useMutation(CREATE_DAY);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const newDay = {
          "date": "1/5/2023",
          "mindActivities": ["Meditate", "Journal"]
        };
        
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
    };

    return (
        <>
        Daily Update
          <StyledForm onSubmit={handleFormSubmit}>
                <StyledLabel>Date:</StyledLabel>
                <StyledLabel>What did you do today?</StyledLabel>
                <select id="mindActivities">
                    <option value="Meditate">Meditate</option>
                    <option value="Journaling">Journaling</option>
                    <option value="Gratitude Journal">Gratitude Journal</option>
                 </select>
                <StyledLabel >How much sleep did you get?</StyledLabel>
                <StyledInput type="text" value="7" onChange={handleInputChange} name="sleep" placeholder="" />
                
                <StyledButton type="submit" disabled={false}>Submit</StyledButton>
          
            </StyledForm>
          
            
            
        </>
      );

      
};

export default ActivityForm;