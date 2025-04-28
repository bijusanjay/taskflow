'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const ProductsLayout = dynamic(() => import('@features/product/layout'), {
  ssr: false,
})

const ProductsPage = () => {
  return <ProductsLayout />
}

export default ProductsPage
