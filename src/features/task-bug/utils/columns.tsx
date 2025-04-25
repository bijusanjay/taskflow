import { Button, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
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
}

export const getTaskColumns = ({ users, user, handleEdit, handleDelete }: ColumnProps) => [
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
  ...(user.role === 'developer'
    ? [
        {
          title: 'Actions',
          key: 'actions',
          width: '10%',
          render: (record: Task) => (
            <Space size="middle">
              <Button
                type="default"
                size="middle"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              ></Button>
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
}: ColumnProps) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: Task) => {
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
    render: (record: Bug) => {
      const assignee = users.find(user => user.id === record.assignedTo)
      return assignee?.name || 'Unassigned'
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '15%',
    render: (record: Bug) => (
      <Space size="middle">
        {user.role === 'developer' && (
          <>
            <Button
              type="default"
              size="middle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            ></Button>
            <Button
              type="primary"
              danger
              size="middle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, 'bug')}
            ></Button>
            {record.status === 'in_progress' && (
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  setSelectedItem?.(record)
                  setEditModalVisible?.(true)
                }}
              >
                Mark for Review
              </Button>
            )}
          </>
        )}
        {user.role === 'manager' && record.status === 'pending_approval' && (
          <>
            <Button
              style={{ background: '#52c41a' }}
              type="primary"
              size="middle"
              onClick={() => handleBugApproval?.(record, true)}
            >
              Approve
            </Button>
            <Button
              style={{ background: '#8c8c8c' }}
              type="primary"
              danger
              size="middle"
              onClick={() => handleBugApproval?.(record, false)}
            >
              Reject
            </Button>
          </>
        )}
      </Space>
    ),
  },
]
