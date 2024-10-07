import {NextApiRequest, NextApiResponse} from "next"
import {createRouter} from "next-connect"
import {StatusCodes} from "http-status-codes"
import {ApiResponseFormat} from "@/types/response"

import {defaultNextConnectOptions} from "@/api-lib/next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get((_: NextApiRequest, res: NextApiResponse) => {
  res.status(StatusCodes.OK)
    .json(
      {
        message: 'Welcome to Temu Kampus API',
        data: null,
        errors: null
      } as ApiResponseFormat
    )
})

export default router.handler(defaultNextConnectOptions)
