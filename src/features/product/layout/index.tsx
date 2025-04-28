import React from 'react'
import { Table, Tooltip, Tag, Badge, Image, Switch } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import styled from 'styled-components'

// Types
interface Product {
  id: number
  name: string
  image: string
  brief: string
  description: string
  price: number
  launchDate: string
  orders: number
  inventory: number
  category: string
  supplier: string
  rating: number
  status: 'active' | 'inactive'
}

// Styled Components
const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
`

const IdText = styled.div`
  font-size: 10px;
  color: gray;
`

const ProductName = styled.div`
  font-weight: bold;
`

const OrdersInventory = styled.div`
  font-size: 13px;
`

const CategoryTag = styled(Tag)`
  background-color: #e0f7fa;
  color: #00796b;
  border: none;
  font-size: 12px;
`

// Mock Data
const products: Product[] = [
  {
    id: 101,
    name: 'iPhone 15',
    image: 'https://via.placeholder.com/50',
    brief: 'Latest Apple flagship phone',
    description: 'A16 Bionic chip, Dynamic Island, Super Retina XDR Display',
    price: 80000,
    launchDate: '2024-03-15',
    orders: 5000,
    inventory: 150,
    category: 'Mobile',
    supplier: 'Apple Inc.',
    rating: 5,
    status: 'active',
  },
  {
    id: 102,
    name: 'Galaxy S24',
    image: 'https://via.placeholder.com/50',
    brief: 'Samsung premium device',
    description: 'Exynos 2400, AMOLED 2X, 120Hz Display',
    price: 75000,
    launchDate: '2024-01-10',
    orders: 3200,
    inventory: 90,
    category: 'Mobile',
    supplier: 'Samsung',
    rating: 4,
    status: 'inactive',
  },
]

// Columns
const columns: ColumnsType<Product> = [
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <div>
        <ProductName>{record.name}</ProductName>
        <IdText>ID: {record.id}</IdText>
      </div>
    ),
    fixed: 'left',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: src => <StyledImage src={src} alt="product" preview={false} />,
    responsive: ['md'],
  },
  {
    title: 'Brief',
    dataIndex: 'brief',
    key: 'brief',
    render: text => (
      <Tooltip title={text}>
        <span className="block lg:hidden">{text.slice(0, 10)}...</span>
        <span className="hidden lg:block">{text}</span>
      </Tooltip>
    ),
    responsive: ['lg'],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: text => (
      <Tooltip title={text}>
        <span className="block xl:hidden">{text.slice(0, 10)}...</span>
        <span className="hidden xl:block">{text}</span>
      </Tooltip>
    ),
    responsive: ['xl'],
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: value => `₹${Math.round(value / 1000)}K`,
    // responsive: ['md'],
  },
  {
    title: 'Launch',
    dataIndex: 'launchDate',
    key: 'launchDate',
    render: date => (
      <Tooltip title={date}>
        <span>{getRelativeLaunchTime(date)}</span>
      </Tooltip>
    ),
    responsive: ['md'],
  },
  {
    title: 'Orders / Inventory',
    key: 'orders',
    render: (_, record) => (
      <OrdersInventory>
        {record.orders} / {record.inventory}
      </OrdersInventory>
    ),
    responsive: ['lg'],
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: text => <CategoryTag>#{text}</CategoryTag>,
    responsive: ['lg'],
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: text => (
      <span>{text}</span>
      //   <Tooltip title={text}>
      //   </Tooltip>
    ),
    responsive: ['xl'],
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: rating => `${rating} ⭐`,
    responsive: ['xl'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Switch
        checked={status === 'active'}
        size="small"
        // checkedChildren="On"
        // unCheckedChildren="Off"
      />
    ),
  },
]

// Helper Functions
const getRelativeLaunchTime = (launchDate: string) => {
  const now = new Date()
  const launch = new Date(launchDate)
  const diffMonths =
    (now.getFullYear() - launch.getFullYear()) * 12 + now.getMonth() - launch.getMonth()
  return diffMonths > 0 ? `${diffMonths}mo ago` : 'New'
}

// Component
const ProductTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      expandable={{
        expandedRowRender: record => (
          <div style={{ padding: 10 }}>
            <p>
              <strong>Brief:</strong> {record.brief}
            </p>
            <p>
              <strong>Description:</strong> {record.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{record.price}
            </p>
            <p>
              <strong>Launch:</strong> {record.launchDate}
            </p>
            <p>
              <strong>Orders:</strong> {record.orders}
            </p>
            <p>
              <strong>Inventory:</strong> {record.inventory}
            </p>
            <p>
              <strong>Category:</strong> {record.category}
            </p>
            <p>
              <strong>Supplier:</strong> {record.supplier}
            </p>
            <p>
              <strong>Rating:</strong> {record.rating}⭐
            </p>
            <p>
              <strong>Status:</strong> {record.status}
            </p>
          </div>
        ),
      }}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}

export default ProductTable
