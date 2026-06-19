import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const articles = (await getCollection("articles")).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1,
  );

  return rss({
    title: "Lukeberry Pi Blog",
    description: "This is my blog",
    site: context.site ?? "https://lukeberrypi.com",
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.body,
      link: `/articles/${article.id}`,
      pubDate: new Date(article.data.date),
    })),
  });
}
