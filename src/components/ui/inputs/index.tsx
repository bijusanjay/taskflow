// components/UI/Inputs.js
import React from 'react'
import styled from 'styled-components'
import { Input as AntdInput, InputNumber, Checkbox, Radio } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Select } from 'antd'
import { COLORS } from '@utils/constants'

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

const StyledInput = styled(AntdInput)`
  ${focusStyle}
`

const StyledTextArea = styled(TextArea)`
  ${focusStyle}
`

const StyledSelect = styled(Select)`
  ${focusStyle}
`

const StyledInputNumber = styled(InputNumber)`
  ${focusStyle}
`

const StyledRadio = styled(Radio)`
  ${focusStyle}
`

const StyledCheckbox = styled(Checkbox)`
  ${focusStyle}
`

export const Input = props => <StyledInput {...props} />
export const TextAreaInput = props => <StyledTextArea {...props} />
export const SelectInput = props => <StyledSelect {...props} />
export const NumberInput = props => <StyledInputNumber {...props} />
export const RadioInput = props => <StyledRadio {...props} />
export const CheckboxInput = props => <StyledCheckbox {...props} />

export const renderSelectOptions = (
  options: { label: string; value: string }[],
) => {
  return options.map(option => {
    return (
      <SelectInput.Option key={option.value} value={option.value}>
        {option.label}
      </SelectInput.Option>
    )
  })
}

SelectInput.Option = Select.Option
