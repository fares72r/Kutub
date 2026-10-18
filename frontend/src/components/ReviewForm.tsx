"use client";

import { useActionState } from "react";
import { submitReview, type ReviewFormState } from "@/app/books/[slug]/actions";

const initialState: ReviewFormState = { status: "idle" };

export default function ReviewForm({
  bookDocumentId,
  slug,
}: {
  bookDocumentId: string;
  slug: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitReview.bind(null, bookDocumentId, slug),
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <h3 className="font-serif text-xl font-semibold">Write a review</h3>

      <div>
        <label htmlFor="reviewerName" className="block text-sm font-medium">
          Your name
        </label>
        <input
          id="reviewerName"
          name="reviewerName"
          type="text"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
        />
        {state.errors?.reviewerName && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.reviewerName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue="5"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
        {state.errors?.rating && (
          <p className="mt-1 text-sm text-red-600">{state.errors.rating}</p>
        )}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
        />
        {state.errors?.comment && (
          <p className="mt-1 text-sm text-red-600">{state.errors.comment}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Submitting..." : "Submit review"}
      </button>

      {state.message && (
        <p
          className={
            state.status === "success" ? "text-primary" : "text-red-600"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
