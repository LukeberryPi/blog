const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('SITE_URL:', process.env.SITE_URL); // Verification

const postsDirectory = path.join(process.cwd(), 'src', 'articles');

function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      content: content,
      slug: fileName.replace(/\.md$/, ''),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function generateRSS() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const feedUrl = `${siteUrl}/rss.xml`;

  const feed = new RSS({
    title: 'Lukeberry Pi Blog',
    description: 'This is my blog',
    feed_url: feedUrl,
    site_url: siteUrl,
    language: 'en',
  });

  const posts = getPosts();

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `${siteUrl}/articles/${post.slug}`,
      date: post.date,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
}

generateRSS();