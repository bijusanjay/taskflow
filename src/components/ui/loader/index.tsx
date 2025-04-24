import { LoadingOutlined } from '@ant-design/icons'
import { Row, Spin } from 'antd'
import React from 'react'

interface LoaderProps {
  size?: 'large' | 'small' | 'default'
  color?: string
  fullscreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color,
  fullscreen = false,
  ...restProps
}) => (
  <Row
    justify="center"
    style={{
      alignContent: 'center',
      height: fullscreen ? '100vh' : '100%',
      width: fullscreen ? '100vw' : 'auto',
    }}
  >
    <div
      style={{
        width: fullscreen ? '150px' : 'auto', // Adjust loader width here
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48, color }} spin />}
        size={size}
        {...restProps}
      />
    </div>
  </Row>
)

export default Loader
