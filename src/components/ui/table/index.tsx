import { Table } from 'antd'
import styled from 'styled-components'
import React from 'react'
import type { TablePaginationConfig } from 'antd/es/table'
import Loader from '@/components/ui/loader'

const TableWrapper = styled(Table)`
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  border: 1px solid #e4e7ec;
  border-radius: 10px;

  .ant-table {
    background-color: #fff;
    color: black;

    .ant-table-cell {
      padding: 20px !important;
    }

    .ant-table-thead {
      .ant-table-cell {
        background-color: #fff;
        color: #848e9c;
        border-bottom: 1px solid #e4e7ec;
        font-weight: 400;
        font-size: 14px;
        padding: 20px !important;
      }

      .ant-table-cell::before {
        background: none;
      }
    }
    .ant-table-tbody {
      .ant-table-row {
        .ant-table-cell {
          color: black;
          border-bottom: 0.5px solid #e4e7ec;
        }
      }

      tr:nth-child(odd) td {
        background-color: #f9fafb;
      }

      tr:hover td {
        background-color: #ebebeb;
      }
    }
  }

  .ant-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;

    .ant-pagination-prev,
    .ant-pagination-next {
      flex: 1;
    }

    .ant-pagination-item,
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      display: inline-block;
      margin: 0 5px;
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      .ant-pagination-item-link {
        .anticon {
          margin-top: -10px !important;
          color: grey;
        }
      }
    }

    .ant-pagination-item-active {
      background-color: #f1f4fa;
      border: none;

      a {
        color: #276cf0;
      }
    }

    .ant-pagination-item-ellipsis {
      color: #667085;
    }
  }
`
interface TableComponentProps {
  columns: Array<any>
  dataSource: any
  pagination?: TablePaginationConfig | boolean
  onchange?: (paginationParams: TablePaginationConfig) => void
  loading?: boolean
  scroll?: { x?: number | string; y?: number | string }
  onRowClick?: (record: any) => void
}

const TableComponent = ({
  columns,
  dataSource,
  pagination,
  onchange,
  loading,
  scroll,
  onRowClick,
  ...restProps
}: TableComponentProps) => {
  const locale = {
    emptyText: (
      <div className="flex flex-col items-center justify-center">
        <p className="my-2 font-bold text-[#8c8c8c]">No Data</p>
        <p className="my-2 text-[#8c8c8c]">No Data to display.</p>
      </div>
    ),
  }

  const itemRender = (page: number, type: 'prev' | 'next', originalElement: React.ReactNode) => {
    if (type === 'prev') {
      const isFirstPage = page === 0
      return (
        <button
          className={`absolute left-6 w-[100px] rounded-[8px] border-[1px] border-[#d0d5dd] p-1 ${
            isFirstPage ? 'opacity-[0.5]' : 'opacity-[1]'
          }`}
          disabled={isFirstPage}
          onClick={e => {
            if (isFirstPage) {
              e.preventDefault()
              return
            }
          }}
        >
          Previous
        </button>
      )
    }

    if (type === 'next') {
      const isLastPage =
        pagination &&
        typeof pagination !== 'boolean' &&
        pagination.current === Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))
      return (
        <button
          disabled={isLastPage}
          onClick={e => {
            if (isLastPage) {
              e.preventDefault()
              return
            }
          }}
          className={`absolute right-6 w-[100px] rounded-[8px] border-[1px] border-[#d0d5dd] p-1 ${
            isLastPage ? 'opacity-[0.5]' : 'opacity-[1]'
          }`}
        >
          Next
        </button>
      )
    }

    return originalElement
  }
  return (
    <TableWrapper
      className="custom-table"
      locale={locale}
      dataSource={dataSource}
      columns={columns}
      pagination={
        pagination === false
          ? false
          : {
              ...(pagination as object),
              itemRender,
              position: ['bottomCenter'],
              showSizeChanger: false,
            }
      }
      onChange={onchange}
      loading={{
        spinning: loading,
        indicator: <Loader />,
      }}
      scroll={scroll}
      onRow={record => ({
        onClick: () => onRowClick && onRowClick(record),
        style: onRowClick ? { cursor: 'pointer' } : {},
      })}
      {...restProps} // Pass all other props to the Ant Design Table
    />
  )
}

export default TableComponent
