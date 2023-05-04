import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
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
          commsCount
          score
          rating
          sleep
          notes
          mindActivities
          foodActivities
          commsActivities
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
          commsCount
          score
          rating
          sleep         
        }
    }
  }
`;