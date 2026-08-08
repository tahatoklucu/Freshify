import { revalidateTag } from "next/cache";

/** Next.js 16: revalidateTag requires a cacheLife profile (stale-while-revalidate). */
export function revalidateCacheTag(tag: string) {
  revalidateTag(tag, "max");
}
