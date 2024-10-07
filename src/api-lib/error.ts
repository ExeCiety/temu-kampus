import {NextApiRequest, NextApiResponse} from "next"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import {ApiResponseFormat} from "@/types/response"
import {ApiError} from "@/types/error"
import {ValidationError} from "yup"

export const handleApiError = (
  err: unknown, req: NextApiRequest, res: NextApiResponse
) => {
  console.error('Error: ', err)

  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR
  let errors = null

  if (err instanceof ApiError) {
    if (err.status && err.status >= 100 && err.status < 600) {
      statusCode = err.status
      message = err.message
    }
  } else if (err instanceof ValidationError) {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY
    message = err.message
    errors = err.errors
  }

  res.status(statusCode)
    .end(
      {
        message: message,
        data: null,
        errors: errors
      } as ApiResponseFormat
    )
}
