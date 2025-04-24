'use client'
import { Button } from 'antd'
import React from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex h-full w-full flex-col items-center justify-center bg-white text-black">
          <h2 className="text-[18px] font-bold">Something went wrong!</h2>
          <p className="text-[16px] font-medium">{error.message}</p>
          <Button
            className="!bg-[#0AAB76] text-[16px] !font-bold !text-white
            "
            onClick={() => reset()}
          >
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}
