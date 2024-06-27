import { z } from 'zod'

// creating a schema for strings
export const UserPayloadSchema = z.object({
  name: z.string().min(2).max(32),
  age: z.number().min(16)
})

// // parsing
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError

// // "safe" parsing (doesn't throw error if validation fails)
// mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
// mySchema.safeParse(12); // => { success: false; error: ZodError }
