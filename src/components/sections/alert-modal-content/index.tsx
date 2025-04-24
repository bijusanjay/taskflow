import React from 'react'
import RedAlertInfo from '@public/assets/svgs/red-alert-info.svg'
import Image from 'next/image'
import { Row } from 'antd'

interface AlertModalContentProps {
  title: string
  description: string
  icon?: React.ReactNode
}

const AlertModalContent: React.FC<AlertModalContentProps> = ({
  title,
  description,
  icon = RedAlertInfo,
}) => {
  return (
    <Row className="flex items-start justify-start gap-4">
      <Image
        src={icon}
        height={48}
        width={48}
        alt="Success icon"
        className="flex shrink-0 basis-[10%] justify-start "
      />
      <div className="flex basis-[70%] flex-col items-start pt-2">
        <span className="text-[18px] font-semibold">{title}</span>
        <span className="mt-2 text-[14px] font-normal text-[#475467]">{description}</span>
      </div>
    </Row>
  )
}

export default AlertModalContent
