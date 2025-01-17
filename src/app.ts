import express, { type Request, type Response } from 'express'
import 'express-async-errors' // This handles all async errors seamlessly
import helmet from 'helmet'
import compression from 'compression'

import { SuccessResponse } from '@/libs/success-response'
import { NotFoundError } from '@/errors/not-found-error'
import { mInitCLS } from '@/middlewares/cls'
import { mErrorHandler } from '@/middlewares/error-handler'

import { allRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())

// Setup CLS first
app.use(mInitCLS)

// We do this, as we use a ingress as proxy. To trust the proxy, this line is needed
// X-Forwarded-For will be used to determine users exact IP
app.set('trust proxy', true)
app.use('/api', allRoutes)

app.get('/healthcheck', async (_: Request, res: Response) => {
  SuccessResponse.send({
    res,
    title: '⚡⚡⚡ Hello ⚡⚡⚡ - Server is healthy 💗'
  })
})

// // For all other routes, it throws a 404 error
app.all('*', async (req: Request) => {
  throw new NotFoundError('Route not found', 'The requested route does not exist', req.path)
})

app.use(mErrorHandler)

export { app }
