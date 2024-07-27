import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import { highlight } from "sugar-high";

export type Article = {
  id: string;
  title: string;
  date: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "src/articles");

export const getArticles = () => {
  const fileNames = fs.readdirSync(ARTICLES_DIR);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(ARTICLES_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getArticleData = async (id: string) => {
  const fullPath = path.join(ARTICLES_DIR, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do, YYYY"),
  };
};
