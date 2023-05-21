import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { FlexContainer, FlexChild } from './FlexComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { faSmile, faFaceMeh, faFaceFrown} from '@fortawesome/free-solid-svg-icons';


const UnorderedList = styled.ul`
  list-style: none;
  margin-left: auto;
  li {
    display: inline-block;
    margin-right: 10px;
  }
  
`

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: var(--orange);
`;

const Suggestions = (props) => {
    
    const { loading, error, data, refetch } = useQuery(GET_ME);
    const userData = data?.me || [];

    useEffect(() => {
       
        if(!loading){
            refetch();
        }
        
    },[] );

    if (loading) {
    return <h2>LOADING...</h2>;
    }
    
    const getBestActivity = () => {
        //console.log("Inside getBestActivity");
        let bestActivityCount = userData.totalFoodCount;
        let bestActivity = "Food";
        if (userData.totalExerciseCount > bestActivityCount) {
            bestActivityCount = userData.totalExerciseCount;
            bestActivity = "Exercise";
        }
        if (userData.totalMindCount > bestActivityCount) {
            bestActivityCount = userData.totalMindCount;
            bestActivity = "Mind";
        }
        if (userData.totalConnCount > bestActivityCount) {
            bestActivityCount = userData.totalConnCount;
            bestActivity = "Connection";
        }
        console.log("bestactivity", bestActivity);
        return bestActivity;
    }

    const populateSuggestions = () => {
        let suggestionArray = []
        
        if (userData.totalDayCount && userData.totalScore >= userData.totalDayCount) {
            suggestionArray.push("Great job! You seem to be averaging at least one activity per recorded day.")
        } else {
            suggestionArray.push("Lets get started tracking your activities!")
        }
        if (userData.totalScore > 0) {
            suggestionArray.push(`You have recorded a total of ${userData.totalScore} activities.`)
        }
        if (Math.round(userData.totalSleep/userData.totalDayCount) < 7 ) {
            suggestionArray.push("You seem to be averaging less than 7 hours of sleep a night, which is the recommended amount for adults.")
        }
        if (userData.totalScore > 0) {
            suggestionArray.push(`You are doing very well in the ${getBestActivity()} category. Maybe include more activities in the other categories too.`)
        }
        return suggestionArray;
    }
    
    return (
        <>
        <FlexContainer direction="column">
            <FlexChild>
                <Title>Suggestions</Title>
            </FlexChild>
            <FlexChild>
            {/* <FontAwesomeIcon icon="fa-solid fa-star" /> */}
            
            <UnorderedList>
                 {
                    populateSuggestions().map((suggest) => (
                    <li key={suggest.substring(0, 5)}><FontAwesomeIcon icon={faStar} color="var(--orange)"/>{suggest}</li>
                    ))
                }
            </UnorderedList>
            <br />
            </FlexChild>
        </FlexContainer>
        
            
        </>
        
    )
}

export default Suggestions;