import React from 'react'
import { Avatar, Dropdown, Space, Typography } from 'antd'
import { useAuthStore } from '@stores/auth-store'
import styled from 'styled-components'
import { LogoutOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const { Text } = Typography

const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 24px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
  //   margin-left: 250px;
`

const Header = () => {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    localStorage.clear()
    router.push('/login')
  }

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <HeaderContainer>
      <Space>
        <Text strong style={{ fontSize: '20px' }}>
          {user?.role === 'developer' ? 'Developer Dashboard' : 'Manager Dashboard'}
        </Text>
      </Space>
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar src={user?.avatar} />
          <Text>{user?.name}</Text>
        </Space>
      </Dropdown>
    </HeaderContainer>
  )
}

export default Header
