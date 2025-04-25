'use client'

import { Fragment, useEffect } from 'react'
import { Layout } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@stores/auth-store'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Loader from '@components/ui/loader'
import Header from '../header'
import Sidebar from '../sidebar'
import { StyledContent } from './styles'
import { LOGIN_ROUTES, PUBLIC_ROUTES } from '@utils/constants'
import ErrorBoundary from '@components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setUserData } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route)
  const isLoginRoute = LOGIN_ROUTES.includes(pathname)

  useEffect(() => {
    // Skip auth check on public routes
    if (isPublicRoute) return

    const stored = localStorage.getItem('auth-storage')
    const parsed = stored ? JSON.parse(stored) : null
    const storedUser = parsed?.state?.user
    const authenticated = parsed?.state?.isAuthenticated

    if (isLoginRoute && authenticated && storedUser) {
      router.push('/dashboard')
      return
    }

    if (authenticated && storedUser) {
      setUserData(storedUser)
    } else {
      router.push('/login')
    }
  }, [pathname, isPublicRoute, isLoginRoute, router, setUserData])

  // Allow public and login routes to render without Layout
  if (isPublicRoute || isLoginRoute) {
    return (
      <ErrorBoundary>
        <Fragment>{children}</Fragment>
      </ErrorBoundary>
    )
  }

  if (!isAuthenticated) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <div className={inter.className}>
        <Head>
          <title>Taskflow – Smarter bug tracking</title>
        </Head>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout style={{ marginLeft: 250 }}>
            <Header />
            <StyledContent>{children}</StyledContent>
          </Layout>
        </Layout>
      </div>
    </ErrorBoundary>
  )
}

export default RootLayout
