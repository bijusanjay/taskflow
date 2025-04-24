import React, { useMemo, useState } from 'react'
import {
  Descriptions,
  Tag,
  Button,
  Space,
  Select,
  Divider,
  Timeline,
  Typography,
  Form,
  Input,
  Modal,
  Breadcrumb,
} from 'antd'
import {
  EditOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import {
  DetailCard,
  DetailsContainer,
  HeaderTitle,
  HeaderWrapper,
  StyledPageHeader,
} from '../../styles'
import { bugs, projects, tasks, User, users } from '@config/mock-data'
import { priorityColors, statusColors } from '@utils/constants'

const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph, Text } = Typography

const ItemDetailView: React.FC = () => {
  const params = useParams()

  const projectId = params.projectId as string
  const type = params.type as string
  const itemId = params.itemId as string

  const router = useRouter()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [form] = Form.useForm()
  const currentUser: User = users[0]

  const isTask = type === 'tasks'
  const items = isTask ? tasks : bugs
  const item = items.find(i => i.id === itemId)

  const project = projects.find(p => p.id === projectId)

  const assignedUser = users.find(user => user.id === item?.assignedTo)

  const historyItems = useMemo(()=> [
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
  ],[])

  // Handle edit modal
  const showEditModal = () => {
    form.setFieldsValue({
      title: item?.title,
      description: item?.description,
      status: item?.status,
      priority: item?.priority,
      assignedTo: item?.assignedTo,
    })
    setEditModalVisible(true)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
  }

  const handleEditSubmit = (values: any) => {
    console.log('Updated values:', values)
    // Here you would update the item via API
    setEditModalVisible(false)
  }

  // Handle comment modal
  const showCommentModal = () => {
    setCommentModalVisible(true)
  }

  const handleCommentCancel = () => {
    setCommentModalVisible(false)
  }

  const handleCommentSubmit = (values: any) => {
    console.log('Comment submitted:', values)
    // Here you would add the comment via API
    setCommentModalVisible(false)
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
            <Button key="comment" icon={<CommentOutlined />} onClick={showCommentModal}>
              Add Comment
            </Button>
            {currentUser.role === 'developer' && (
              <Button key="edit" type="primary" icon={<EditOutlined />} onClick={showEditModal}>
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
      <Modal
        title={`Edit ${isTask ? 'Task' : 'Bug'}`}
        open={editModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="open">Open</Option>
              <Option value="in_progress">In Progress</Option>
              <Option value="closed">Closed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select a priority' }]}
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>

          <Form.Item name="assignedTo" label="Assigned To">
            <Select>
              {users
                .filter(user => user.role === 'developer')
                .map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Comment Modal */}
      <Modal
        title="Add Comment"
        open={commentModalVisible}
        onCancel={handleCommentCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCommentSubmit}>
          <Form.Item name="comment" rules={[{ required: true, message: 'Please enter a comment' }]}>
            <TextArea rows={4} placeholder="Your comment" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DetailsContainer>
    // <></>
  )
}

export default ItemDetailView
