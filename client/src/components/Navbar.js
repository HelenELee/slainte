import React, { useState } from 'react';
import { Link , NavLink } from 'react-router-dom';
import styled from 'styled-components';
//import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { StyledModal } from "./StyledModal"

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: palevioletred;
`;
const Wrapper = styled.section`
  height: 200;
  padding:10;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-evenly;
  align-items: center;
  align-content: flex-start;
  gap: 10px;
`

const UnorderedList = styled.ul`
  list-style: none;
  margin-left: auto;
  li {
    display: inline-block;
    margin-right: 10px;
  }
`

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Login', 'Sign Up'];

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(types[0]);

  return (
    <>
      <Wrapper>
          <Title><NavLink to="/">Slainte!</NavLink></Title>
            <UnorderedList>
              
                  {Auth.loggedIn() ? (
                          <>
                              <li><NavLink to="/add-day">Add Todays Activity</NavLink></li>
                              <li><NavLink to="/calendar">All Activities</NavLink></li>
                              <li><NavLink>View My Profile</NavLink></li>
                              <li><NavLink onClick={Auth.logout}>Logout</NavLink></li>
                          </>
                              
                        ) : (<li><NavLink onClick={() => setShowModal(true)}>Login/Sign Up</NavLink></li>)
                  }
             
            </UnorderedList>
            <StyledModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}>

                  <ButtonGroup>
                          {types.map(type => (
                            <Tab
                              key={type}
                              active={active === type}
                              onClick={() => setActive(type)}
                            >
                              {type}
                            </Tab>
                          ))}
                    </ButtonGroup>
                    
                    {active === "Login" ? 
                    <LoginForm handleModalClose={() => setShowModal(false)}/> : <SignUpForm handleModalClose={() => setShowModal(false)}/>}

            </StyledModal> 
       </Wrapper>     
    </>   
          
  );
};

export default AppNavbar;
