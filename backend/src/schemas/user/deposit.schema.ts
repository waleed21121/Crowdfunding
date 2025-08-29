import z from "zod";

export const DepositSchema = z.object({
    balance: z
        .coerce
        .number({message: "The balance must be a positive integer"})
        .gt(0, "The balance must be a positive integer")
})

export type IDeposit = z.infer<typeof DepositSchema>