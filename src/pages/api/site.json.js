import { getCollection } from "astro:content";
import { profile, highlights, achievements, skills } from "../../data/profile";
import { projects } from "../../data/showcase";

// Structured site data for AI agents. Read by the WebMCP tools (src/scripts/webmcp.ts) when an
// agent calls them, and listed in /.well-known/ard.json. Generated at build time.
export async function GET(context) {
  const site = context.site ?? new URL("http://localhost:4321");
  const url = (path) => new URL(path, site).href;

  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publish_date.getTime() - a.data.publish_date.getTime())
    .map((post) => ({
      title: post.data.title,
      url: url(`/blog/${post.id}/`),
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publish_date.toISOString().slice(0, 10),
    }));

  const data = {
    profile: {
      name: profile.name,
      role: profile.role,
      summary: profile.summary,
      location: profile.location,
      remote: profile.remote,
      openToWork: profile.openToWork,
      contact: {
        email: profile.email,
        linkedin: profile.linkedin,
        github: profile.github,
        cv: url(profile.cv),
      },
      highlights: highlights.map((h) => `${h.value} ${h.label}`),
      achievements,
      skills: Object.fromEntries(skills.map((g) => [g.label, g.items])),
    },
    articles: posts,
    showcase: projects.map((p) => ({
      title: p.title,
      url: url(`/showcase/${p.slug}/`),
      tags: p.tags,
      description: "Figma design sliced into a responsive landing page.",
    })),
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
