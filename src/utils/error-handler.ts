import { message } from 'antd'

export const handleError = (error: any) => {
  console.error('Error:', error)

  if (error.response) {
    const { data, status } = error.response
    const errorMessage = data?.message || 'An error occurred while processing your request'

    switch (status) {
      case 401:
        message.error('Please login to continue')
        break
      case 403:
        message.error('You do not have permission to perform this action')
        break
      case 404:
        message.error('The requested resource was not found')
        break
      case 500:
        message.error('Server error. Please try again later')
        break
      default:
        message.error(errorMessage)
    }
    return
  }

  if (error.request) {
    message.error('Network error. Please check your connection')
    return
  }

  message.error(error.message || 'An unexpected error occurred')
}

export const handleSuccess = (msg: string) => {
  message.success(msg)
}

export const handleWarning = (msg: string) => {
  message.warning(msg)
}

export const handleInfo = (msg: string) => {
  message.info(msg)
}
