import 'next-auth'
import '@auth/core/jwt'

import { User as ModelUser } from '@prisma/client'

declare module 'next-auth' {
  interface User extends ModelUser {
    //
  }

  interface Session {
    user?: User;
  }

  interface JWT extends BaseUser {

  }
}
