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
export const QUERY_MAIN_CHART1 = gql`
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

export const QUERY_MAIN_CHART2 = gql`
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

