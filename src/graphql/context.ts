import type { User } from '@prisma/client'
import type { IncomingMessage } from 'http'
import { getSession } from 'next-auth/react'

import { prisma } from '~/libs/prisma'

export type Context = {
  prisma: typeof prisma
  currentUser: User | null
}

export const createContext = async ({
  req,
}: {
  req: IncomingMessage
}): Promise<Context> => {
  const session = await getSession({
    req,
  })
  const email = session?.user?.email
  const currentUser = email
    ? await prisma.user.findUnique({
        where: {
          email,
        },
      })
    : null
  return { prisma, currentUser }
}
