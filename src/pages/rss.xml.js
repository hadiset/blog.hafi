import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import astroConfig from "../../astro.config.mjs";

export async function GET() {
  const posts = await getCollection('blog');

  return rss({
    title: "Hafi's Blog",
    description: 'A blog about my personal notes during my learning journey.',
    site: astroConfig.site? astroConfig.site : 'http://localhost:4321',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publish_date,
      description: post.data.description,
      link: `/${post.slug}/`,
    }))
  });
}