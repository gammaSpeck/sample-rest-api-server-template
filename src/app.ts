import express, { type Request, type Response } from 'express'
import 'express-async-errors' // This handles all async errors seamlessly
import helmet from 'helmet'
import compression from 'compression'
import { json } from 'body-parser'

import { mErrorHandler } from './middlewares/error-handler'
import { SuccessResponse } from './libs/success-response'
import { NotFoundError } from './errors/not-found-error'

import { allRoutes } from './routes'
import { mInitCLS } from './middlewares/cls'

const app = express()

app.use(json())
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
