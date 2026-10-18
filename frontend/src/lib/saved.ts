import { cookies } from "next/headers";

export const SAVED_COOKIE = "kutub_saved";
export const MAX_SAVED = 50;
export const SLUG_PATTERN = /^[a-z0-9-]{1,100}$/;

export async function getSavedSlugs(): Promise<string[]> {
  const store = await cookies();
  const raw = store.get(SAVED_COOKIE)?.value ?? "";
  return raw
    .split(",")
    .filter((s) => SLUG_PATTERN.test(s))
    .slice(0, MAX_SAVED);
}
