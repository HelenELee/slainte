import {
    Label,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  export default function LineChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ left: -10, right: 10 }}>
                <XAxis height={40} dataKey="part" tick={{ fontSize: 10 }}>
                    <Label
                        value='Período'
                        position='insideBottom'
                        fontSize={14}
                        fill='#676767'
                    />
                </XAxis>
                <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }}>
                    <Label
                        value={"Label 1"}
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <YAxis width={80} yAxisId="right" orientation="right" tick={{ fontSize: 10, }}>
                    <Label
                        value={"Label 2"}
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <Tooltip formatter={(value) => value} />
                <Line yAxisId="left" type="monotone" dataKey={"Data key 1"} />
                <Line yAxisId="right" type="monotone" dataKey={"Data key 2"} />
            </LineChart>
        </ResponsiveContainer>
        
    )
  }