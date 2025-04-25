import { FormInstance } from 'antd'

export const formValidationHandler = async (
  form: FormInstance,
  callback: (values: any) => Promise<void>
): Promise<any> => {
  try {
    const values = await form.validateFields()
    console.log('Form Values:', values)
    await callback(values)
  } catch (error) {
    console.log('Validation Failed:', error)
    return error
  }
}
