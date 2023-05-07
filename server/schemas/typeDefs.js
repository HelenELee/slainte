const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Activity {
    _id: ID!
    category: String!
    title: String!
    description: String
  }

  type Day {
    _id: ID
    date: String!
    foodActivities: [String]
    mindActivities: [String]
    exerciseActivities: [String]
    commsActivities: [String]
    foodCount: Int
    mindCount: Int
    exerciseCount: Int
    commsCount: Int
    score: Int
    rating: String
    sleep: Int
    notes: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    totalScore: Int
    totalSleep: Int
    totalFoodCount: Int
    totalMindCount: Int
    totalExerciseCount: Int
    totalCommsCount: Int
    totalDayCount: Int
    days: [Day]
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    activities: [Activity]
    getChartData: [User]
    getDay(dayID: ID!): Day
  }

  input SaveDayInput {
    date: String
    mindActivities: [String]
    foodActivities: [String]
    exerciseActivities: [String]
    commsActivities: [String]
    rating: String
    sleep: String
    notes: String

  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDay(input: SaveDayInput): User
    updateDay(dayID: ID!, input: SaveDayInput): User
    deleteDay(dayID: ID!): User
  }

  
`;

module.exports = typeDefs;
