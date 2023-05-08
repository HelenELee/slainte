import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//import Home from './pages/Home';
import LoginForm from './components/LoginForm.js';
import DayForm from './components/DayForm';
import FormContainer from './components/FormContainer';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import Home from './pages/Home';
import GlobalStyle from './GlobalStyle';
import ComingSoon from './components/ComingSoon';

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

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
      <GlobalStyle />
      <Router>
        <Navbar></Navbar>
        <Routes>
        <Route 
                path='/' 
                element={<Home />} 
            />
          {/* 
            
            <Route 
                path='/login-signup' 
                element={<LoginForm />} 
            />
          */}
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
