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

const mydata = [
  {
    date: '2023-05-01',
    score: 4,
    rating: 3,
    sleep: 7
  },
  {
    date: '2023-05-02',
    score: 5,
    rating: 3,
    sleep: 8
  },
  {
    date: '2023-05-03',
    score: 1,
    rating: 1,
    sleep: 6
  },
  {
    date: '2023-05-04',
    score: 2,
    rating: 2,
    sleep: 6
  }
]
const dataold = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const MainLineChart = ({ data }) => {
  console.log("DATA", data)
  return (
    <LineChart
      width={500}
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
      <Line
        type="monotone"
        dataKey="score"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="rating" stroke="#82ca9d" />
      <Line type="monotone" dataKey="sleep" stroke="#82ca94" />
    </LineChart>
  );
}

export default MainLineChart;