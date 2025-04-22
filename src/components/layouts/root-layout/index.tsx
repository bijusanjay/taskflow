'use client'
import React from 'react'
import {Layout} from 'antd'
import SideMenu from '@components/layouts/root-layout/side-nav'

const {Content, Footer, Sider} = Layout

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider style={{background: '#F9FAFC'}} width={268}>
        <SideMenu />
      </Sider>
      <Layout>
        <Layout>
          <Content>{children}</Content>
        </Layout>
        <Footer style={{textAlign: 'center'}}>
          Taskflow ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default RootLayout
