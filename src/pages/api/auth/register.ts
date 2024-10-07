import {createRouter} from "next-connect"
import {NextApiRequest, NextApiResponse} from "next"
import {StatusCodes} from "http-status-codes"
import {ApiResponseFormat} from "@/types/response"
import bcrypt from 'bcryptjs'

import {defaultNextConnectOptions} from "@/api-lib/next-connect"
import {handleApiError} from "@/api-lib/error"
import {getMongoDb} from "@/api-lib/mongodb"
import {registerSchema} from "@/api-lib/validations/register.validation"


const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the request
    await registerSchema.validate(req.body)

    const {name, email, password} = req.body

    const db = await getMongoDb()

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({email})
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json(
          {
            message: 'User already exists',
            data: null,
            errors: null
          } as ApiResponseFormat
        )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BYCRYPT_SALT) || 12)

    // Save the new user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword
    })

    return res.status(StatusCodes.CREATED)
      .json(
        {
          message: 'User registered successfully',
          data: {
            id: result.insertedId
          }
        } as ApiResponseFormat
      )
  } catch (err) {
    return handleApiError(err, req, res)
  }
})

export default router.handler(defaultNextConnectOptions)
