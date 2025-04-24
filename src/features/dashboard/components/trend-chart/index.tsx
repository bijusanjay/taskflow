import { DailyTaskCount } from "@config/mock-data"
import { Card, Tooltip } from "antd"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import styled from "styled-components"

const ChartCard = styled(Card)`
  margin-bottom: 24px;
`

interface TrenChartprops{
    trendData:DailyTaskCount[]
}

const TrendChart: React.FC<TrenChartprops> = ({trendData}) => {
    return(
    <ChartCard title='Daily Concurrent Tasks'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                data={trendData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='#1890ff'
                  activeDot={{r: 8}}
                  name='Active Tasks'
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
    )
}

export default TrendChart