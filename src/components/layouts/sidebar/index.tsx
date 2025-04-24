import React from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BugOutlined, DashboardOutlined, FileSearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 250px;
  background: #001529;
  height: 100vh;
  position: fixed;
  left: 0;
  overflow-y: auto;
`

const Logo = styled.div`
  height: 64px;
  padding: 16px;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <SidebarContainer>
      <Logo>
        <BugOutlined style={{ marginRight: 8 }} /> TaskFlow
      </Logo>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname.split('/')[1] || 'dashboard']}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: 'tasks',
            icon: <FileSearchOutlined />,
            label: <Link href="/tasks">Tasks</Link>,
          },
          {
            key: 'bugs',
            icon: <BugOutlined />,
            label: <Link href="/bugs">Bugs</Link>,
          },
        ]}
      />
    </SidebarContainer>
  )
}

export default Sidebar
