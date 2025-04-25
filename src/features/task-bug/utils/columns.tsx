import { Button, Space, Tag, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined, ClockCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Bug, Task, User } from '@config/mock-data'
import { priorityColors, statusColors } from '@utils/constants'

interface ColumnProps {
  users: User[]
  user: User
  handleEdit: (record: Task | Bug) => void
  handleDelete: (id: string, type: 'task' | 'bug') => void
  handleBugApproval?: (record: Bug, approved: boolean) => void
  setSelectedItem?: (item: Bug | null) => void
  setEditModalVisible?: (visible: boolean) => void
  handleMarkForReview: (record: Task | Bug) => void
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
}

export const getTaskColumns = ({
  users,
  user,
  handleEdit,
  handleDelete,
  handleMarkForReview,
}: ColumnProps) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: Task) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/project/${record.projectId}/tasks/${record.id}`}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <span>{text}</span>
            <div style={{ marginLeft: '8px' }}>
              <LinkOutlined />
            </div>
          </Link>
        </div>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: 'open' | 'in_progress' | 'closed') => (
      <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: 'low' | 'medium' | 'high') => (
      <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Assigned To',
    key: 'assignedTo',
    render: (record: Task) => {
      const assignee = users.find(user => user.id === record.assignedTo)
      return assignee?.name || 'Unassigned'
    },
  },
  {
    title: 'Time Spent',
    key: 'timeSpent',
    render: (record: Task) => {
      if (!record.timeSpent) return '-'
      return (
        <Space>
          <ClockCircleOutlined />
          <span>{formatTime(record.timeSpent)}</span>
        </Space>
      )
    },
  },
  // ...(user.role === 'developer'
  //   ? [
  //       {
  //         title: 'Mark for Review',
  //         key: 'markForReview',
  //         render: (record: Task) => {
  //           if (record.status === 'in_progress') {
  //             return (
  //               <Button type="default" onClick={() => handleMarkForReview(record)}>
  //                 Mark for Review
  //               </Button>
  //             )
  //           }
  //           return null
  //         },
  //       },
  //     ]
  //   : []),
  ...(user.role === 'developer'
    ? [
        {
          title: 'Actions',
          key: 'actions',
          width: '10%',
          render: (record: Task) => (
            <Space size="middle">
              <Button
                type="primary"
                danger
                size="middle"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id, 'task')}
              ></Button>
            </Space>
          ),
        },
      ]
    : []),
]

export const getBugColumns = ({
  users,
  user,
  handleEdit,
  handleDelete,
  handleBugApproval,
  setSelectedItem,
  setEditModalVisible,
  handleMarkForReview,
}: ColumnProps) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: Bug) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/project/${record.projectId}/bugs/${record.id}`}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <span>{text}</span>
            <div style={{ marginLeft: '8px' }}>
              <LinkOutlined />
            </div>
          </Link>
        </div>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: 'open' | 'in_progress' | 'closed' | 'pending_approval') => (
      <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: 'low' | 'medium' | 'high') => (
      <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Assigned To',
    key: 'assignedTo',
    render: (record: Bug) => {
      const assignee = users.find(user => user.id === record.assignedTo)
      return assignee?.name || 'Unassigned'
    },
  },
  ...(user.role === 'developer'
    ? [
        {
          title: 'Mark for Review',
          key: 'markForReview',
          render: (record: Bug) => {
            if (record.status === 'in_progress') {
              return (
                <Button type="default" onClick={() => handleMarkForReview(record)}>
                  Mark for Review
                </Button>
              )
            }
            return null
          },
        },
      ]
    : []),
  {
    title: 'Actions',
    key: 'actions',
    render: (record: Bug) => (
      <Space size="middle">
        {user.role === 'developer' && (
          <Button
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, 'bug')}
          ></Button>
        )}
        {user.role === 'manager' && record.status === 'pending_approval' && (
          <>
            <Button
              type="primary"
              style={{ background: '#52c41a', borderColor: '#52c41a' }}
              onClick={() => handleBugApproval?.(record, true)}
            >
              Approve
            </Button>
            <Button type="primary" danger onClick={() => handleBugApproval?.(record, false)}>
              Reject
            </Button>
          </>
        )}
      </Space>
    ),
  },
]
