import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      totalScore
      totalSleep
      totalFoodCount
      totalMindCount
      totalExerciseCount
      totalConnCount
      totalDayCount
      days {
          _id
          date
          mindCount
          foodCount
          exerciseCount
          connCount
          score
          rating
          sleep
          notes
          mindActivities
          foodActivities
          connActivities
          exerciseActivities
        }
      profile {
          weeklyTarget
          showProgressDial
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
        weeklyTarget  
        showProgressDial          
    }
  }
`;

export const QUERY_ACTIVITIES = gql`
  query getActivities {
    activities {
      _id
      category
      title
      description
    }
  }
`;

export const QUERY_MAIN_CHART = gql`
  query getChartData {
    me {
      _id
      username
      email
      totalScore
      days {
          _id
          date
          mindCount
          foodCount
          exerciseCount
          connCount
          score
          rating
          sleep         
        }
      profile {
          weeklyTarget
          showProgressDial
      }
    }
  }
`;

export const GET_DAY = gql`
  query getDay($dayID: ID!) {
    getDay(dayID: $dayID) {
      _id
      date
      foodActivities
      mindActivities
      connActivities
      exerciseActivities
      mindCount
      foodCount
      exerciseCount
      connCount
      score
      rating
      sleep         
    }
  }
`;



export const GET_WEEK = gql`
  query getWeek {
    getWeek {
            weekStart
            weekScore
            weekSleep
            weekFood
            weekMind
            weekExercise
            weekConn
            weekTarget
    }
  }
`;

export const QUERY_MAIN_CHART1_OLD = gql`
  query getChartData {
      days {
          _id
          date
          mindCount
          foodCount
          exerciseCount
          connCount
          score
          rating
          sleep         
        }
  }
`;

export const QUERY_MAIN_CHART2_OLD = gql`
  query getChartData {
      days {
          _id
          date
          mindCount
          foodCount
          exerciseCount
          connCount
          score
          rating
          sleep         
        }
  }
`;

export const GET_WEEKXX = gql`
  query getWeekXX($weekStart: String, $weekEnd: String) {
    getWeekXX(weekStart: $weekStart, weekEnd: $weekEnd) {
      days {
          _id
          date
          mindCount
          foodCount
          exerciseCount
          connCount
          score
          rating
          sleep         
        } 
    }
  }
`;

