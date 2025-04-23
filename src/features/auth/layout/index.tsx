'use client'

import {useEffect, useState} from 'react'
import {Form, Input, Button, Card, Typography, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import {useRouter} from 'next/navigation'
import {useAuthStore} from '@stores/auth-store'

const {Title} = Typography

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`

const StyledCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

interface LoginFormValues {
  username: string
  password: string
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const {login, isAuthenticated} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      const result = await login(values.username, values.password)
      if (result.success) {
        message.success('Login successful')
        router.push('/dashboard')
      } else {
        message.error(result.message || 'Login failed')
      }
    } catch (error) {
      message.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  console.log('Login')

  return (
    <LoginContainer>
      <StyledCard>
        <LogoContainer>
          <Title level={2}>Bug Tracker</Title>
        </LogoContainer>
        <Form
          name='login'
          initialValues={{remember: true}}
          onFinish={handleSubmit}
          layout='vertical'
        >
          <Form.Item
            name='username'
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input
              autoComplete='off'
              prefix={<UserOutlined />}
              placeholder='Username'
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password
              autoComplete='off'
              prefix={<LockOutlined />}
              placeholder='Password'
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
          <Typography.Text type='secondary'>
            Use username: dev1 or manager1 with password: password123
          </Typography.Text>
        </Form>
      </StyledCard>
    </LoginContainer>
  )
}
