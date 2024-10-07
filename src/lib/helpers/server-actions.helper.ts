import { ReturnData } from '@/types/server-actions'

export const makeReturnData = (
  message: string, data?: any, error?: unknown
): ReturnData => {
  return {
    message,
    data,
    error
  }
}
