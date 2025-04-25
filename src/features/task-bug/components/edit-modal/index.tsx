import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button } from 'antd'
import { User } from '@config/mock-data'

const { TextArea } = Input
const { Option } = Select

interface EditModalProps {
  visible: boolean
  onCancel: () => void
  onSubmit: (values: any) => void
  initialValues?: any
  isTask?: boolean
  users: User[]
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  isTask = true,
  users,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [visible, initialValues, form])

  const handleSubmit = (values: any) => {
    onSubmit(values)
    form.resetFields()
  }

  return (
    <Modal
      title={`Edit ${isTask ? 'Task' : 'Bug'}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
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
  )
}

export default EditModal
