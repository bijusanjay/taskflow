'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const DashboardLayout = dynamic(() => import('@features/dashboard/layout'), {
  ssr: false,
})

const DashboardPage = () => {
  return <DashboardLayout />
}

export default DashboardPage
