import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publish_date.getTime() - a.data.publish_date.getTime());

  return rss({
    title: "Hadi Setiawan | Blog",
    description: "Notes on Laravel, JavaScript, Docker and Linux servers from a full stack developer and server administrator.",
    site: context.site ?? "http://localhost:4321",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publish_date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: `work@hadiset.com (${post.data.author})`,
    })),
  });
}
