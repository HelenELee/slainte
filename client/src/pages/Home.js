import styled from "styled-components";

//import { QUERY_MAIN_CHART } from '../utils/queries';
//import { useQuery } from '@apollo/client';

import mainImage from'../images/good-vibes.jpg';
//import mainImage from'../images/deniz_20.jpg';
import { FlexContainer, FlexChild } from '../components/FlexComponents';

//import mainImage from'../images/natalie-grainger-8uB5kFKWWkk-unsplash_resized.jpg';
//import mainImage from'../images/ashley-whitlatch-MGKGuMP9nLY-unsplash_25.jpg';

const MainImg = styled.img`
  border-radius: 10%;
`

const MainTitle = styled.h1`
  font-size: 1.5em;
  color: var(--strong-blue);
  
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 700;
  font-size: 3rem;
`;

const Box = styled.section`
  padding: 10px;
  margin: 10px;
  width: 80%;
  
  font-family:   'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
`
export default function App() {
 
  // const { loading, data } = useQuery(QUERY_MAIN_CHART);
  // const days = data?.me || [];

  

  return (
    <div className="App">
        <>
          <FlexContainer direction="row" padding="10px">
            <FlexChild>
            <MainImg src={mainImage} alt="good-vibes" width="80%" style={{ float: 'left', padding: '30px' }}/>
            </FlexChild>
            <FlexChild>
              <FlexContainer direction="column">
                <FlexChild>
                    
                      <MainTitle>Welcome to Slainte where your health matters.</MainTitle>
                      <Box>
                      Everyone is super busy these days but its worth taking time every day to implement a few changes that will boost your health and mood!!
                      <p>Research tells us that activities in the food, mind, exercise and connection categories can improve our mood and energy levels.</p>
                      <p>Invest in yourself and track what you do today to make a difference to how you feel tomorrow!</p>
                      </Box>
                     
                      
                      
                    
                </FlexChild>
              </FlexContainer>
            </FlexChild>
          </FlexContainer>
           
        </>
    </div>
  );
}
