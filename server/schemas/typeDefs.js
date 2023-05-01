const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Activity {
    _id: ID!
    category: String!
    title: String!
    description: String
  }

  type Day {
    _id: ID!
    date: String!
    foodActivities: [Activity]
    mindActivities: [Activity]
    exerciseActivities: [Activity]
    commsActivities: [Activity]
    foodCount: Int
    mindCount: Int
    exerciseCount: Int
    commsCount: Int
    rating: String
    sleep: Int
    notes: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    days: [ID]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input SaveDayInput {
    date: String
    mindActivities: [String]
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDay(input: SaveDayInput): User
  }

  
`;

module.exports = typeDefs;
