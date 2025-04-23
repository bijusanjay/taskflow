// // src/app/dashboard/page.tsx
// 'use client'

// import {useState, useEffect} from 'react'
// import {Row, Col, Card, Statistic, Table, Spin, Alert, Typography} from 'antd'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'
// import {
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   ExclamationCircleOutlined,
// } from '@ant-design/icons'
// import styled from 'styled-components'
// import {useAuthStore} from '@stores/auth-store'
// import useFetch from '@hooks/use-fetch'
// import useAppStore from '@stores/app-store'
// import Loader from '@components/ui/loader'

// const {Title} = Typography

// const ChartCard = styled(Card)`
//   margin-bottom: 24px;
// `

// export default function Dashboard() {
//   const {user} = useAuthStore()
//   const {apiInstance} = useAppStore()
//   const isDeveloper = user?.role === 'developer'

//   // Fetch appropriate tasks based on user role
//   const {
//     data: tasksData,
//     loading: tasksLoading,
//     error: tasksError,
//   } = useFetch(
//     isDeveloper
//       ? apiInstance.client.dashboardApi.getUserTasks
//       : apiInstance.client.dashboardApi.getAllTasks,
//     isDeveloper ? user?.id : undefined
//   )

//   // Fetch trend data
//   const {
//     data: trendData,
//     loading: trendLoading,
//     error: trendError,
//   } = useFetch(apiInstance.client.dashboardApi.getDailyTaskCounts)

//   // Calculate stats from tasks
//   const stats = {
//     open: tasksData?.filter((task) => task.status === 'open').length || 0,
//     inProgress:
//       tasksData?.filter((task) => task.status === 'in_progress').length || 0,
//     review: tasksData?.filter((task) => task.status === 'review').length || 0,
//     closed: tasksData?.filter((task) => task.status === 'closed').length || 0,
//     total: tasksData?.length || 0,
//   }

//   // Tasks table columns
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       width: 60,
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status: string) => {
//         switch (status) {
//           case 'open':
//             return <span style={{color: '#ff4d4f'}}>Open</span>
//           case 'in_progress':
//             return <span style={{color: '#faad14'}}>In Progress</span>
//           case 'review':
//             return <span style={{color: '#1890ff'}}>Review</span>
//           case 'closed':
//             return <span style={{color: '#52c41a'}}>Closed</span>
//           default:
//             return status
//         }
//       },
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//       render: (priority: string) => {
//         switch (priority) {
//           case 'critical':
//             return (
//               <span style={{color: '#f5222d', fontWeight: 'bold'}}>
//                 Critical
//               </span>
//             )
//           case 'high':
//             return <span style={{color: '#fa541c'}}>High</span>
//           case 'medium':
//             return <span style={{color: '#faad14'}}>Medium</span>
//           case 'low':
//             return <span style={{color: '#52c41a'}}>Low</span>
//           default:
//             return priority
//         }
//       },
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date: string) => new Date(date).toLocaleDateString(),
//     },
//   ]

//   if (tasksLoading || trendLoading) {
//     return <Loader />
//   }

//   if (tasksError || trendError) {
//     return <Alert type='error' message={tasksError || trendError} />
//   }

//   return (
//     <div>
//       <Title level={3}>Dashboard Overview</Title>

//       {/* Stats Cards */}
//       <Row gutter={16} style={{marginBottom: 24}}>
//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title='Open Tasks'
//               value={stats.open}
//               valueStyle={{color: '#ff4d4f'}}
//               prefix={<ExclamationCircleOutlined />}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title='In Progress'
//               value={stats.inProgress}
//               valueStyle={{color: '#faad14'}}
//               prefix={<ClockCircleOutlined />}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title='In Review'
//               value={stats.review}
//               valueStyle={{color: '#1890ff'}}
//               prefix={<ClockCircleOutlined />}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title='Closed Tasks'
//               value={stats.closed}
//               valueStyle={{color: '#52c41a'}}
//               prefix={<CheckCircleOutlined />}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Trend Chart */}
//       <ChartCard title='Daily Concurrent Tasks'>
//         <ResponsiveContainer width='100%' height={300}>
//           <LineChart
//             data={trendData}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray='3 3' />
//             <XAxis dataKey='date' />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type='monotone'
//               dataKey='count'
//               stroke='#1890ff'
//               activeDot={{r: 8}}
//               name='Active Tasks'
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* Recent Tasks Table */}
//       <Card title='Recent Tasks'>
//         <Table
//           dataSource={tasksData}
//           columns={columns}
//           rowKey='id'
//           pagination={{pageSize: 5}}
//         />
//       </Card>
//     </div>
//   )
// }
import React, {useState, useEffect} from 'react'
import {
  Layout,
  Menu,
  Table,
  Tag,
  Space,
  Button,
  Typography,
  Tabs,
  Select,
} from 'antd'
import {
  DashboardOutlined,
  BugOutlined,
  ProjectOutlined,
  UserOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import {useRouter} from 'next/navigation'
import {users} from '@config/mock-data'

const {Header, Sider, Content} = Layout
const {Title} = Typography
const {TabPane} = Tabs

// Types
interface Task {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  createdBy: string
  assignedTo: string
  projectId: string
}

interface Bug {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  createdBy: string
  assignedTo: string
  projectId: string
}

interface Project {
  id: string
  name: string
  description: string
}

interface User {
  id: string
  name: string
  role: 'manager' | 'developer'
}

// Sample data
const projects: Project[] = [
  {id: '1', name: 'TeamX', description: 'Frontend Team'},
  {id: '2', name: 'TeamY', description: 'Backend Team'},
]

const tasks: Task[] = [
  {
    id: '1',
    title: 'Fix login button',
    description: 'The login button is not working properly on the mobile view',
    status: 'open',
    priority: 'high',
    createdAt: '2025-04-15T10:00:00Z',
    updatedAt: '2025-04-15T10:00:00Z',
    createdBy: '3',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Add form validation',
    description: 'The registration form needs email validation',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2025-04-16T09:00:00Z',
    updatedAt: '2025-04-17T14:30:00Z',
    createdBy: '3',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '3',
    title: 'Create user profile page',
    description: 'Design and implement user profile section',
    status: 'open',
    priority: 'low',
    createdAt: '2025-04-18T11:00:00Z',
    updatedAt: '2025-04-18T11:00:00Z',
    createdBy: '3',
    assignedTo: '2',
    projectId: '2',
  },
]

const bugs: Bug[] = [
  {
    id: '1',
    title: 'Login page crashes',
    description: 'The app crashes when wrong credentials are entered',
    status: 'open',
    priority: 'high',
    createdAt: '2025-04-14T15:00:00Z',
    updatedAt: '2025-04-14T15:00:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Images not loading',
    description: 'Product images not loading in the product page',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2025-04-16T13:20:00Z',
    updatedAt: '2025-04-17T09:15:00Z',
    createdBy: '1',
    assignedTo: '2',
    projectId: '1',
  },
  {
    id: '3',
    title: 'API timeout',
    description: 'The payment API times out after 30 seconds',
    status: 'closed',
    priority: 'high',
    createdAt: '2025-04-10T10:30:00Z',
    updatedAt: '2025-04-12T16:45:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '2',
  },
]

// const users: User[] = [
//   {id: '1', name: 'John Doe', role: 'developer'},
//   {id: '2', name: 'Jane Smith', role: 'developer'},
//   {id: '3', name: 'Robert Johnson', role: 'manager'},
// ]

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const StyledTabs = styled(Tabs)`
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`

const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`

// Status and priority color mapping
const statusColors = {
  open: 'blue',
  in_progress: 'orange',
  closed: 'green',
}

const priorityColors = {
  low: 'green',
  medium: 'orange',
  high: 'red',
}

const Dashboard: React.FC = () => {
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

  const taskColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
  ]

  const bugColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
  ]

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

export default Dashboard
