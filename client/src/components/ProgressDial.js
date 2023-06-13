import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEEK } from '../utils/queries';
import ReactSpeedometer from "react-d3-speedometer";
import { StyledSection } from './FormComponents';

//set up styles
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
text-align: left;
margin-left: 5px;
color: var(--pale-green);
`;

const ProgressDial = (props) => {
  
  var prevMonday = new Date();
  //var today = new Date();
  
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
  
  // const { loading, error, data } = useQuery(GET_WEEK, {variables: { weekStart: prevMonday, weekEnd: today }});
  const { loading, error, data } = useQuery(GET_WEEK);
  const userData = data?.getWeek || [];
  
  const rangeArray = [0, parseFloat(props.weeklyTarget/3).toFixed(2), parseFloat((props.weeklyTarget/3)*2).toFixed(2), props.weeklyTarget];

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (<StyledSection> 
    
      {/* {userData.weekScore} */}
      <Title>This Weeks Activities</Title>
       
          <ReactSpeedometer
              width={300}
              needleHeightRatio={0.7}
              value={userData.weekScore}
              maxValue={props.weeklyTarget}
             
              customSegmentStops={rangeArray}
              segmentColors={['var(--dusty-pink)', 'var(--orange)', 'var(--pale-green)']}
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
            
</StyledSection>);

};

export default ProgressDial;