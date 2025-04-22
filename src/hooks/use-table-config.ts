import {TablePaginationConfig} from 'antd'
import {JSX, useMemo} from 'react'

type Column<T> = {
  title: string
  dataIndex: keyof T
  key: keyof T
  render?: (text: string, record: T) => JSX.Element
  width?: string
}

const useTableConfig = <T>(
  data: Array<T>,
  isLoading: boolean,
  pagination: TablePaginationConfig,
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>,
  columnsConfig: Column<T>[],
  scroll?: {x?: number; y?: number},
  total?: number
) => {
  const columns = useMemo(() => {
    return columnsConfig.map((column) => ({
      ...column,
      render: column.render ?? ((text) => text),
    }))
  }, [columnsConfig])

  const onTableChangeHandler = (pagination: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      total: total ?? 10,
    })
  }

  return {
    pagination,
    dataSource: data,
    columns,
    loading: isLoading,
    size: 'middle',
    sticky: true,
    onChange: onTableChangeHandler,
    ...(scroll && {
      scroll: scroll,
    }),
  }
}

export default useTableConfig
