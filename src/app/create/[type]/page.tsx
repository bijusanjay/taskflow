'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const CreateTaskLayout = dynamic(
  () => import('@features/task-bug/layout/create-task'),
  {
    ssr: false,
  }
)

const CreateTaskLayoutPage = () => {
  return <CreateTaskLayout />
}

export default CreateTaskLayoutPage
