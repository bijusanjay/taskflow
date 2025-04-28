export const FORM_TYPE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const

export const COLORS = {
  green: '#0AAB76',
  red: '#D92D20',
  white: '#FFFFFF',
  grayLight1: '#D0D5DD',
  grayLight2: '#C7C7C7',
  grayDark: '#D0D5DD',
  black: '#101828',
} as const

export const statusColors = {
  open: 'blue',
  in_progress: 'orange',
  closed: 'green',
  pending_approval: 'red',
} as const

export const priorityColors = {
  low: 'green',
  medium: 'orange',
  high: 'red',
} as const

export const PUBLIC_ROUTES = ['/', '/products']
export const LOGIN_ROUTES = ['/login']

export const features = [
  {
    title: 'Task Management',
    description:
      'Efficiently manage and track tasks with our intuitive interface. Assign tasks, set priorities, and monitor progress in real-time.',
  },
  {
    title: 'Time Tracking',
    description:
      'Track time spent on tasks with our built-in timer. Get detailed insights into how time is being utilized across projects.',
  },
  {
    title: 'Team Collaboration',
    description:
      'Enhance team collaboration with real-time updates, task assignments, and progress tracking. Keep everyone on the same page.',
  },
]
