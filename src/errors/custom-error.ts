/** `RFC 7807`: Problem Details for HTTP APIs */
export interface ProblemDetails {
  /** A URI reference [RFC3986] that identifies the problem type */
  type: string
  /** A short, human-readable summary of the problem type */
  title: string
  /** The HTTP status code generated by the origin server */
  status: number
  /** A human-readable explanation specific to this occurrence of the problem */
  detail?: string
  /** A URI reference that identifies the specific occurrence of the problem */
  instance?: string
  /** Additional properties specific to the problem type */
  [key: string]: any
}

/** `RFC 9457`: HTTP Problem Details extensions */
export interface ExtendedProblemDetails extends ProblemDetails {
  /** A list of specific errors related to the request's fields */
  errors?: { [field: string]: string[] }
}

export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): ExtendedProblemDetails
}
