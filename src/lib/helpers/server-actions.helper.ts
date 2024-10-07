import { ReturnData } from '@/types/server-actions'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeReturnData = (
  message: string, data?: any, error?: unknown
): ReturnData => {
  return {
    message,
    data,
    error
  }
}
