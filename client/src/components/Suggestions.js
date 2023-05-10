import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Suggestions = (props) => {
    
    const { loading, error, data, refetch } = useQuery(GET_ME);
    const userData = data?.me || [];
    //setRender(true);
    
    console.log("RENDERING SUGGESTIONS", props.data);

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

    console.log("USERDATA" , userData);
    const populateSuggestions = () => {
        let suggestionArray = []
        console.log(userData.totalScore, userData.totalDayCount);
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
    // suggestions = populateSuggestions();
    //console.log("SUGGESTIONS", suggestions);
    return (
        <>
        "Suggestions"
        
        <ul>
                 {
                    populateSuggestions().map((suggest) => (
                    <li>{suggest}</li>
                    ))
                }
            </ul>
            
        </>
        
    )
}

export default Suggestions;