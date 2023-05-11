//main dashboard component that displays suggestions, quotes and charts
import styled from "styled-components";
import ChartCategories from "./ChartCategories";
import Suggestions from "./Suggestions";
import QuoteContainer from "./AxiosAPI";
import MainLineChart from "./MainLineChart";

//query to get data for charts
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';

//authentication
import Auth from '../utils/auth';
import { FlexContainer, FlexChild } from './FlexComponents';
import mainImage from'../images/good-vibes.jpg';

const Wrapper = styled.section`
    padding: 10px;
    margin: 10px;
`


export default function Dashboard() {
  //use query and check for returned data
  const { loading, data } = useQuery(QUERY_MAIN_CHART);
  const days = data?.me || [];

  // if (!loading) {
  //   console.log("DASHBOARD - tolalScore", days.totalScore);
  // }
  //display suggestions and quotes but only display charts if days have been logged - check length of days array
  return (
    <div className="App">
      
       {Auth.loggedIn() ? (
        <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          days &&
          <>
          <Wrapper>
          
            <FlexContainer direction ="column">
                <FlexContainer direction ="row">
                    <FlexChild> 
                      <Suggestions  data={days.totalScore}/> 
                    </FlexChild>
                    <FlexChild> 
                      <QuoteContainer />
                    </FlexChild>
                </FlexContainer> 
                
            {
              days.days.length > 0 &&
              <FlexContainer direction="row"> 
              <FlexChild> 
                  <MainLineChart data={days.days}/>
              </FlexChild>
              <FlexChild> 
                  <ChartCategories data={days.days} />
                  
              </FlexChild>
          </FlexContainer>
            }
                
                        
            </FlexContainer>
             
              
          </Wrapper>  
                    
          </>
          
)}
        </>
      ) : (
        <>
        {/* <p>Home Page</p> */}
        <img src={mainImage} alt="fireSpot" width="100%" height="50%"/>
        </>
        
      )}

      
      
    </div>
  );
}
