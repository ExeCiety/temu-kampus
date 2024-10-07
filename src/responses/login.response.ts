import { ReturnData } from '@/types/server-actions'

export interface LoginResponseData extends ReturnData {
  data: {
    token: string
    user: {
      id: number
      name: string
      email: string
    }
  }
}
