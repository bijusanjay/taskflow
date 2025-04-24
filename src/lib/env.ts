export interface ProcessEnv {
  [key: string]: string | undefined
}
declare let process: {
  env: {
    NEXT_PUBLIC_ENV: 'production' | 'development'
    NEXT_PUBLIC_BASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
  }
}

const NODE_ENVIRONMENT = process.env.NEXT_PUBLIC_ENV
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export { NODE_ENVIRONMENT, BASE_URL }
