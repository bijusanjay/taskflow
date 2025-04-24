'use client'

import { Card, Table, Alert } from 'antd'
import { useAuthStore } from '@stores/auth-store'
import useFetch from '@hooks/use-fetch'
import useAppStore from '@stores/app-store'
import Loader from '@components/ui/loader'
import TrendChart from '../components/trend-chart'
import StatsCard from '../components/stats-card'
import { useMemo, useEffect } from 'react'
import { taskColumns, bugColumns } from '../components/columns'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { apiInstance } = useAppStore()
  const isDeveloper = user?.role === 'developer'
  const isManager = user?.role === 'manager'

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
    data: bugsData,
    loading: bugsLoading,
    error: bugsError,
  } = useFetch(
    isManager
      ? apiInstance.client.dashboardApi.getAllBugs
      : apiInstance.client.dashboardApi.getUserBugs,
    !isManager ? user?.id : undefined
  )

  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
  } = useFetch(apiInstance.client.dashboardApi.getDailyTaskCounts)

  const stats = useMemo(() => {
    if (!tasksData) return []

    const totalTasks = tasksData.length
    const openTasks = tasksData.filter(task => task.status === 'open').length
    const inProgressTasks = tasksData.filter(task => task.status === 'in_progress').length
    const closedTasks = tasksData.filter(task => task.status === 'closed').length

    return [
      { title: 'Total Tasks', value: totalTasks, color: '#1890ff' },
      { title: 'Open Tasks', value: openTasks, color: '#faad14' },
      { title: 'In Progress', value: inProgressTasks, color: '#52c41a' },
      { title: 'Closed Tasks', value: closedTasks, color: '#722ed1' },
    ]
  }, [tasksData])

  const bugStats = useMemo(() => {
    if (!bugsData) return []

    const totalBugs = bugsData.length
    const openBugs = bugsData.filter(bug => bug.status === 'open').length
    const pendingBugs = bugsData.filter(bug => bug.status === 'pending_approval').length
    const closedBugs = bugsData.filter(bug => bug.status === 'closed').length

    return [
      { title: 'Total Bugs', value: totalBugs, color: '#ff4d4f' },
      { title: 'Open Bugs', value: openBugs, color: '#faad14' },
      { title: 'Pending Approval', value: pendingBugs, color: '#1890ff' },
      { title: 'Closed Bugs', value: closedBugs, color: '#52c41a' },
    ]
  }, [bugsData])

  useEffect(() => {
    console.log('Dashboard bugsData:', bugsData)
  }, [bugsData])

  if (tasksLoading || trendLoading || bugsLoading) {
    return <Loader />
  }

  if (tasksError || trendError || bugsError) {
    return <Alert message="Error loading dashboard data" type="error" />
  }

  return (
    <div className="p-6">
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard tasksData={tasksData} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Task Trend">
          <TrendChart trendData={trendData} />
        </Card>
        {/* {isManager && bugsData && (
          <Card title="Bug Status Distribution">
            <BugDistributionChart bugs={bugsData} />
          </Card>
        )} */}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div style={{ marginTop: '20px' }}>
          <Card title="Recent Tasks">
            <Table dataSource={tasksData?.slice(0, 5)} columns={taskColumns} pagination={false} />
          </Card>
        </div>

        <div style={{ marginTop: '20px' }}>
          {isManager && (
            <Card title="Pending Bug Approvals">
              <Table
                dataSource={bugsData?.filter(bug => bug.status === 'pending_approval').slice(0, 5)}
                columns={bugColumns}
                pagination={false}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
