import React from 'react'
import { Table, Card, Typography } from 'antd'
import { useTimeTrackerStore } from '@stores/time-tracker-store'
import { Task, User } from '@config/mock-data'

const { Title } = Typography

interface TimeTrackingReportProps {
  tasks: Task[]
  users: User[]
}

const TimeTrackingReport: React.FC<TimeTrackingReportProps> = ({ tasks, users }) => {
  const { timeEntries, getTotalTimeForTask } = useTimeTrackerStore()

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  }

  const columns = [
    {
      title: 'Task',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (userId: string) => users.find(user => user.id === userId)?.name || 'Unassigned',
    },
    {
      title: 'Total Time Spent',
      key: 'totalTime',
      render: (record: Task) => formatTime(getTotalTimeForTask(record.id)),
    },
  ]

  return (
    <Card>
      <Title level={4}>Time Tracking Report</Title>
      <Table dataSource={tasks} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
    </Card>
  )
}

export default TimeTrackingReport
