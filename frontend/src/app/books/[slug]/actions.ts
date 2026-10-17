"use server";

import { revalidatePath } from "next/cache";
import { reviewSchema } from "@/lib/validation";

export type ReviewFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"reviewerName" | "rating" | "comment", string>>;
};

export async function submitReview(
  bookDocumentId: string,
  slug: string,
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    reviewerName: formData.get("reviewerName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        reviewerName: fieldErrors.reviewerName?.[0],
        rating: fieldErrors.rating?.[0],
        comment: fieldErrors.comment?.[0],
      },
    };
  }

  const res = await fetch(
    `${process.env.STRAPI_URL}/api/reviews?status=draft`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { ...parsed.data, book: { connect: [bookDocumentId] } },
      }),
    },
  );

  if (!res.ok) {
    console.error("Strapi error:", res.status, await res.text());
    return {
      status: "error",
      message: "Could not submit your review. Please try again.",
    };
  }

  revalidatePath(`/books/${slug}`);
  return {
    status: "success",
    message: "Thanks! Your review was submitted.",
  };
}
