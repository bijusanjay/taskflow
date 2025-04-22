import React from 'react'
import {
  Modal as AntdModal,
  ModalProps as AntdModalProps,
  Button,
  Row,
} from 'antd'
import { COLORS } from '@utils/constants'

type ModalProps = AntdModalProps & {
  isEdit?: boolean
  okCallback?: () => void
  cancelCallBack?: () => void
  okBtnText?: string
  cancelBtnText?: string
}

// Form Modal Component
const FormModal: React.FC<ModalProps> = ({
  isEdit,
  children,
  cancelCallBack,
  ...props
}) => {
  return (
    <AntdModal
      closeIcon={false}
      {...props}
      width={465}
      footer={null}
      onCancel={cancelCallBack}
    >
      {children}
    </AntdModal>
  )
}

// Alert Delete Modal Component
const AlertDeleteModal: React.FC<ModalProps> = ({
  children,
  cancelCallBack,
  okCallback,
  okBtnText = 'Delete',
  cancelBtnText = 'Cancel',
  ...props
}) => {
  return (
    <AntdModal
      {...props}
      closeIcon={false}
      width={544}
      onCancel={cancelCallBack}
      footer={
        <Row justify={'end'} className='gap-2'>
          <Button onClick={cancelCallBack}>{cancelBtnText}</Button>
          <Button
            type='primary'
            onClick={okCallback}
            style={{ background: COLORS.red }}
          >
            {okBtnText}
          </Button>
        </Row>
      }
    >
      {children}
    </AntdModal>
  )
}

// Alert Info Modal Component
const AlertInfoModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <AntdModal {...props} width={544} closeIcon={false} footer={null}>
      {children}
    </AntdModal>
  )
}

export { FormModal, AlertDeleteModal, AlertInfoModal }
