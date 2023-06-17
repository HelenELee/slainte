import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//import all components
import LoginForm from './components/LoginForm.js';
import DayForm from './components/DayForm';
import FormContainer from './components/FormContainer';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import Home from './pages/Home';
import GlobalStyle from './GlobalStyle';
import ComingSoon from './components/ComingSoon';
import Dashboard from './components/Dashboard';
import ProgressDial from './components/ProgressDial';
import ProfileContainer from './components/ProfileContainer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//Create apollo client
const client = new ApolloClient({
  uri: '/graphql', //url of graphql server 
  link: authLink.concat(httpLink), //links in the chain between apollo client and graphql server
  cache: new InMemoryCache(), //cache results of queries
});

function App() {
  return (
    // Wrapper to make Apollo client available throughout app
    <ApolloProvider client={client}>
      <>
      {/* make GlobalStyles available thorughout app */}
      <GlobalStyle /> 
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route 
                path='/' 
                element={<Home />} 
            />
            <Route 
                path='/progress' 
                element={<ProgressDial />} 
            />
            <Route 
                path='/login-signup' 
                element={<LoginForm />} 
            />
            <Route 
                path='/add-day' 
                element={<DayForm />} 
            />
            <Route 
                path='/add-dayOLD/:dayId' 
                element={<DayForm />} 
            />
            <Route 
                path='/add-day/:dayId' 
                element={<FormContainer />} 
            />
            <Route 
                path='/calendar' 
                element={<Calendar />} 
            />
            <Route 
                path='/coming-soon' 
                element={<ComingSoon />} 
            />
            <Route 
                path='/profile' 
                element={<ProfileContainer />} 
            />
            <Route 
                path='/dashboard' 
                element={<Dashboard />} 
            />
            {/* <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          /> */}
        </Routes>
        
      </Router>
      </>
    
   
    </ApolloProvider>
  );
}

export default App;
