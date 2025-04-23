'use client'

import {Fragment, useEffect} from 'react'
import {Layout, Menu, Avatar, Typography, Dropdown, Space} from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  BugOutlined,
  FileSearchOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {useAuthStore} from '@stores/auth-store'
import Head from 'next/head'
import {Inter} from 'next/font/google'

const {Header, Sider, Content} = Layout
const {Text, Title} = Typography

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
`

const StyledHeader = styled(Header)`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: white;
  min-height: calc(100vh - 112px);
  border-radius: 4px;
`
const inter = Inter({subsets: ['latin']})

const RootLayout = ({children}: {children: React.ReactNode}) => {
  const {user, isAuthenticated, logout} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated !== undefined && !isAuthenticated) {
    return <Fragment>{children}</Fragment>
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: <span>Profile</span>,
      icon: <UserOutlined />,
    },
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
                  label: <Link href='/dashboard/tasks'>Tasks</Link>,
                },
              ]}
            />
          </Sider>
          <Layout style={{marginLeft: 250}}>
            <StyledHeader>
              <Title level={4} style={{margin: 0}}>
                {user.role === 'developer'
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
