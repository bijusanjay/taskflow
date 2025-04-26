import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Select, Space, Typography, message } from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Task } from '@config/mock-data'
import { useAuthStore } from '@stores/auth-store'

const { Text } = Typography
const { Option } = Select

interface TimeTrackerProps {
  tasks: Task[]
  currentProjectId: string
}

interface TimeEntry {
  taskId: string
  startTime: number
  pausedTime: number
  isRunning: boolean
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ tasks, currentProjectId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { user } = useAuthStore()
  const [timeEntry, setTimeEntry] = useState<TimeEntry | null>(null)
  const [elapsedTime, setElapsedTime] = useState('00:00:00')
  const [messageApi, contextHolder] = message.useMessage()

  // Load saved time entry from localStorage
  useEffect(() => {
    const savedEntry = localStorage.getItem('timeEntry')
    if (savedEntry) {
      const parsedEntry = JSON.parse(savedEntry)
      if (parsedEntry.isRunning) {
        setTimeEntry(parsedEntry)
      }
    }
  }, [])

  // Save time entry to localStorage whenever it changes
  useEffect(() => {
    if (timeEntry) {
      localStorage.setItem('timeEntry', JSON.stringify(timeEntry))
    } else {
      localStorage.removeItem('timeEntry')
    }
  }, [timeEntry])

  // Update elapsed time every second when timer is running
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (timeEntry?.isRunning) {
      intervalId = setInterval(() => {
        const now = Date.now()
        const elapsed = now - timeEntry.startTime
        setElapsedTime(formatTime(elapsed))
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [timeEntry])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleStart = (values: { taskId: string }) => {
    const newTimeEntry: TimeEntry = {
      taskId: values.taskId,
      startTime: Date.now(),
      pausedTime: 0,
      isRunning: true,
    }
    setTimeEntry(newTimeEntry)
    setElapsedTime('00:00:00')
    setIsModalVisible(false)
    form.resetFields()
  }

  const handlePause = () => {
    if (timeEntry) {
      setTimeEntry({
        ...timeEntry,
        pausedTime: Date.now(),
        isRunning: false,
      })
    }
  }

  const handleResume = () => {
    if (timeEntry) {
      const pausedDuration = Date.now() - timeEntry.pausedTime
      setTimeEntry({
        ...timeEntry,
        startTime: timeEntry.startTime + pausedDuration,
        pausedTime: 0,
        isRunning: true,
      })
    }
  }

  const handleStop = () => {
    if (timeEntry) {
      setTimeEntry(null)
      setElapsedTime('00:00:00')

      messageApi.success(`Time sheet updated successfully`)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  const currentTask = tasks.find(task => task.id === timeEntry?.taskId)

  return (
    <>
      {contextHolder}
      {!timeEntry ? (
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={showModal}
          style={{ marginRight: 8 }}
        >
          Start Timer
        </Button>
      ) : (
        <Space>
          <Button
            type="primary"
            icon={timeEntry.isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={timeEntry.isRunning ? handlePause : handleResume}
          >
            {timeEntry.isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button danger type="primary" icon={<StopOutlined />} onClick={handleStop}>
            Stop
          </Button>
          <Space>
            <ClockCircleOutlined />
            <Text strong>{elapsedTime}</Text>
            <Text type="secondary">- {currentTask?.title}</Text>
          </Space>
        </Space>
      )}

      {isModalVisible && (
        <Modal
          title="Start Time Tracking"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleStart} layout="vertical">
            <Form.Item
              name="taskId"
              label="Select Task"
              rules={[{ required: true, message: 'Please select a task' }]}
            >
              <Select placeholder="Select a task">
                {tasks
                  .filter(
                    task => task.projectId === currentProjectId && task.assignedTo === user.id
                  )
                  .map(task => (
                    <Option key={task.id} value={task.id}>
                      {task.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Start Tracking
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default TimeTracker
