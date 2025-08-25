import { z } from 'zod';

export const UserSchema = z.object({
    email: z
        .string({ message: 'Email is required' })
        .email('Email must be a valid email address')
        .max(255, 'Email must not exceed 255 characters'),
    password: z
        .string({ message: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(255, 'Password must not exceed 255 characters'),
    balance: z
        .number({ message: 'Balance is required' })
        .gte(0, 'Balance must be non-negative')
        .default(0.00),
    name: z
        .string({ message: 'Name is required' })
        .min(4, 'Name must be at least 4 characters')
        .max(100, 'Name must not exceed 100 characters'),
    isVerified: z
        .boolean()
        .default(false)
        .optional(),
    verifyToken: z
        .string()
        .optional()
})

export type IUser = z.infer<typeof UserSchema>;