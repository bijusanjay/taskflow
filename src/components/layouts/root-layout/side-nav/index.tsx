'use client'
import React, {Fragment, useEffect, useState} from 'react'
import {Menu} from 'antd'
import {
  PieChartOutlined,
  DesktopOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FundViewOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Logo from '@public/assets/svgs/nextjs-logo.svg'
import Image from 'next/image'

const StyledMenu = styled(Menu)`
  &.ant-menu-root {
    background: #f9fafc !important;
    border: none !important;
  }
  .ant-menu-item {
    padding-left: 24px !important;
  }

  .ant-menu-item-selected {
    color: black !important;
    background: white !important;
    border-radius: 6px !important;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12) !important;
  }
`

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  background-color: #f9fafc;
  width: 18%;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

const MenuItemsContainer = styled.div`
  flex: 1;
  padding-top: 16px;
`

const SideMenu = () => {
  const pathname = usePathname()
  const [selectedKey, setSelectedKey] = useState<string[]>([])

  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: <Link href='/dashboard'>Dashboard</Link>,
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: <Link href='/features'>Features</Link>,
    },
    {
      key: '3',
      icon: <UnorderedListOutlined />,
      label: <Link href='/events'>Events</Link>,
    },
    {
      key: '4',
      icon: <FundViewOutlined />,
      label: <Link href='/tickets'>Tickets</Link>,
    },
    {
      key: '5',
      icon: <UserOutlined />,
      label: <Link href='/users'>Manage users</Link>,
    },
    {
      key: '6',
      icon: <SnippetsOutlined />,
      label: (
        <a href='/docs/index.html' target='blank'>
          Docs
        </a>
      ),
    },
    ,
    {
      key: '7',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: '8',
      icon: <QuestionCircleOutlined />,
      label: 'Support',
    },
  ]

  useEffect(() => {
    switch (true) {
      case pathname.startsWith('/features'):
        setSelectedKey(['2'])
        break
      case pathname.startsWith('/events'):
        setSelectedKey(['3'])
        break
      case pathname.startsWith('/tickets'):
        setSelectedKey(['4'])
        break
      case pathname.startsWith('/users'):
        setSelectedKey(['5'])
        break
      default:
        setSelectedKey(['1'])
        break
    }
  }, [pathname])

  return (
    <Fragment>
      <SideMenuContainer>
        <div className='flex flex-col justify-start'>
          <LogoContainer>
            <Image
              src={Logo}
              alt='Logo'
              width={50}
              height={40}
              style={{width: '100%', height: '60px'}}
            />
          </LogoContainer>
        </div>

        <MenuItemsContainer>
          <StyledMenu
            theme='light'
            mode='inline'
            selectedKeys={selectedKey}
            items={items}
          />
        </MenuItemsContainer>
      </SideMenuContainer>
    </Fragment>
  )
}

export default React.memo(SideMenu)
