import { NextFunction, Request, Response } from 'express'
import { Schema } from 'zod'

import { log } from '@/libs/logger'

/**
 * Refer http://json-schema.org/understanding-json-schema/UnderstandingJSONSchema.pdf to build proper schemas
 */
export const validateRequest = async (
  req: Request,
  _: Response,
  next: NextFunction,
  schema: Schema,
  payload: any
) => {
  log.info('Validator Validating :::', { path: req.path, schema, payload })

  // const finalSchema = { ...baseSchema, required: Object.keys(schema), properties: { ...schema } }

  // const isValid: boolean = await ajv.validate(finalSchema, payload)
  // const valErrors = !isValid ? ajv.errors : []

  // if (!isValid) throw new RequestValidationError(valErrors as ErrorObject[])
}
