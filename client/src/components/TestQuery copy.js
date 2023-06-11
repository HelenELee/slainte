import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEEK } from '../utils/queries';
import { RadialBar, RadialBarChart, Legend, Tooltip } from "recharts";
import ReactSpeedometer from "react-d3-speedometer";
//import GlobalStyle from './GlobalStyle';

const TestQuery = (props) => {
  
  var prevMonday = new Date();
  var today = new Date();
  
  console.log("Today =" + today);
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
  console.log("prevMonday = " + prevMonday);
  // const { loading, error, data } = useQuery(GET_WEEK, {variables: { weekStart: prevMonday, weekEnd: today }});
  const { loading, error, data } = useQuery(GET_WEEK);

  const userData = data?.getWeek || [];

  const chartData = [
    
    {
      "name": "food score",
      "value": 2,
      "fill": "#83a6ed"
    },
    {
      "name": "mind score",
      "value": 1,
      "fill": "#8dd1e1"
    },
    {
      "name": "week score",
      "value": 10,
      "fill": "#8884d8"
    },]

if (loading) {
  return <h2>LOADING...</h2>;
}
return (<div>

  <RadialBarChart 
  width={730} 
  height={250} 
  innerRadius="10%" 
  outerRadius="80%" 
  data={chartData} 
  startAngle={180} 
  endAngle={0}
>
  <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
  <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
  <Tooltip />
</RadialBarChart>


  
    <div>
    <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={77}
        customSegmentStops={[0, 250, 750, 1000]}
        segmentColors={['var(--dusty-pink)', 'var(--orange)', 'var(--pale-green)']}
        currentValueText="Activities this week"
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
        ringWidth={47}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={'black'}
        textColor={'black'}
      />
  </div>
</div>);

};

export default TestQuery;