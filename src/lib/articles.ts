import { getCollection } from "astro:content";

// Newest first. Drafts (`draft: true`) only show up in `bun dev`: production
// builds leave them out, so they get no page, no RSS entry and no home-page slot.
export async function getArticles() {
  const articles = await getCollection(
    "articles",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return articles.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}
