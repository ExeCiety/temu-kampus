import type {NextApiRequest, NextApiResponse} from 'next'
import {handleApiError} from "@/api-lib/error"
import {StatusCodes} from "http-status-codes"
import {ApiResponseFormat} from "@/types/response"

interface nextConnectOptions {
  onError?: (err: unknown, req: NextApiRequest, res: NextApiResponse) => void;
  onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
}

export const defaultNextConnectOptions: nextConnectOptions = {
  onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err)
    handleApiError(err, req, res)
  },
  onNoMatch: (_: NextApiRequest, res: NextApiResponse) => {
    res.status(StatusCodes.NOT_FOUND)
      .end(
        {
          message: 'Not Found'
        } as ApiResponseFormat
      )
  }
}
