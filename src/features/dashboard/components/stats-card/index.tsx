import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Task } from '@config/mock-data'
import { Card, Col, Row, Statistic } from 'antd'

interface StatsCardprops {
  tasksData: Task[]
}

const StatsCard: React.FC<StatsCardprops> = ({ tasksData }) => {
  const stats = {
    open: tasksData?.filter(task => task.status === 'open').length || 0,
    inProgress: tasksData?.filter(task => task.status === 'in_progress').length || 0,
    review: tasksData?.filter(task => task.status === 'review').length || 0,
    closed: tasksData?.filter(task => task.status === 'closed').length || 0,
    total: tasksData?.length || 0,
  }
  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Open Tasks"
            value={stats.open}
            valueStyle={{ color: '#ff4d4f' }}
            prefix={<ExclamationCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="In Progress"
            value={stats.inProgress}
            valueStyle={{ color: '#faad14' }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="In Review"
            value={stats.review}
            valueStyle={{ color: '#1890ff' }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Closed Tasks"
            value={stats.closed}
            valueStyle={{ color: '#52c41a' }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default StatsCard
