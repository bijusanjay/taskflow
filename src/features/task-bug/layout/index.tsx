import React, { useMemo, useState } from 'react'
import { Table, Tag, Space, Button, Tabs, Modal } from 'antd'
import {
  BugOutlined,
  ProjectOutlined,
  LinkOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import { Bug, bugs, Task, tasks, User, users } from '@config/mock-data'
import { ProjectHeader } from '../styles'
import { priorityColors, statusColors } from '@utils/constants'
import Link from 'next/link'
import FilterBar from '../components/filter'
import EditModal from '../components/edit-modal'
import { useAuthStore } from '@stores/auth-store'

interface FilterState {
  project: string
  status?: string
  priority?: string
}

const TasksAndBugsLayout: React.FC = () => {
  const { user } = useAuthStore()
  const [filters, setFilters] = useState<FilterState>({
    project: '1',
    status: undefined,
    priority: undefined,
  })

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'task' | 'bug' } | null>(
    null
  )
  const [selectedItem, setSelectedItem] = useState<Task | Bug | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  const activeTab = pathname.split('/')[1] === 'bugs' ? 'bugs' : 'tasks'

  const filteredTasks = useMemo(() => {
    let filtered = tasks

    if (filters.project) {
      filtered = filtered.filter(task => task.projectId === filters.project)
    }

    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status)
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    return filtered
  }, [filters])

  const filteredBugs = useMemo(() => {
    let filtered = bugs

    if (filters.project) {
      filtered = filtered.filter(bug => bug.projectId === filters.project)
    }

    if (filters.status) {
      filtered = filtered.filter(bug => bug.status === filters.status)
    }

    if (filters.priority) {
      filtered = filtered.filter(bug => bug.priority === filters.priority)
    }

    return filtered
  }, [filters])

  const handleItemClick = (type: 'task' | 'bug', id: string, projectId: string) => {
    router.push(`/project/${projectId}/${type}s/${id}`)
  }

  const handleTabChange = (activeKey: string) => {
    router.push(`/${activeKey}`)
  }

  const handleEdit = (record: Task | Bug) => {
    setSelectedItem(record)
    setEditModalVisible(true)
  }

  const handleEditSubmit = (values: any) => {
    // Make an API call to update the item
    console.log('Updating item:', values)
    setEditModalVisible(false)
    setSelectedItem(null)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
    setSelectedItem(null)
  }

  const handleDelete = (id: string, type: 'task' | 'bug') => {
    setItemToDelete({ id, type })
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      // Make an API call to delete the item
      console.log(`Deleting ${itemToDelete.type} with id: ${itemToDelete.id}`)
      setItemToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setItemToDelete(null)
  }

  const taskColumns = useMemo(
    () => [
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
        title: 'Actions',
        key: 'actions',
        width: '10%',
        render: (record: Task) => (
          <Space size="middle">
            <Button
              type="primary"
              size="small"
              onClick={() => handleItemClick('task', record.id, record.projectId)}
            >
              View
            </Button>
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, 'task')}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    []
  )

  const bugColumns = useMemo(
    () => [
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
        width: '10%',
        render: (record: Bug) => (
          <Space size="middle">
            {/* <Button
              type="primary"
              size="small"
              onClick={() => handleItemClick('bug', record.id, record.projectId)}
            >
              View
            </Button> */}
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, 'bug')}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    []
  )

  const handleCreateBtn = (type: string) => {
    router.push(`/create/${type}`)
  }

  return (
    <div>
      <ProjectHeader>
        <div>
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>
        <Space>
          {user.role === 'developer' && (
            <>
              {activeTab === 'bugs' && (
                <Button icon={<BugOutlined />} onClick={() => handleCreateBtn('bug')}>
                  Create Bug
                </Button>
              )}
              {activeTab === 'tasks' && (
                <Button icon={<ProjectOutlined />} onClick={() => handleCreateBtn('task')}>
                  Create Task
                </Button>
              )}
            </>
          )}
        </Space>
      </ProjectHeader>
      {activeTab === 'tasks' && (
        <Table
          dataSource={filteredTasks}
          columns={taskColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
      {activeTab === 'bugs' && (
        <Table
          dataSource={filteredBugs}
          columns={bugColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
      {/* Edit Modal */}
      {editModalVisible && (
        <EditModal
          visible={editModalVisible}
          onCancel={handleEditCancel}
          onSubmit={handleEditSubmit}
          initialValues={selectedItem}
          isTask={activeTab === 'tasks'}
          users={users}
        />
      )}
      {/* Delete Confirmation Modal */}
      {!!itemToDelete && (
        <Modal
          title="Confirm Delete"
          open={!!itemToDelete}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>
            Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  )
}

export default TasksAndBugsLayout
