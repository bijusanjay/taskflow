import React, { useMemo, useState } from 'react'
import { Descriptions, Tag, Button, Space, Divider, Timeline, Typography, Breadcrumb } from 'antd'
import { EditOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  DetailCard,
  DetailsContainer,
  HeaderTitle,
  HeaderWrapper,
  StyledPageHeader,
} from '../../styles'
import { bugs, projects, tasks, User, users } from '@config/mock-data'
import { priorityColors, statusColors } from '@utils/constants'
import EditModal from '../edit-modal'

const { Title, Paragraph, Text } = Typography

const ItemDetailView: React.FC = () => {
  const params = useParams()
  const pathname = usePathname()
  const activeTab = pathname.split('/')[1] === 'bugs' ? 'bugs' : 'tasks'

  const projectId = params.projectId as string
  const type = params.type as string
  const itemId = params.itemId as string

  const router = useRouter()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const currentUser: User = users[0]

  const isTask = type === 'tasks'
  const items = isTask ? tasks : bugs
  const item = items.find(i => i.id === itemId)

  const project = projects.find(p => p.id === projectId)

  const assignedUser = users.find(user => user.id === item?.assignedTo)

  const historyItems = useMemo(
    () => [
      {
        id: '1',
        action: 'Created',
        timestamp: new Date(item?.createdAt || '').toLocaleString(),
        user: users.find(u => u.id === item?.createdBy)?.name,
      },
      {
        id: '2',
        action: 'Assigned to ' + assignedUser?.name,
        timestamp: new Date(item?.createdAt || '').toLocaleString(),
        user: users.find(u => u.id === item?.createdBy)?.name,
      },
      {
        id: '3',
        action: 'Status updated to ' + item?.status,
        timestamp: new Date(item?.updatedAt || '').toLocaleString(),
        user: assignedUser?.name,
      },
    ],
    []
  )

  const showEditModal = () => {
    setEditModalVisible(true)
  }

  const handleEditSubmit = (values: any) => {
    console.log('Updated values:', values)
    // Update the item via API
    setEditModalVisible(false)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
  }

  if (!item) {
    return <div>Item not found</div>
  }

  return (
    <DetailsContainer>
      <Breadcrumb
        items={[
          { title: 'Home' },
          { title: project?.name || 'Project' },
          { title: isTask ? 'Tasks' : 'Bugs' },
          { title: item.id },
        ]}
      />
      <StyledPageHeader>
        <HeaderWrapper>
          <HeaderTitle>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
            <Title level={4} style={{ marginBottom: 0, display: 'inline-block', marginLeft: 8 }}>
              {`${isTask ? 'Task' : 'Bug'} Details`}
            </Title>
          </HeaderTitle>
          <Space>
            {currentUser.role === 'developer' && (
              <Button
                key="edit"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showEditModal()}
              >
                Edit
              </Button>
            )}
          </Space>
        </HeaderWrapper>
      </StyledPageHeader>

      <DetailCard>
        <Title level={4}>{item.title}</Title>
        <Space style={{ marginBottom: 16 }}>
          <Tag color={statusColors[item.status]}>{item.status.replace('_', ' ').toUpperCase()}</Tag>
          <Tag color={priorityColors[item.priority]}>{item.priority.toUpperCase()}</Tag>
        </Space>

        <Descriptions bordered>
          <Descriptions.Item label="Created By">
            {users.find(u => u.id === item.createdBy)?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned To">
            {assignedUser?.name || 'Unassigned'}
          </Descriptions.Item>
          <Descriptions.Item label="Project/Team">{project?.name}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(item.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {new Date(item.updatedAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Description</Divider>
        <Paragraph>{item.description}</Paragraph>
      </DetailCard>

      <DetailCard title="History">
        <Timeline>
          {historyItems.map(historyItem => (
            <Timeline.Item
              key={historyItem.id}
              dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
            >
              <p>
                <Text strong>{historyItem.action}</Text> by {historyItem.user}
              </p>
              <p>{historyItem.timestamp}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </DetailCard>

      {/* Edit Modal */}
      {editModalVisible && (
        <EditModal
          visible={editModalVisible}
          onCancel={handleEditCancel}
          onSubmit={handleEditSubmit}
          initialValues={item}
          isTask={activeTab === 'tasks'}
          users={users}
        />
      )}
    </DetailsContainer>
  )
}

export default ItemDetailView
