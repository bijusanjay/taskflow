import React from 'react'
import { Table, Card, Typography } from 'antd'
import { Task, User } from '@config/mock-data'
import { formatTime } from '@utils/helper'

const { Title } = Typography

interface TimeTrackingReportProps {
  tasks: Task[]
  users: User[]
}

const TimeTrackingReport: React.FC<TimeTrackingReportProps> = ({ tasks, users }) => {
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
      render: (record: Task) => (record.timeSpent ? formatTime(record.timeSpent) : '-'),
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
