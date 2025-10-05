import { z } from "zod";

export const lessonSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Class name is required"})
        .max(200, {message: "Class name must be less than 200 characters"}),
    subTitle: z.string().optional(),
    content: z.string().optional(),
    subjectId: z.number({error: "Subject is required"}).min(1, {message: "Subject is required"}),
    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),

});
