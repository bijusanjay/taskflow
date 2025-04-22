import { FORM_TYPE } from '@utils/constants'

export type FormType = (typeof FORM_TYPE)[keyof typeof FORM_TYPE]
