import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
:root {
    --red: #A62639;
    --pink: #DB324D;
    --dark-grey: #56494E;
    --light-grey: #56494E;
    --burgundy: #511C29;
    --white: white;
    --black:black;
    --orange: #F6BD60;
    --off-white: #FEDE2;
    --dusty-pink: #F5CAC3;
    --pale-green: #84A59D;
    --dark-pink: #F28482;
  
  }
  * {
    border: solid 0px;
  }
  
  html {
    height:100%;
  } 
  
  body {
    margin: 0;
    font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
   
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    /*flex-direction: column; */
    color: var(--pink)
  }
 `

 export default GlobalStyle;