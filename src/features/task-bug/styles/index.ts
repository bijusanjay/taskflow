import {Card, Tabs} from 'antd'
import styled from 'styled-components'

export const FormContainer = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`

export const StyledCard = styled(Card)`
  margin-bottom: 24px;
`

export const StyledPageHeader = styled.div`
  padding: 16px 24px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

export const DetailsContainer = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`

export const DetailCard = styled(Card)`
  margin-bottom: 24px;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.div`
  margin-top: 16px;
`

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const StyledTabs = styled(Tabs)`
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`
