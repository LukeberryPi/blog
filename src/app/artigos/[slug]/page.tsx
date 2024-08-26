import { getArticleData } from "@/src/lib/articles";
import { Article } from "../../../components/article";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articleData = await getArticleData(params.slug);

  return (
    <section>
      <div className="flex flex-col my-12">
        <h1 className="font-bold">{articleData.title}</h1>
        <span className="text-zinc-700">{articleData.date}</span>
      </div>
      <Article html={articleData.contentHtml}/>
    </section>
  );
}
