import React, {useCallback} from 'react'
import useAppStore from '@stores/app-store'
import {message} from 'antd'
import Loader from '@components/ui/loader'
import useFetch from '@hooks/use-fetch'

const DashboardLayout = () => {
  const {apiInstance} = useAppStore()

  const fetchDashboardMetrics = useCallback(async () => {
    try {
      const response =
        await apiInstance.client.dashboardApi.getDashboardMetrics()
      return response.data?.data
    } catch (error) {
      message.error('Error fetching features!')
      console.error(error)
    }
  }, [apiInstance.client.dashboardApi])

  const {data, error, loading} = useFetch(fetchDashboardMetrics)

  console.log({data})

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='p-5'>
      <div className='w-full flex flex-col flex-wrap gap-4 mt-5 px-2'></div>
    </div>
  )
}

export default DashboardLayout
