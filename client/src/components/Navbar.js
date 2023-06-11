import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { StyledModal } from "./StyledModal"
import Logo from'../images/Logo.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

const CloseButton = styled.span`
  margin: auto;
  float: right;
  &:hover {
    cursor: pointer;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  // border: solid 1px;
`

// const Title = styled.h1`
//   font-size: 1.5em;
//   //text-align: left;
  
// `;
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
  //border: solid 5px purple;
`

const UnorderedList = styled.ul`
  padding: 10px;
  position: relative;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  a {
    text-decoration: none;
  }
  //border: solid 5px red;
  
`

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 1000px) {
     {
      display: block;
      cursor: pointer;
    }

`

const NavElements = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  //border: solid 5px blue;

  @media (max-width: 1000px) {
    display: ${props => props.displayYN ? 'block' : 'none'};
    flex-direction: column;
    align-content: stretch;
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #ffffff;
    //width: 0px;
    width: ${props => props.displayYN ? '200px' : '0px'};
    height: 400px;
    //height: calc(100vh - 60px);
    transition: all 0.3s ease-in;
    overflow: hidden;
    border: solid 1px var(--orange);
    border-right: 0px;
    border-radius: 5% 0 0 5%;
    z-index: 10;
    //flex-wrap: nowrap;
  }

`

const NavLinkStyled = styled(NavLink)`
  background: white;
  //border: solid 3px green;
  //outline: 0;
  font-size: 20px;
  text-decoration: none;
  color: black;
  padding:10px;
  a:visited {
    color: black;
  }
  &.active {
    border-bottom: 2px solid var(--orange);
    font-size: 20px;
    text-decoration: none;
    color: var(--orange);
  }

  @media (max-width: 1000px) {
    width: 200px;
    display: block;
    &.active {
      border-bottom: 0px solid var(--orange);
      // background: var(--light-grey);
    }
  }
  
`;

const NavLinkLogout = styled(NavLink)`
  background: white;
  border: 0;
  outline: 0;
  font-size: 20px;
  text-decoration: none;
  color: black;
  padding:10px;
  a:visited {
    color: black;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: solid 0px;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    color: var(--orange);
    border-bottom: 2px solid var(--orange);
    opacity: 1;
  `}
`;

const MainTitle = styled.h1`
  font-size: 1.5em;
  color: var(--orange);
  
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 700;
  font-size: 3rem;
`;


const types = ['Login', 'Sign Up'];

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(types[0]);
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    //alert(showNavbar);
  }

  return (
    <>
      <Wrapper>
      
          <Box>
            <Link to="/"><img src={Logo} alt="logo" /></Link>
            
          </Box>
          <MainTitle>Slainte!</MainTitle>
            
            <UnorderedList>
              
                  {Auth.loggedIn() ? (
                          <>
                            {/* <NavUnlisted> */}
                              <MenuIcon onClick={handleShowNavbar}>
                                <FontAwesomeIcon icon={faBars} size="2xl" color="var(--orange)"/>
                              </MenuIcon>
                              <NavElements displayYN={showNavbar}>
                                  {/* <NavLinkStyled to="/progress" onClick={handleShowNavbar} >TEST</NavLinkStyled> */}
                                  <NavLinkStyled to="/" onClick={handleShowNavbar} >Home</NavLinkStyled>
                                  <NavLinkStyled to="/dashboard" onClick={handleShowNavbar} >Dashboard</NavLinkStyled>
                                  <NavLinkStyled to="/add-day" onClick={handleShowNavbar} >Add Activity</NavLinkStyled>
                                  <NavLinkStyled to="/calendar" onClick={handleShowNavbar} >All Activities</NavLinkStyled>
                                  <NavLinkStyled to="/profile" onClick={() => setShowNavbar(false)}>Profile</NavLinkStyled>
                                  <NavLinkLogout to="" onClick={Auth.logout} className="logout">Logout</NavLinkLogout>
                              </NavElements>
                              {/* </NavUnlisted> */}
                          </>
                              
                        ) : (<NavLinkStyled to="#" onClick={() => setShowModal(true)}>Login/Sign Up</NavLinkStyled>)
                  }
             
            </UnorderedList>
            <StyledModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}>
                  <CloseButton onClick={() => setShowModal(false)}>
                    <FontAwesomeIcon icon={faClose} size="2xl" color="var(--orange)"/>
                  </CloseButton>
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
