//define the types of all inputs and outputs for graphql
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
    connActivities: [String]
    foodCount: Int
    mindCount: Int
    exerciseCount: Int
    connCount: Int
    score: Int
    rating: String
    sleep: String
    notes: String
  }

  type ProfileType {
    weeklyTarget: Int
    showProgressDial: Boolean
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
    totalConnCount: Int
    totalDayCount: Int
    days: [Day]
    profile: ProfileType 
  }

  type Week {
    weekStart: String
    weekScore: Int  
    weekSleep: Int
    weekFood: Int
    weekMind: Int
    weekExercise: Int
    weekConn: Int  
    weekTarget: Int
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
    getWeekX(weekStart: String, weekEnd: String): Day
    getWeek: Week
    getProfile: ProfileType
  }

  input SaveDayInput {
    date: String
    mindActivities: [String]
    foodActivities: [String]
    exerciseActivities: [String]
    connActivities: [String]
    rating: String
    sleep: String
    notes: String
  }

  input Profile {
    weeklyTarget: Int
    showProgressDial: Boolean
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDay(input: SaveDayInput): User
    updateDay(dayID: ID!, input: SaveDayInput): User
    deleteDay(dayID: ID!): User
    updateProfile(input: Profile): User
  }

  

  type WeekORIG {
    _id: ID
    username: String
    email: String
    weekScore: Int
    weekSleep: Int
    weekFoodCount: Int
    weekMindCount: Int
    weekExerciseCount: Int
    weekConnCount: Int
    weekDayCount: Int
    days: [Day]
    
  }
`;

module.exports = typeDefs;
