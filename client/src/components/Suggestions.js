import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_WEEK } from '../utils/queries';
import { FlexContainer, FlexChild } from './FlexComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { StyledSection } from './FormComponents';


const UnorderedList = styled.ul`
  list-style: none;
  margin-left: auto;
  li {
    display: inline-block;
    margin-right: 10px;
    padding-bottom: 10px;
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
    const weekData = useQuery(GET_WEEK);
    const weekValues = weekData.data?.getWeek || [];

    useEffect(() => {
       
        if(!loading){
            refetch();
        }

        if(!weekData.loading){
            weekData.refetch();
        }
        
    },[] );

    if (loading || weekData.loading) {
    return <h2>LOADING...</h2>;
    }
    //work out which activity has highest count
    const getBestActivity = () => {
        
        let bestActivityCount = userData.totalFoodCount;
        let bestActivity = ["Food"];
        if (userData.totalExerciseCount >= bestActivityCount) {
            if (userData.totalExerciseCount > bestActivityCount) {
                bestActivityCount = userData.totalExerciseCount;
                bestActivity = ["Exercise"];
            } else {
                bestActivity.push("Exercise");
            }
        }
        if (userData.totalMindCount >= bestActivityCount) {
            if (userData.totalMindCount > bestActivityCount) {
                bestActivityCount = userData.totalMindCount;
                bestActivity = ["Mind"];
            } else {
                bestActivity.push("Mind")
            }
        }
        if (userData.totalConnCount >= bestActivityCount) {
            if (userData.totalConnCount > bestActivityCount) {
                bestActivityCount = userData.totalConnCount;
                bestActivity = ["Connection"];
            } else {
                bestActivity.push("Connection");
            }
        }
        
        return bestActivity.toString();
    }

    //create array of "suggestions" based on data
    const populateSuggestions = () => {
        let suggestionArray = []

        if (userData.totalDayCount && userData.totalScore >= userData.totalDayCount) {
            suggestionArray.push("Great job! You seem to be averaging at least one activity per recorded day.")
        } else {
            suggestionArray.push("Lets get started tracking your activities!")
        }
        if (userData.totalScore > 0) {
            let temp = `You have recorded a total of ${userData.totalScore} activities. ${weekValues.weekScore} this week.`;
            if (weekValues.weekScore < weekValues.weekTarget) {
                temp += ` Keep going to reach your weekly target of ${weekValues.weekTarget}!`;
            }
            suggestionArray.push(temp);
        }
        if (Math.round(userData.totalSleep/userData.totalDayCount) < 7 ) {
            suggestionArray.push("You seem to be averaging less than 7 hours of sleep a night. 7 is the recommended minimum amount for adults.")
        }
        if (userData.totalScore > 0) {
            suggestionArray.push(`You are doing very well with ${getBestActivity()}. Maybe include more activities in the other categories too.`)
        }
        return suggestionArray;
    }
    
    return (
        <StyledSection>
        <FlexContainer direction="column">
            <FlexChild>
                <Title>Suggestions</Title>
            </FlexChild>
            <FlexChild>
                        
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
        
            
        </StyledSection>
        
    )
}

export default Suggestions;