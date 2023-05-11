import styled from "styled-components";

import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';

import mainImage from'../images/good-vibes.jpg';
//import mainImage from'../images/deniz_20.jpg';
import { FlexContainer, FlexChild } from '../components/FlexComponents';

//import mainImage from'../images/natalie-grainger-8uB5kFKWWkk-unsplash_resized.jpg';
//import mainImage from'../images/ashley-whitlatch-MGKGuMP9nLY-unsplash_25.jpg';

const MainTitle = styled.h1`
  font-size: 1.5em;
  color: var(--strong-blue);
  
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 700;
  font-size: 3rem;
`;

const Box = styled.span`
  padding: 10px;
  margin: 10px;
  width: 50%;
  font-size: 1.5em;
  font-family:  'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 400;
  font-size: 2rem;
`
export default function App() {
 
  const { loading, data } = useQuery(QUERY_MAIN_CHART);
  const days = data?.me || [];

  

  return (
    <div className="App">
        <>
          <FlexContainer direction="row" padding="10px">
            <FlexChild>
            <img src={mainImage} alt="fireSpot" width="80%" style={{ float: 'left', padding: '30px' }}/>
            </FlexChild>
            <FlexChild>
              <FlexContainer direction="column">
                <FlexChild>
                    
                      <MainTitle>Welcome to Slainte! where your health matters.</MainTitle>
                      <Box>Everyone is super busy these days but its worth taking time every day to implement a few changes that will boost your health and mood!! 
                     
                      Invest in yourself and track what you do today to make a difference to how you feel tomorrow!
                      </Box>
                      
                    
                </FlexChild>
              </FlexContainer>
            </FlexChild>
          </FlexContainer>
           
        </>
    </div>
  );
}
