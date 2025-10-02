import { z } from "zod";

export const classSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, { message: "Class name is required" })
        .max(100, { message: "Class name must be less than 100 characters" }),
    status: z.union([
        z.literal(0),
        z.literal(-1),
        z.literal(-404)
    ]),
    segment: z.number().min(1, { message: "Segment is required" }),
    groups: z.array(z.string()).optional()
});
