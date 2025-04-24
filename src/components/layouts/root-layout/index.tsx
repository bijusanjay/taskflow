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

const inter = Inter({ subsets: ['latin'] })

const PUBLIC_ROUTES = ['/']
const LOGIN_ROUTES = ['/login']

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
    return <Fragment>{children}</Fragment>
  }

  if (!isAuthenticated) {
    return <Loader />
  }

  return (
    <div className={inter.className}>
      <Head>
        <title>Taskflow – Smarter bug Tracking</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout style={{ marginLeft: 250 }}>
          <Header />
          <StyledContent>{children}</StyledContent>
        </Layout>
      </Layout>
    </div>
  )
}

export default RootLayout
