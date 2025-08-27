import { z } from 'zod'

export const IDSchema = z.object({
    id: z
    .coerce.number({message: "ID must be a number"})
    .min(1, "ID must be positive integer")
})