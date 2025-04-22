import React from 'react'
import {Button as AntButton} from 'antd'
import {ButtonProps as AntButtonProps} from 'antd/lib/button'
import styled from 'styled-components'
import {COLORS} from '@utils/constants'

const focusStyle = `
  .ant-select-selector {
    border-color:${COLORS.grayLight1} !important; 
    border-radius: 8px;

    &:focus, &:hover, &.ant-select-focused {
      border-color: ${COLORS.grayLight1} important;
      box-shadow: none; /* Removes the default focus shadow */
    }
  }
`

const StyledButton = styled(AntButton)`
  ${focusStyle}
`

interface CustomButtonProps extends AntButtonProps {
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed'
  variant?: 'link' | 'text' | 'dashed' | 'outlined' | 'solid' | 'filled'
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  children?: React.ReactNode
}

const Button: React.FC<CustomButtonProps> = ({
  type = 'primary',
  variant,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledButton {...props} type={type} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
