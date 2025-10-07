import { z } from "zod";

export const topicContentSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Topic name is required"})
        .max(200, {message: "Topic name must be less than 200 characters"}),
    type: z.number({error: "Type is required"}).min(1, {message: "Type is required"}),
    content: z.string().optional(),
    order: z.number().optional(),
    subjectId: z.number({error: "Subject is required"}).min(1, {message: "Subject is required"}),
    lessonId: z.number({error: "Lesson is required"}).min(1, {message: "Lesson is required"}),
    topicId: z.number({error: "Topic is required"}).min(1, {message: "Topic is required"}),
    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),

});