import React from 'react'
import { Form, Input, Select, Button, DatePicker, Space, Radio, Typography } from 'antd'
import { SaveOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { projects, User, users } from '@config/mock-data'
import { FormContainer, HeaderContent, StyledCard, StyledPageHeader } from '../../styles'

const { TextArea } = Input
const { Option } = Select

const CreateItemForm: React.FC = () => {
  const params = useParams()
  const type = params.type as string
  const [form] = Form.useForm()
  const router = useRouter()
  const isTask = type === 'task'
  const currentUser: User = users[0] // Assuming first user is logged in

  const handleSubmit = (values: any) => {
    console.log('Form values:', values)
    // Here you would submit the form data to your API

    // Navigate back to dashboard
    router.push('/dashboard')
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <FormContainer>
      <StyledPageHeader>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
        <HeaderContent>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {`Create New ${isTask ? 'Task' : 'Bug'}`}
          </Typography.Title>
          <Typography.Text type="secondary">Add details for your new item</Typography.Text>
        </HeaderContent>
      </StyledPageHeader>

      <StyledCard>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            createdBy: currentUser.id,
            type: isTask ? 'task' : 'bug',
            status: 'open',
            priority: 'medium',
          }}
        >
          <Form.Item name="type" label="Type">
            <Radio.Group>
              <Radio.Button value="task">Task</Radio.Button>
              <Radio.Button value="bug">Bug</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter a descriptive title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} placeholder="Provide a detailed description" />
          </Form.Item>

          <Form.Item
            name="projectId"
            label="Project/Team"
            rules={[{ required: true, message: 'Please select a project' }]}
          >
            <Select placeholder="Select a project">
              {projects.map(project => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
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

          <Form.Item name="assignedTo" label="Assign To">
            <Select placeholder="Select a developer">
              {users
                .filter(user => user.role === 'developer')
                .map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="dueDate" label="Due Date">
            <DatePicker />
          </Form.Item>

          <Form.Item name="createdBy" hidden>
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Submit
              </Button>
              <Button onClick={handleCancel} icon={<CloseOutlined />}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </StyledCard>
    </FormContainer>
  )
}

export default CreateItemForm
