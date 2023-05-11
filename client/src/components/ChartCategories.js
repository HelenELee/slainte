//import whats  needed for recharts
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  //set up styles
  import styled from 'styled-components';

  const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: var(--pale-green);
`;

  export default function Chart({ data }) {
    let newArray = [...data];
    const daysSorted = newArray.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    //colour code categories
    return (
      <>
        <Title>Activities per Category</Title>
      
        <ResponsiveContainer width="100%" height={400} debounce={300}>
          <BarChart
            data={daysSorted}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="score"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="mindCount" fill="var(--orange)" />
            <Bar dataKey="foodCount" fill="var(--pale-blue)" />
            <Bar dataKey="exerciseCount" fill="var(--pale-green)" />
            <Bar dataKey="connCount" fill="var(--dark-pink)" />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
  
