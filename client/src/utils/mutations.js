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

export const CREATE_DAY = gql`
 mutation createDay($input:SaveDayInput) {
    createDay(input: $input) {
      _id
      username
      email
      days {
          _id
          date
          mindActivities
          mindCount
          rating
          sleep
          notes
          score
        }
    }
  }
  
`;

