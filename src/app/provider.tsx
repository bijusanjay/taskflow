'use client'
import '@/styles/globals.css'
import React, { useState } from 'react'
// import {AppWrapper} from '@/components/app-context'
import 'antd/dist/reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryConfig } from '@lib/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default AppProvider
