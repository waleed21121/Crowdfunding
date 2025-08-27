import z from "zod";

export const TransactionLogSchema = z.object({
    user_id: z
        .int({ message: 'User ID is required and must be an integer' })
        .gte(1, 'User ID must be a positive integer'),
    pledge_id: z
        .int({ message: 'User ID is required and must be an integer' })
        .gte(1, 'User ID must be a positive integer')
        .nullable()
        .optional(),
    amount: z
        .number({ message: 'Amount is required' })
        .min(1, 'The amount must be at least 1$'),
    type: z
        .enum(['pledge', 'refund', 'deposit'], 'Type must be one of: pledge, refund, deposit' ),
})

export type ITransactionLog = z.infer<typeof TransactionLogSchema>;