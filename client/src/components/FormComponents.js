//used in the forms
import styled from "styled-components";

export const StyledForm = styled.form`
  background-color: var(--light-grey);
  padding: 20px;
  border-radius: 5px;
  border: solid 1;
`
export const StyledCheckBoxLabel = styled.label`
  color: var(--slate-grey);
  font-family: 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
`;

export const StyledLabel = styled.label`
  
  display: ${props => props.display ? props.display : "block"};
  margin-bottom: 5px;
  margin-top: 5px;
  font-weight: bold;
  color: ${props => props.invalid ? 'red' : 'black'};
`

export const StyledInput = styled.input`
  display: ${props => props.display ? props.display : "block"};
  padding: 10px;
  border: 1px solid #ccc;
  //border: ${props => props.validInput && props.validInput === false ? '1px solid #ccc' : '1px solid red'};
  border-radius: 5px;
  margin-bottom: 5px;
  // width: 50%;
  size: ${props => props.size ? props.size : `100%`};
  
`

export const StyledButton = styled.button`
  display: ${props => props.displayType ? props.displayType : 'block'};
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: var(--dark-pink);
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
`

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`

export const StyledRadioButton = styled.div`
* hiding browser el */
appearance: none;
/* Safari support */
-webkit-appearance: none;
border: 0.2rem solid #fff;
background-color: var(--bg-color);
border-radius: 50%;
&:focus-visible {
  outline-offset: 0
}
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;

export const StyledSection=styled.section`
  width: 100%;
  border: solid 0px;
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export const SubTitle = styled.h1`
font-size: 1.5em;
text-align: left;
margin-left: 5px;
color: var(--pale-green);
`;

//used for error message
export const ErrorSpan = styled.span`
font-size: 1.0em;
color: var(--dark-pink);
`;