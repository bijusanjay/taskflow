'use client'

import {Fragment, useEffect} from 'react'
import {Layout, Menu, Avatar, Typography, Dropdown, Space} from 'antd'
import {
  DashboardOutlined,
  LogoutOutlined,
  BugOutlined,
  FileSearchOutlined,
} from '@ant-design/icons'
import {usePathname, useRouter} from 'next/navigation'
import Link from 'next/link'
import {useAuthStore} from '@stores/auth-store'
import Head from 'next/head'
import {Inter} from 'next/font/google'
import Loader from '@components/ui/loader'
import {Logo, StyledContent, StyledHeader} from './styles'

const {Sider} = Layout
const {Text, Title} = Typography

const inter = Inter({subsets: ['latin']})

const PUBLIC_ROUTES = ['/']
const LOGIN_ROUTES = ['/login']

const RootLayout = ({children}: {children: React.ReactNode}) => {
  const {user, isAuthenticated, logout, setUserData} = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route)
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

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const userMenuItems = [
    {
      key: 'logout',
      label: <span>Logout</span>,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ]

  return (
    <html lang='en'>
      <Head>
        <title>Taskflow – Smarter bug Tracking</title>
      </Head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-white`}
      >
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            theme='dark'
            width={250}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <Logo>
              <BugOutlined style={{marginRight: 8}} /> Bug Tracker
            </Logo>
            <Menu
              theme='dark'
              mode='inline'
              defaultSelectedKeys={['dashboard']}
              items={[
                {
                  key: 'dashboard',
                  icon: <DashboardOutlined />,
                  label: <Link href='/dashboard'>Dashboard</Link>,
                },
                {
                  key: 'tasks',
                  icon: <FileSearchOutlined />,
                  label: <Link href='/tasks'>Tasks</Link>,
                },
              ]}
            />
          </Sider>
          <Layout style={{marginLeft: 250}}>
            <StyledHeader>
              <Title level={4} style={{margin: 0}}>
                {user?.role === 'developer'
                  ? 'Developer Dashboard'
                  : 'Manager Dashboard'}
              </Title>
              <Dropdown menu={{items: userMenuItems}} placement='bottomRight'>
                <Space style={{cursor: 'pointer'}}>
                  <Avatar src={user.avatar} />
                  <Text>{user.name}</Text>
                </Space>
              </Dropdown>
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
          </Layout>
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
