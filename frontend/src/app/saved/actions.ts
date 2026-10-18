"use server";

import { cookies } from "next/headers";
import {
  getSavedSlugs,
  MAX_SAVED,
  SAVED_COOKIE,
  SLUG_PATTERN,
} from "@/lib/saved";

export async function toggleSaved(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return;

  const current = await getSavedSlugs();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [slug, ...current].slice(0, MAX_SAVED);

  const store = await cookies();
  store.set(SAVED_COOKIE, next.join(","), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}
