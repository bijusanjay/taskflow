// src/app/dashboard/page.tsx
'use client'

import {useState, useEffect} from 'react'
import {Row, Col, Card, Statistic, Table, Spin, Alert, Typography} from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import {useAuthStore} from '@stores/auth-store'
import useFetch from '@hooks/use-fetch'
import useAppStore from '@stores/app-store'
import Loader from '@components/ui/loader'

const {Title} = Typography

const ChartCard = styled(Card)`
  margin-bottom: 24px;
`

export default function Dashboard() {
  const {user} = useAuthStore()
  const {apiInstance} = useAppStore()
  const isDeveloper = user?.role === 'developer'

  // Fetch appropriate tasks based on user role
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch(
    isDeveloper
      ? apiInstance.client.dashboardApi.getUserTasks
      : apiInstance.client.dashboardApi.getAllTasks,
    isDeveloper ? user?.id : undefined
  )

  // Fetch trend data
  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
  } = useFetch(apiInstance.client.dashboardApi.getDailyTaskCounts)

  // Calculate stats from tasks
  const stats = {
    open: tasksData?.filter((task) => task.status === 'open').length || 0,
    inProgress:
      tasksData?.filter((task) => task.status === 'in_progress').length || 0,
    review: tasksData?.filter((task) => task.status === 'review').length || 0,
    closed: tasksData?.filter((task) => task.status === 'closed').length || 0,
    total: tasksData?.length || 0,
  }

  // Tasks table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        switch (status) {
          case 'open':
            return <span style={{color: '#ff4d4f'}}>Open</span>
          case 'in_progress':
            return <span style={{color: '#faad14'}}>In Progress</span>
          case 'review':
            return <span style={{color: '#1890ff'}}>Review</span>
          case 'closed':
            return <span style={{color: '#52c41a'}}>Closed</span>
          default:
            return status
        }
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        switch (priority) {
          case 'critical':
            return (
              <span style={{color: '#f5222d', fontWeight: 'bold'}}>
                Critical
              </span>
            )
          case 'high':
            return <span style={{color: '#fa541c'}}>High</span>
          case 'medium':
            return <span style={{color: '#faad14'}}>Medium</span>
          case 'low':
            return <span style={{color: '#52c41a'}}>Low</span>
          default:
            return priority
        }
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  if (tasksLoading || trendLoading) {
    return <Loader />
  }

  if (tasksError || trendError) {
    return <Alert type='error' message={tasksError || trendError} />
  }

  return (
    <div>
      <Title level={3}>Dashboard Overview</Title>

      {/* Stats Cards */}
      <Row gutter={16} style={{marginBottom: 24}}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Open Tasks'
              value={stats.open}
              valueStyle={{color: '#ff4d4f'}}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='In Progress'
              value={stats.inProgress}
              valueStyle={{color: '#faad14'}}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='In Review'
              value={stats.review}
              valueStyle={{color: '#1890ff'}}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Closed Tasks'
              value={stats.closed}
              valueStyle={{color: '#52c41a'}}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Trend Chart */}
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

      {/* Recent Tasks Table */}
      <Card title='Recent Tasks'>
        <Table
          dataSource={tasksData}
          columns={columns}
          rowKey='id'
          pagination={{pageSize: 5}}
        />
      </Card>
    </div>
  )
}
