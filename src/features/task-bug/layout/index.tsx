import React, {useMemo, useState} from 'react'
import { Table, Tag, Space, Button, Typography, Tabs, Select} from 'antd'
import {BugOutlined, ProjectOutlined, FilterOutlined, LinkOutlined} from '@ant-design/icons'
import {useRouter} from 'next/navigation'
import {Bug, bugs, projects, Task, tasks, User, users} from '@config/mock-data'
import { ProjectHeader, StyledTabs } from '../styles'
import { priorityColors, statusColors } from '@utils/constants'
import Link from 'next/link'

const {Title} = Typography
const {TabPane} = Tabs

const TasksAndBugsLayout: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('1')
  const router = useRouter()
  const currentUser: User = users[0]

  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.projectId === selectedProject)
    : tasks

  const filteredBugs = selectedProject
    ? bugs.filter((bug) => bug.projectId === selectedProject)
    : bugs

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
  }

  const handleItemClick = (
    type: 'task' | 'bug',
    id: string,
    projectId: string
  ) => {
    router.push(`/project/${projectId}/${type}s/${id}`)
  }

  const taskColumns = useMemo(()=> [
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
      render: (status: 'open' | 'in_progress' | 'closed') => (
        <Tag color={statusColors[status]}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
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
        const assignee = users.find((user) => user.id === record.assignedTo)
        return assignee?.name || 'Unassigned'
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Task) => (
        <Space size='middle'>
          <Button
            type='primary'
            size='small'
            onClick={() => handleItemClick('task', record.id, record.projectId)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ],[])

  const bugColumns = useMemo(()=> [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              href={`/project/${record.projectId}/bugs/${record.id}`}
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
      render: (status: 'open' | 'in_progress' | 'closed') => (
        <Tag color={statusColors[status]}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
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
        const assignee = users.find((user) => user.id === record.assignedTo)
        return assignee?.name || 'Unassigned'
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Bug) => (
        <Space size='middle'>
          <Button
            type='primary'
            size='small'
            onClick={() => handleItemClick('bug', record.id, record.projectId)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ],[])

  const handleCreateBtn = (type: string) => {
    router.push(`/create/${type}`)
  }

  return (
    <div>
      <ProjectHeader>
        <div>
          {/* {selectedProject && (
          )} */}
          <Title level={5} style={{margin: 0}}>
            <Select
              value={selectedProject}
              onChange={(value) => handleProjectSelect(value)}
              style={{minWidth: 200}}
              dropdownStyle={{minWidth: 200}}
              placeholder='Select Team'
            >
              {projects.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Title>
        </div>
        <Space>
          {currentUser.role === 'developer' && (
            <>
              <Button
                type='primary'
                icon={<BugOutlined />}
                onClick={() => handleCreateBtn('bug')}
              >
                Create Bug
              </Button>
              <Button
                icon={<ProjectOutlined />}
                onClick={() => handleCreateBtn('task')}
              >
                Create Task
              </Button>
            </>
          )}
          <Button icon={<FilterOutlined />}>Filter</Button>
        </Space>
      </ProjectHeader>

      <StyledTabs defaultActiveKey='tasks'>
        <TabPane tab='Tasks' key='tasks'>
          <Table
            dataSource={filteredTasks}
            columns={taskColumns}
            rowKey='id'
            pagination={{pageSize: 10}}
          />
        </TabPane>
        <TabPane tab='Bugs' key='bugs'>
          <Table
            dataSource={filteredBugs}
            columns={bugColumns}
            rowKey='id'
            pagination={{pageSize: 10}}
          />
        </TabPane>
      </StyledTabs>
    </div>
  )
}

export default TasksAndBugsLayout
