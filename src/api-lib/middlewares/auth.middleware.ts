import {NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import {StatusCodes} from "http-status-codes"
import {NextHandler} from "next-connect"

import {ApiResponseFormat} from "@/types/response"
import {JwtPayload} from "@/types/jsonwebtoken"
import {ExtendedNextApiRequest} from "@/types/next-api-request"

export const authMiddleware = async (
  req: ExtendedNextApiRequest, res: NextApiResponse, next: NextHandler
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json(
        {
          message: 'Authentication required',
          data: null,
          errors: null
        } as ApiResponseFormat
      )
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload
    req.user = {_id: decoded.userId}
    next()
  } catch (err) {
    console.log(err)

    return res.status(StatusCodes.UNAUTHORIZED).json(
      {
        message: 'Invalid or expired token',
        data: null,
        errors: null
      } as ApiResponseFormat
    )
  }
}
