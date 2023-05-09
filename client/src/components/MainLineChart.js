//import "./styles.css";
import React from "react";
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



const MainLineChart = ({ data }) => {
 
  let newArray = [...data];
  console.log("NEWARRAY", newArray);
  let daysSorted = newArray.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });
  console.log("DAYSSORTED", daysSorted);
  return (
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
    
  );
}

export default MainLineChart;