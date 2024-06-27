import { z } from 'zod'

export const CreateUserPayloadSchema = z.object({
  name: z.string().min(2).max(32),
  age: z.number().min(16)
})
