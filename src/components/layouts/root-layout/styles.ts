import { Layout } from 'antd'
import styled from 'styled-components'

const { Header, Content } = Layout

export const Logo = styled.div`
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
`

export const StyledHeader = styled(Header)`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`

export const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: white;
  min-height: calc(100vh - 112px);
  border-radius: 4px;
`
