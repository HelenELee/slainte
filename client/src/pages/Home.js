import styled from "styled-components";
import mainImage from'../images/good-vibes.jpg';
import { FlexContainer, FlexChild } from '../components/FlexComponents';

const FootNote = styled.span`
  font-size: 0.75em;
  color: var(--orange);
`

const MainImg = styled.img`
  border-radius: 10%;
  //float: 'left';
  padding: 30px;
  // margin-left: 10px;
`

const MainTitle = styled.h1`
  font-size: 1.5em;
  color: var(--strong-blue);
  
  font-family: 'Dancing Script', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  font-weight: 700;
  font-size: 3rem;
  margin-left:15px;
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
          <FlexContainer direction="row" directionSM="column" padding="10px">
            <FlexChild>
            <MainImg src={mainImage} alt="good-vibes" width="80%" />
            </FlexChild>
            <FlexChild>
              <FlexContainer direction="column">
                <FlexChild> 
                    
                      <MainTitle>Welcome to Slainte where your health matters.</MainTitle>
                      <Box>
                      Everyone is super busy these days but its worth taking time every day to implement a few changes that will boost your health and mood!!
                      <p>Research tells us that activities in the food, mind, exercise and connection categories can improve our mood and energy levels.</p>
                      <p>Invest in yourself and track what you do today to make a difference to how you feel tomorrow!</p>
                      <FootNote>Slainte (slawn-che), meaning 'Good Health' is an ancient Irish expression that derives from the word Slan, meaning safe.</FootNote>
                      </Box>
                     
                      
                      
                    
                </FlexChild>
              </FlexContainer>
            </FlexChild>
          </FlexContainer>
           
        </>
    </div>
  );
}
