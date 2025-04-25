'use client'

import React from 'react'
import { Card, Table, Alert } from 'antd'
import { useAuthStore } from '@stores/auth-store'
import useFetch from '@hooks/use-fetch'
import useAppStore from '@stores/app-store'
import Loader from '@components/ui/loader'
import TrendChart from '../components/trend-chart'
import StatsCard from '../components/stats-card'
import TimeTrackingReport from '@features/task-bug/components/time-tracking-report'
import { tasks, users } from '@config/mock-data'
import { getTaskColumns, getBugColumns } from '@features/task-bug/utils/columns'

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

  const taskColumns = getTaskColumns({
    users,
    user,
    handleEdit: () => {},
    handleDelete: () => {},
    handleMarkForReview: () => {},
  })

  const bugColumns = getBugColumns({
    users,
    user,
    handleEdit: () => {},
    handleDelete: () => {},
    handleBugApproval: () => {},
    setSelectedItem: () => {},
    setEditModalVisible: () => {},
    handleMarkForReview: () => {},
  })

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
        {isManager && (
          <div style={{ marginTop: '20px' }}>
            <TimeTrackingReport tasks={tasks} users={users} />
          </div>
        )}
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
                columns={bugColumns as any}
                pagination={false}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
