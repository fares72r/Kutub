import { z } from "zod";

export const reviewSchema = z.object({
  reviewerName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .trim()
    .min(5, "Comment must be at least 5 characters")
    .max(1000, "Comment must be at most 1000 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
