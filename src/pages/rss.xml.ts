import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getArticles } from "../lib/articles";

export async function GET(context: APIContext) {
  const articles = await getArticles();

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
