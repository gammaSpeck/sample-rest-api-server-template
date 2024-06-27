import { Router, Request, Response } from 'express'

import { SuccessResponse } from '@/libs/success-response'
import { log } from '@/libs/logger'
import { UserPayloadSchema } from './validate'

const router = Router()
const ENDPOINT = '/entity' as const

router.get(ENDPOINT, async (req: Request, res: Response) => {
  log.info('Controller', ENDPOINT)

  const info = UserPayloadSchema.safeParse(req.body)

  // const data = await yfAxios.get(ENDPOINT, queryParams)
  console.log('info', info)
  SuccessResponse.send({ res, data: info, status: 201 })
})

export { router as entityRoutes }
