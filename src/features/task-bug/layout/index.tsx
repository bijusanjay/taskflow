import React, { useMemo, useState } from 'react'
import { Table, Space, Button, Modal } from 'antd'
import { BugOutlined, ProjectOutlined } from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import { Bug, bugs, Task, tasks, users } from '@config/mock-data'
import { ProjectHeader } from '../styles'
import FilterBar from '../components/filter'
import EditModal from '../components/edit-modal'
import TimeTracker from '../components/time-tracker'
import { useAuthStore } from '@stores/auth-store'
import { getTaskColumns, getBugColumns } from '../utils/columns'

interface FilterState {
  project: string
  status?: string
  priority?: string
}

interface ApprovalState {
  bug: Bug
  approved: boolean
}

interface ReviewState {
  item: Task | Bug
  type: 'task' | 'bug'
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
  const [itemToApprove, setItemToApprove] = useState<ApprovalState | null>(null)
  const [itemToReview, setItemToReview] = useState<ReviewState | null>(null)
  const [selectedItem, setSelectedItem] = useState<Task | Bug | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  const activeTab = pathname.split('/')[1] === 'bugs' ? 'bugs' : 'tasks'

  const filteredTasks = useMemo(() => {
    let filtered =
      user.role === 'developer' ? tasks.filter(task => task.assignedTo === user.id) : tasks

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
    let filtered = user.role === 'developer' ? bugs.filter(bug => bug.assignedTo === user.id) : bugs

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

  const handleBugApproval = (record: Bug, approved: boolean) => {
    setItemToApprove({ bug: record, approved })
  }

  const handleApprovalConfirm = () => {
    if (itemToApprove) {
      // Make an API call to update the bug status
      console.log(`Bug ${itemToApprove.bug.id} ${itemToApprove.approved ? 'approved' : 'rejected'}`)
      setItemToApprove(null)
    }
  }

  const handleApprovalCancel = () => {
    setItemToApprove(null)
  }

  const handleMarkForReview = (record: Task | Bug, type: 'task' | 'bug') => {
    setItemToReview({ item: record, type })
  }

  const handleReviewConfirm = () => {
    if (itemToReview) {
      // Make an API call to update the status
      console.log(`Marking ${itemToReview.type} for review:`, itemToReview.item.id)
      Modal.success({
        title: 'Success',
        content: `"${itemToReview.item.title}" has been marked for review.`,
      })
      setItemToReview(null)
    }
  }

  const handleReviewCancel = () => {
    setItemToReview(null)
  }

  const taskColumns = useMemo(
    () =>
      getTaskColumns({
        users,
        user,
        handleEdit,
        handleDelete,
        handleMarkForReview: record => handleMarkForReview(record, 'task'),
      }),
    [user, users, handleEdit, handleDelete, handleMarkForReview]
  )

  const bugColumns = useMemo(
    () =>
      getBugColumns({
        users,
        user,
        handleEdit,
        handleDelete,
        handleBugApproval,
        setSelectedItem,
        setEditModalVisible,
        handleMarkForReview: record => handleMarkForReview(record, 'bug'),
      }),
    [
      user,
      users,
      handleEdit,
      handleDelete,
      handleBugApproval,
      setSelectedItem,
      setEditModalVisible,
      handleMarkForReview,
    ]
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
              {activeTab === 'tasks' && (
                <>
                  <TimeTracker tasks={tasks} currentProjectId={filters.project} />
                  <Button icon={<ProjectOutlined />} onClick={() => handleCreateBtn('task')}>
                    Create Task
                  </Button>
                </>
              )}
              {activeTab === 'bugs' && (
                <Button icon={<BugOutlined />} onClick={() => handleCreateBtn('bug')}>
                  Create Bug
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
          columns={bugColumns as any}
          rowKey="id"
          pagination={{ pageSize: 10 }}
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

      {/* Approval Confirmation Modal */}
      {!!itemToApprove && (
        <Modal
          title={`Confirm ${itemToApprove.approved ? 'Approval' : 'Rejection'}`}
          open={!!itemToApprove}
          onOk={handleApprovalConfirm}
          onCancel={handleApprovalCancel}
          okText={itemToApprove.approved ? 'Approve' : 'Reject'}
          cancelText="Cancel"
          okButtonProps={{
            type: 'primary',
            style: {
              background: itemToApprove.approved ? '#52c41a' : '#ff4d4f',
              borderColor: itemToApprove.approved ? '#52c41a' : '#ff4d4f',
            },
          }}
        >
          <p>
            Are you sure you want to {itemToApprove.approved ? 'approve' : 'reject'} this bug? This
            action cannot be undone.
          </p>
        </Modal>
      )}

      {/* Review Confirmation Modal */}
      {!!itemToReview && (
        <Modal
          title="Mark for Review"
          open={!!itemToReview}
          onOk={handleReviewConfirm}
          onCancel={handleReviewCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to mark "{itemToReview.item.title}" for review?</p>
        </Modal>
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
    </div>
  )
}

export default TasksAndBugsLayout
