import React from 'react'
import { SelectInput } from '@components/ui/inputs'
export const renderOptions = (options: { label: string; value: string }[]) => {
  return options.map(option => {
    return (
      <SelectInput.Option key={option.value} value={option.value}>
        {option.label}
      </SelectInput.Option>
    )
  })
}
