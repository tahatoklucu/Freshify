export const CACHE_TAGS = {
  recipes: "recipes",
  recipe: (slug: string) => `recipe:${slug}`,
  categories: "categories",
  category: (slug: string) => `category:${slug}`,
  profile: (token: string) => `profile:${token}`,
} as const;
