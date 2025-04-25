import { DailyTaskCount } from '@config/mock-data'
import { Card, Tooltip } from 'antd'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts'
import styled from 'styled-components'

const ChartCard = styled(Card)`
  margin-bottom: 24px;
`

interface TrendChartProps {
  trendData: DailyTaskCount[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Date:</strong> {label}
        </p>
        <p style={{ margin: '0' }}>
          <strong>Active Tasks:</strong> {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData }) => {
  return (
    <ChartCard title="Daily Concurrent Tasks">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={trendData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={value => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: 'Number of Tasks',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12 },
            }}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1890ff"
            activeDot={{ r: 8 }}
            name="Active Tasks"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default TrendChart
