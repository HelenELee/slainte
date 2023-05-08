//import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



const MainLineChart = ({ data }) => {
  console.log("DATA", data)
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
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
  );
}

export default MainLineChart;