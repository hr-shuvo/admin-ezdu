import { z } from "zod";

export const quizSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Quiz text is required"})
        .max(200, {message: "Quiz text must be less than 200 characters"}),
    description: z.string().optional(),
    type: z.number({error: "Type is required"}).min(1, {message: "Type is required"}),

    totalMarks: z.number().optional(),
    passingMarks: z.number().optional(),
    durationInMinutes: z.number().optional(),

    hasNegativeMarks: z.boolean().optional(),
    startTime: z.string().min(1, {message: "Date is required"}),

    questionIds: z.array(z.number()).optional(),

    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),
});