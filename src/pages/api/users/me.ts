import {createRouter} from "next-connect"
import {NextApiResponse} from "next"
import {StatusCodes} from "http-status-codes"
import {ObjectId} from 'mongodb'

import {defaultNextConnectOptions} from "@/api-lib/next-connect"
import {handleApiError} from "@/api-lib/error"
import {getMongoDb} from "@/api-lib/mongodb"
import {authMiddleware} from "@/api-lib/middlewares/auth.middleware"
import {ApiResponseFormat} from "@/types/response"
import {ExtendedNextApiRequest} from "@/types/next-api-request"

const router = createRouter<ExtendedNextApiRequest, NextApiResponse>()

router
  .use(authMiddleware)
  .get(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      const {_id} = req.user

      const db = await getMongoDb()

      // Find user with the given id
      const user = await db.collection('users').findOne({_id: new ObjectId(_id)})
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND)
          .json(
            {
              message: 'User not found',
              data: null,
              errors: null
            } as ApiResponseFormat
          )
      }

      return res.status(StatusCodes.CREATED)
        .json(
          {
            message: 'Login successful',
            data: {
              user: {
                _id: user._id,
                name: user.name,
                email: user.email
              }
            },
            errors: null
          } as ApiResponseFormat
        )
    } catch (err) {
      return handleApiError(err, req, res)
    }
  })

export default router.handler(defaultNextConnectOptions)
