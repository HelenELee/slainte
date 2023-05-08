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

    /*const formattedData = data.map((x) => "description: " + x.description + ", 
    duration: " + x.duration + ", 
    date: " + x.date.toLocaleDateString());*/
    /*function convertUTCDateToLocalDate(date) {
      var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
  
      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();
  
      newDate.setHours(hours - offset);
  
      return newDate;   
  }

    const result = data.map(o => ({ ...o, date: convertUTCDateToLocalDate(o.date) }));
*/
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
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
          <Bar dataKey="foodCount" fill="var(--dusty-pink)" />
          <Bar dataKey="exerciseCount" fill="var(--pale-green)" />
          <Bar dataKey="commsCount" fill="var(--dark-pink)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
