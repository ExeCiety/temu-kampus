import {createRouter} from "next-connect"
import {NextApiRequest, NextApiResponse} from "next"
import {StatusCodes} from "http-status-codes"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

import {defaultNextConnectOptions} from "@/api-lib/next-connect"
import {handleApiError} from "@/api-lib/error"
import {getMongoDb} from "@/api-lib/mongodb"
import {loginSchema} from "@/api-lib/validations/login.validation"
import {ApiResponseFormat} from "@/types/response"

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the request
    await loginSchema.validate(req.body)

    const {email, password} = req.body

    const db = await getMongoDb()

    // Find user with the given email
    const user = await db.collection('users').findOne({email})
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json(
          {
            message: 'User not found',
            data: null,
            errors: null
          } as ApiResponseFormat
        )
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json(
          {
            message: 'Invalid password',
            data: null,
            errors: null
          } as ApiResponseFormat
        )
    }

    // Create JWT token
    const token = jwt.sign(
      {userId: user._id},
      process.env.JWT_SECRET || '',
      {expiresIn: '1h'}
    )

    return res.status(StatusCodes.CREATED)
      .json(
        {
          message: 'Login successful',
          data: {
            token: token
          },
          errors: null
        } as ApiResponseFormat
      )
  } catch (err) {
    return handleApiError(err, req, res)
  }
})

export default router.handler(defaultNextConnectOptions)
