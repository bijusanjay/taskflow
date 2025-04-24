import React from 'react'
import { Layout, Row, theme } from 'antd'
import Title from 'antd/es/typography/Title'

const { Header } = Layout

interface AppHeaderProps {
  title: string
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header
      className="border-b border-[#EBEBEB]"
      style={{ padding: 0, background: colorBgContainer }}
    >
      <Row justify={'start'} className="p-5">
        <Title level={3} className="mb-0">
          {title}
        </Title>
      </Row>
    </Header>
  )
}

export default AppHeader
