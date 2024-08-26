import { Article, getArticles } from "@/src/lib/articles";
import moment from "moment";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = getArticles();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="my-12 font-bold">Artigos</h1>
        
      </div>
      <section className="flex flex-col divide-y divide-zinc-300 w-full">
        {articles.map((article: Article) => (
          <Link
            className="flex items-center justify-between w-full py-2 hover:bg-zinc-100 px-4"
            key={article.id}
            href={`/articles/${article.id}`}
          >
            {article.title}{" "}
            <span className="text-zinc-500">
              {moment(article.date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}