'use client'
import React from 'react'
import { Button, Typography, Space, Card } from 'antd'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { features } from '@utils/constants'

const { Title, Paragraph } = Typography

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`

const FeatureCard = styled(Card)`
  margin: 20px;
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`

const HomePage = () => {
  const router = useRouter()

  return (
    <LandingContainer>
      <ContentWrapper>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={1} style={{ marginTop: '40px', color: '#1a1a1a' }}>
            Welcome to TaskFlow
          </Title>
          <Title level={3} style={{ color: '#4a4a4a', fontWeight: 'normal' }}>
            Smarter Bug Tracking and Task Management
          </Title>
          <Paragraph
            style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#666' }}
          >
            TaskFlow helps teams track bugs, manage tasks, and monitor time efficiently. Our
            platform provides a seamless experience for both developers and managers.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/login')}
            style={{ marginTop: '20px', height: '50px', width: '200px', fontSize: '18px' }}
          >
            Get Started
          </Button>

          <FeaturesContainer>
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title}>
                <Paragraph>{feature.description}</Paragraph>
              </FeatureCard>
            ))}
          </FeaturesContainer>
        </Space>
      </ContentWrapper>
    </LandingContainer>
  )
}

export default HomePage
