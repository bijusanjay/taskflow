// User
export interface User {
  id: string
  username: string
  password: string
  role: ROLE
  name: string
  avatar: string
}

export const STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  CLOSED: 'closed',
} as const

export type STATUS = (typeof STATUS)[keyof typeof STATUS]

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

export type PRIORITY = (typeof PRIORITY)[keyof typeof PRIORITY]

export const ROLE = {
  DEVELOPER: 'developer',
  MANAGER: 'manager',
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]

export interface Task {
  id: string
  title: string
  description: string
  status: STATUS
  priority: PRIORITY
  createdAt: string
  updatedAt: string
  createdBy: string
  assignedTo: string
  projectId: string
  timeSpent?: number // in milliseconds
}

export interface DailyTaskCount {
  date: string
  count: number
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    username: 'dev1',
    password: 'password123',
    role: 'developer',
    name: 'John Developer',
    avatar: 'https://robohash.org/dev1',
  },
  {
    id: '2',
    username: 'dev2',
    password: 'password123',
    role: 'developer',
    name: 'Jane Coder',
    avatar: 'https://robohash.org/dev2',
  },
  {
    id: '3',
    username: 'manager1',
    password: 'password123',
    role: 'manager',
    name: 'Mike Manager',
    avatar: 'https://robohash.org/manager1',
  },
]

// Mock Tasks
export const tasks: Task[] = [
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
    timeSpent: 7200000, // 2 hours
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
    projectId: '2',
    timeSpent: 3600000, // 1 hour
  },
  {
    id: '3',
    title: 'Implement dark mode',
    description: 'Add dark mode toggle to the settings page',
    status: 'review',
    priority: 'low',
    createdAt: '2025-04-10T15:20:00Z',
    updatedAt: '2025-04-19T11:45:00Z',
    createdBy: '3',
    assignedTo: '2',
    projectId: '2',
    timeSpent: 10800000, // 3 hours
  },
  {
    id: '4',
    title: 'Fix API error handling',
    description: 'Improve error messages for failed API requests',
    status: 'closed',
    priority: 'high',
    createdAt: '2025-04-05T08:15:00Z',
    updatedAt: '2025-04-12T16:30:00Z',
    createdBy: '3',
    assignedTo: '2',
    projectId: '1',
    timeSpent: 5400000, // 1.5 hours
  },
  {
    id: '5',
    title: 'Update dependencies',
    description: 'Update all npm packages to latest versions',
    status: 'open',
    priority: 'critical',
    createdAt: '2025-04-20T13:10:00Z',
    updatedAt: '2025-04-20T13:10:00Z',
    createdBy: '3',
    assignedTo: '1',
    projectId: '1',
    timeSpent: 1800000, // 30 minutes
  },
  {
    id: '6',
    title: 'Fix dependencies',
    description: 'Update all npm packages to latest versions',
    status: 'closed',
    priority: 'low',
    createdAt: '2025-04-20T13:10:00Z',
    updatedAt: '2025-04-20T13:10:00Z',
    createdBy: '3',
    assignedTo: '1',
    projectId: '1',
    timeSpent: 900000, // 15 minutes
  },
  {
    id: '7',
    title: 'Update SSH',
    description: 'Update SSH latest versions',
    status: 'review',
    priority: 'medium',
    createdAt: '2025-04-20T13:10:00Z',
    updatedAt: '2025-04-20T13:10:00Z',
    createdBy: '3',
    assignedTo: '1',
    projectId: '1',
    timeSpent: 2700000, // 45 minutes
  },
]

// Mock daily task counts for trend line
export const dailyTaskCounts: DailyTaskCount[] = [
  { date: '2025-04-17', count: 3 },
  { date: '2025-04-18', count: 4 },
  { date: '2025-04-19', count: 5 },
  { date: '2025-04-20', count: 4 },
  { date: '2025-04-21', count: 3 },
  { date: '2025-04-22', count: 5 },
  { date: '2025-04-23', count: 4 },
]

interface Project {
  id: string
  name: string
  description: string
}

export const projects: Project[] = [
  { id: '1', name: 'TeamX', description: 'Frontend Team' },
  { id: '2', name: 'TeamY', description: 'Backend Team' },
]

export interface Bug {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'pending_approval' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  createdBy: string
  assignedTo: string
  projectId: string
}

export const bugs: Bug[] = [
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
    title: 'API timeout error',
    description: 'API requests timing out after 30 seconds',
    status: 'pending_approval',
    priority: 'high',
    createdAt: '2025-04-18T10:30:00Z',
    updatedAt: '2025-04-19T14:45:00Z',
    createdBy: '1',
    assignedTo: '2',
    projectId: '2',
  },
  {
    id: '4',
    title: 'Mobile responsive issues',
    description: 'Layout breaks on mobile devices',
    status: 'pending_approval',
    priority: 'medium',
    createdAt: '2025-04-17T11:20:00Z',
    updatedAt: '2025-04-18T16:30:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '5',
    title: 'Database connection error',
    description: 'Intermittent database connection failures',
    status: 'closed',
    priority: 'high',
    createdAt: '2025-04-10T09:15:00Z',
    updatedAt: '2025-04-12T11:30:00Z',
    createdBy: '1',
    assignedTo: '2',
    projectId: '2',
  },
  {
    id: '6',
    title: 'Performance optimization needed',
    description: 'Page load time exceeds 5 seconds',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-04-19T14:00:00Z',
    updatedAt: '2025-04-19T14:00:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '7',
    title: 'Security vulnerability',
    description: 'XSS vulnerability in comment section',
    status: 'pending_approval',
    priority: 'high',
    createdAt: '2025-04-15T16:45:00Z',
    updatedAt: '2025-04-16T10:20:00Z',
    createdBy: '1',
    assignedTo: '2',
    projectId: '2',
  },
  {
    id: '8',
    title: 'UI alignment issues',
    description: 'Elements misaligned in Firefox browser',
    status: 'in_progress',
    priority: 'low',
    createdAt: '2025-04-18T13:10:00Z',
    updatedAt: '2025-04-19T09:30:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '1',
  },
  {
    id: '9',
    title: 'Memory leak in dashboard',
    description: 'Memory usage increases over time',
    status: 'closed',
    priority: 'high',
    createdAt: '2025-04-11T10:00:00Z',
    updatedAt: '2025-04-13T15:45:00Z',
    createdBy: '1',
    assignedTo: '2',
    projectId: '2',
  },
  {
    id: '10',
    title: 'Search functionality broken',
    description: 'Search returns incorrect results',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-04-20T09:30:00Z',
    updatedAt: '2025-04-20T09:30:00Z',
    createdBy: '2',
    assignedTo: '1',
    projectId: '1',
  },
]
