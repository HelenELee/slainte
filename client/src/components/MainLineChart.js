//main chart that tracks score, rating and sleep - recharts
import React from "react";
import styled from 'styled-components';
import { StyledSection } from './FormComponents';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: var(--pale-green);
`;

const MainLineChart = ({ data }) => {
 //data comes from grapgql query  and contains "days"
  let newArray = [...data];

  let daysSorted = newArray.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });
 
  return (
    <StyledSection>
    
    <Title>Day Rating v's Activity Score and Sleep</Title>
    <ResponsiveContainer width="100%" height={400} debounce={300}>
       
        <LineChart
            width={100}
            height={300}
            data={daysSorted}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="score" stroke="var(--orange)" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="rating" stroke="var(--dark-pink)" activeDot={{ r: 8 }}/>
      <Line type="monotone" dataKey="sleep" stroke="var(--pale-green)" activeDot={{ r: 8 }}/>
      
    </LineChart>


    </ResponsiveContainer>
    </StyledSection>
  );
}

export default MainLineChart;