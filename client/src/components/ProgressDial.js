import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEEK } from '../utils/queries';
import ReactSpeedometer from "react-d3-speedometer";
//import GlobalStyle from './GlobalStyle';

//set up styles
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
text-align: left;
color: var(--pale-green);
`;

const ProgressDial = (props) => {
  
  var prevMonday = new Date();
  var today = new Date();
  
  console.log("Today =" + today);
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
  console.log("prevMonday = " + prevMonday);
  // const { loading, error, data } = useQuery(GET_WEEK, {variables: { weekStart: prevMonday, weekEnd: today }});
  const { loading, error, data } = useQuery(GET_WEEK);
  const userData = data?.getWeek || [];
  //onst rangeArray = [0, parseFloat(userData.weekTarget/3).toFixed(2), parseFloat((userData.weekTarget/3)*2).toFixed(2), userData.weekTarget];
  const rangeArray = [0, parseFloat(props.weeklyTarget/3).toFixed(2), parseFloat((props.weeklyTarget/3)*2).toFixed(2), props.weeklyTarget];

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (<div>
     
    
      {/* {userData.weekScore} */}
      <Title>This Weeks Activities</Title>
      
          <ReactSpeedometer
              width={500}
              needleHeightRatio={0.7}
              value={userData.weekScore}
              maxValue={props.weeklyTarget}
             
              customSegmentStops={rangeArray}
              segmentColors={['var(--dusty-pink)', 'var(--orange)', 'var(--pale-green)']}
              // currentValueText="Activities this week"
              currentValueText={"Activities this week"}
              customSegmentLabels={[
                {
                  text: 'Good',
                  position: 'OUTSIDE',
                  color: "black",
                },
                {
                  text: 'Great',
                  position: 'OUTSIDE',
                  color: 'black',
                },
                {
                  text: 'Awesome!',
                  position: 'OUTSIDE',
                  color: 'black',
                },
              ]}
              valueFormat={"d"}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={'black'}
              textColor={'black'}
            />
            {`(${userData.weekScore} out of ${props.weeklyTarget})`}
  
</div>);

};

export default ProgressDial;