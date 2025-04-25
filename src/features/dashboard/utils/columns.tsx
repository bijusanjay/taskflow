import { Tag } from 'antd'
import Link from 'next/link'
import { priorityColors, statusColors } from '@utils/constants'

export const taskColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: any) => (
      <Link href={`/project/${record.projectId}/tasks/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>
    ),
  },
]

export const bugColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: any) => (
      <Link href={`/project/${record.projectId}/bugs/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: string) => (
      <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
    ),
  },
]
