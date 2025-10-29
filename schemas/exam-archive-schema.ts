import { z } from "zod";

export const archiveSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Exam name is required"})
        .max(200, {message: "Exam name must be less than 200 characters"}),
    classId: z.number().optional(),
    subjectId: z.number({error: "Subject is required"}).min(1, {message: "Subject is required"}),
    instituteId: z.number().optional(),
    year: z.number().optional(),
    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),

});