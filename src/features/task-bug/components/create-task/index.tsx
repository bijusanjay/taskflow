import React from 'react'
import { Form, Input, Select, Button, Space, Typography, Row, Col, message } from 'antd'
import { SaveOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { projects, User, users } from '@config/mock-data'
import { FormContainer, HeaderContent, StyledCard, StyledPageHeader } from '../../styles'
import { useAuthStore } from '@stores/auth-store'
import { formValidationHandler } from '@utils/form'
import useFetch from '@hooks/use-fetch'
import useAppStore from '@stores/app-store'

const { TextArea } = Input
const { Option } = Select

const CreateItemForm: React.FC = () => {
  const { user } = useAuthStore()
  const params = useParams()
  const type = params.type as string
  const [form] = Form.useForm()
  const router = useRouter()
  const isTask = type === 'task'
  const currentUser: User = user
  const { apiInstance } = useAppStore()

  const {
    data: userList,
    loading: userLoading,
    error: userError,
  } = useFetch(
    apiInstance.client.userApi.getUsers
  )

  console.log({userList})

  const handleSubmit = async (values: any) => {
    const errorInfo = await formValidationHandler(form, async values => {
      try {
        // API call to create task/bug
        message.success('Form submitted successfully!')
      } catch (apiError) {
        message.error('Something went wrong')
        console.error('API Error:', apiError)
      }

      console.log('Form values:', values)
      // Submit the form data to your API

      // Navigate back to dashboard
      router.push('/dashboard')
    })

    if (errorInfo) {
      message.error('Please check your input fields!')
    }
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

          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item name="assignedTo" label="Assign To">
                <Select placeholder="Select a developer">
                  {userList                   
                    ?.map(user => (
                      <Option key={user.id} value={user.id}>
                        {user.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

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
