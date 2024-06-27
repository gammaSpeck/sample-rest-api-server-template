import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
  statusCode = 422
  // IANA reference
  type = 'https://www.rfc-editor.org/rfc/rfc9110.html#name-422-unprocessable-content'

  constructor(
    public instance: string,
    public errors: any[]
  ) {
    super('Unprocessable Content')
  }

  serializeErrors() {
    return {
      type: this.type,
      title: 'Unprocessable Content',
      status: this.statusCode,
      detail:
        'The server understands the content type of the request entity, but was unable to process the contained instructions.',
      instance: this.instance
      //
      // errors: {
      //   email: ['Email format is invalid.'],
      //   password: ['Password must be at least 8 characters long.'],
      //   username: ['Username is required.']
      // }
    }
  }
}
