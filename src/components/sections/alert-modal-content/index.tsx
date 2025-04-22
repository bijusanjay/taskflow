import React from 'react'
import RedAlertInfo from '@public/assets/svgs/red-alert-info.svg'
import Image from 'next/image'
import {Row} from 'antd'

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
    <Row className='flex justify-start gap-4 items-start'>
      <Image
        src={icon}
        height={48}
        width={48}
        alt='Success icon'
        className='shrink-0 basis-[10%] flex justify-start '
      />
      <div className='flex flex-col basis-[70%] items-start pt-2'>
        <span className='text-[18px] font-semibold'>{title}</span>
        <span className='text-[#475467] text-[14px] font-normal mt-2'>
          {description}
        </span>
      </div>
    </Row>
  )
}

export default AlertModalContent
