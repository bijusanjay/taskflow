'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const TaskLayout = dynamic(() => import('@features/task-bug/layout'), {
  ssr: false,
})

const TaskLayoutPage = () => {
  return <TaskLayout />
}

export default TaskLayoutPage
