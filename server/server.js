const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
//authentication middleware
const { authMiddleware } = require('./utils/auth');
//get schemas for graphql
const { typeDefs, resolvers } = require('./schemas');
//setup apollo server for use with graphql
const app = express();

//create ApolloServer
//set context - middleware that can verify token
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//When hosting on another service (like Heroku), host may independently configure the process.env.PORT variable as it runs in that environment.
const PORT = process.env.PORT || 3001;

//a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));
//a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  //create connection once to mongodb
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
