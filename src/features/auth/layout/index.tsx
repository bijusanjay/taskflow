'use client'
import React from 'react'
import Image from 'next/image'
import LoginBg from '@public/assets/svgs/login/login-modal-bg.svg'
import {AlertInfoModal} from '@components/ui/modal'

const LoginLayout = () => {
  return (
    <section className='bg-white'>
      <AlertInfoModal
        title={
          <div className='flex flex-col justify-center items-center'>
            <Image src={LoginBg} alt='login-bg' />
            <div className='flex flex-col' style={{marginTop: '32px'}}>
              <span className='text-[16px] text-[#475467] font-normal mt-3 pb-5'>
                Welcome back! Please enter your details.
              </span>
              <div className='pt-[36px]' style={{marginTop: '32px'}}>
                {/* Login form */}
              </div>
            </div>
          </div>
        }
        height={'307px'}
        open={true}
        onCancel={() => {}}
        className='login-bg-container h-[307px]'
        centered
      />
    </section>
  )
}

export default LoginLayout
