'use client'

import {Card, Table, Alert} from 'antd'
import {
  LinkOutlined,
} from '@ant-design/icons'
import {useAuthStore} from '@stores/auth-store'
import useFetch from '@hooks/use-fetch'
import useAppStore from '@stores/app-store'
import Loader from '@components/ui/loader'
import Link from 'next/link'
import { Task } from '@config/mock-data'
import TrendChart from '../components/trend-chart'
import StatsCard from '../components/stats-card'
import { Fragment, useMemo } from 'react'

export default function Dashboard() {
  const {user} = useAuthStore()
  const {apiInstance} = useAppStore()
  const isDeveloper = user?.role === 'developer'

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

  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
  } = useFetch(apiInstance.client.dashboardApi.getDailyTaskCounts)  

  const columns = useMemo(()=> [
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
      render: (text: string, record: Task) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              href={`/project/${record.projectId}/tasks/${record.id}`}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >             
              <span>{text}</span>
              <div style={{marginLeft: '8px'}}>
              <LinkOutlined/>
              </div>
            </Link>
          </div>
        );
      }
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
  ],[])

  if (tasksLoading || trendLoading) {
    return <Loader />
  }

  if (tasksError || trendError) {
    return <Alert type='error' message={tasksError || trendError} />
  }

  return (
    <Fragment>
      {/* Stats Cards */}
      <StatsCard tasksData={tasksData}/>     

      {/* Trend Chart */}
      <TrendChart trendData={trendData}/>      

      {/* Recent Tasks Table */}
      <Card title='Recent Tasks'>
        <Table
          dataSource={tasksData}
          columns={columns}
          rowKey='id'
          pagination={{pageSize: 5}}
        />
      </Card>
    </Fragment>
  )
}
