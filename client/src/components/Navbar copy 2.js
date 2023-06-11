import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
//import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { StyledModal } from "./StyledModal"
import Logo from'../images/Logo.jpg';


const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  // border: solid 1px;
`

const Title = styled.h1`
  font-size: 1.5em;
  //text-align: left;
  
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
  // list-style: none;
  // margin-left: auto;
  // li {
  //   display: inline-block;
  //   margin-right: 10px;
  // }
  padding: 10px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  //justify-content: flex-evenly;
  a {
    text-decoration: none;
  }
  li {
    color: red;
    margin: 0 0.8rem;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  li a:visited {
    color: black;
    margin: 0 0.8rem;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  // &.active  {
  //   backgroundColor: 'var(--dusty-pink)',
  // }
  // .current {
  //   li {
  //     border-bottom: 2px solid black;
  //   }
  // }
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
    color: var(--orange);
    border-bottom: 2px solid var(--orange);
    opacity: 1;
  `}
`;

const NavLinkStyled = styled(NavLink)`
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
  &.active {
    border-bottom: 2px solid var(--orange);
    font-size: 20px;
    text-decoration: none;
    color: var(--orange);
  }
  // .logout {
  //   colour: 'black';
  //   text-decoration: none;
  //   font-size: 20px;
  // }
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



// const NavUnlisted = styled.ul`
//   display: flex;
//   a {
//     text-decoration: none;
//   }
//   li {
//     color: red;
//     margin: 0 0.8rem;
//     font-size: 1.3rem;
//     position: relative;
//     list-style: none;
//   }

//    &.active  {
//     backgroundColor: 'var(--dusty-pink)',
//     color: red;
    
//   }
//   .current {
//     li {
//       border-bottom: 2px solid black;
//     }
//   }
// `;

const MainTitle = styled.h1`
  font-size: 1.5em;
  color: var(--orange);
  
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 700;
  font-size: 3rem;
`;

// const LinkStyled = styled(NavLink)`
//     text-decoration: none;
// `
const types = ['Login', 'Sign Up'];

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(types[0]);

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
                              <NavLinkStyled to="/">Home</NavLinkStyled>
                              <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>
                              <NavLinkStyled to="/add-day">Add Activity</NavLinkStyled>
                              <NavLinkStyled to="/calendar"  >All Activities</NavLinkStyled>
                              <NavLinkStyled to="/coming-soon">View My Profile</NavLinkStyled>
                              <NavLinkLogout to="" onClick={Auth.logout} className="logout">Logout</NavLinkLogout>
                              {/* </NavUnlisted> */}
                          </>
                              
                        ) : (<li><NavLinkStyled to="#" onClick={() => setShowModal(true)}>Login/Sign Up</NavLinkStyled></li>)
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
