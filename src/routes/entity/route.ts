import { Router, Request, Response } from 'express'

import { SuccessResponse } from '@/libs/success-response'
import { log } from '@/libs/logger'
import { UserPayloadSchema } from './validate'
import { validateRequest } from '@/middlewares/validate-request'

const router = Router()
const ENDPOINT = '/entity' as const

router.post(ENDPOINT, async (req: Request, res: Response) => {
  log.info('Controller', ENDPOINT)

  const info = validateRequest(UserPayloadSchema, req.body, req.path)

  // const data = await yfAxios.get(ENDPOINT, queryParams)
  console.log('info', info)
  SuccessResponse.send({ res, data: info, status: 201 })
})

export { router as entityRoutes }
