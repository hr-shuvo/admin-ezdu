import { z } from "zod";

export const questionSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Question text is required"})
        .max(100, {message: "Question text must be less than 100 characters"}),
    questionType: z.number({error: "Type is required"}).min(1, {message: "Type is required"}),
    passage: z.string().optional(),

    subjectId: z.number({error: "Subject is required"}).min(1, {message: "Subject is required"}),
    lessonId: z.number({error: "Lesson is required"}).min(1, {message: "Lesson is required"}),
    topicId: z.number({error: "Topic is required"}).min(1, {message: "Topic is required"}),

    examId: z.number().optional(),

    explanation: z.string().optional(),
    hint: z.string().optional(),
    marks: z.number().optional(),
    difficultyLevel: z.number().optional(),

    options: z.array(z.object({
        id: z.number().optional(),
        name: z.string().min(1, {message: "Option text is required"}),
        isCorrect: z.boolean(),
        questionId: z.number().optional(),
    })).min(2, {message: "At least two options are required"})
        .refine((option) => option.some((opt) => opt.isCorrect), {
        message: "At least one option must be correct",
    }),

    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),
});