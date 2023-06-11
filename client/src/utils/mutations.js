import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
 mutation updateProfile($input:Profile) {
    updateProfile(input: $input) {
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

export const CREATE_DAY = gql`
 mutation createDay($input:SaveDayInput) {
    createDay(input: $input) {
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
          notes
          mindActivities
          foodActivities
          connActivities
          exerciseActivities
        }
    }
  }
`;

export const UPDATE_DAY = gql`
 mutation updateDay($dayID: ID!, $input:SaveDayInput) {
    updateDay(dayID: $dayID, input: $input) {
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
          notes
          mindActivities
          foodActivities
          connActivities
          exerciseActivities
        }
    }
  }
`;

export const DELETE_DAY = gql`
 mutation deleteDay($dayID: ID!) {
    deleteDay(dayID: $dayID) {
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
          notes
          mindActivities
          foodActivities
          connActivities
          exerciseActivities
        }
    }
  }
`;

