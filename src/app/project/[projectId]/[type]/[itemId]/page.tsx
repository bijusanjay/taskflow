'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const TaskDetailLayout = dynamic(() => import('@features/task-bug/components/task-detail'), {
  ssr: false,
})

const TaskDetailLayoutPage = () => {
  return <TaskDetailLayout />
}

export default TaskDetailLayoutPage
