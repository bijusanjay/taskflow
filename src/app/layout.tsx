'use client'
import {Inter} from 'next/font/google'
import '@/styles/globals.css'
import {AntdRegistry} from '@ant-design/nextjs-registry'
import React, {ReactNode, Suspense} from 'react'
import RootLayout from '@/components/layouts/root-layout'
import 'antd/dist/reset.css'
import StyledComponentsRegistry from '@lib/styled-components-registry'
import AppProvider from './provider'
import Loader from '@components/ui/loader'
import Head from 'next/head'

const inter = Inter({subsets: ['latin']})

export default function Layout({children}: {children: ReactNode}) {
  // const [isClient, setIsClient] = useState(false)

  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  // if (!isClient) {
  //   return (
  //     <html lang='en'>
  //       <body style={{margin: 0, height: '100vh', backgroundColor: '#fff'}} />
  //     </html>
  //   )
  // }

  return (
    <html lang='en'>
      <Head>
        <title>TrackSure – Smarter Event Tracking</title>
        <link rel='icon' href='/assets/svgs/tracksure_1.ico' sizes='any' />
        <link rel='icon' href='/assets/svgs/tracksure_1.png' type='image/png' />
        <link
          rel='icon'
          href='/assets/svgs/tracksure_1.svg'
          type='image/svg+xml'
        />
      </Head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-white`}
      >
        <AntdRegistry>
          <StyledComponentsRegistry>
            <AppProvider>
              <Suspense fallback={<Loader />}>
                <RootLayout>{children}</RootLayout>
              </Suspense>
            </AppProvider>
          </StyledComponentsRegistry>
        </AntdRegistry>
      </body>
    </html>
  )
}
