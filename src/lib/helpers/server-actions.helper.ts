import { ReturnData } from '@/lib/types/server-actions'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeDefaultFormState = (
  {
    success = false,
    message = '',
    data = null,
    errors = null
  }: {
    success?: boolean,
    message?: string;
    data?: any;
    errors?: any
  } = {}
): ReturnData => {
  return {
    success,
    message,
    data,
    errors
  }
}
