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
  
  export default function Chart({ data }) {


    let newArray = [...data];

    //sort data in ascending date order
    const daysSorted = newArray.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    //colour code chart
    return (
      <ResponsiveContainer width="100%" height={400}>
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
          <Bar dataKey="sleep" fill="var(--orange)" />
          <Bar dataKey="rating" fill="var(--dark-pink)" />
          <Bar dataKey="score" fill="var(--pale-green)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
