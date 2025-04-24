'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const BugsLayout = dynamic(() => import('@features/task-bug/layout'), {
  ssr: false,
})

const BugsLayoutPage = () => {
  return <BugsLayout />
}

export default BugsLayoutPage
