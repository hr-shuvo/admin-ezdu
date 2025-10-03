import { z } from "zod";

export const subjectSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, {message: "Class name is required"})
        .max(200, {message: "Class name must be less than 200 characters"}),
    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),
    segment: z.number({error: "Segment is required"}).min(1, {message: "Segment is required"}),
    groups: z.array(z.string()).optional(),
    subTitle: z.string().optional(),
    code: z.string().min(1, {message: "Class name is required"}),
    classId: z.number({error: "Class is required"}).min(1, {message: "Class is required"}),

});
