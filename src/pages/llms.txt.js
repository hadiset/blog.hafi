import { getCollection } from "astro:content";
import { profile, highlights, skills } from "../data/profile";
import { projects } from "../data/showcase";

// /llms.txt (https://llmstxt.org): a Markdown index of the site for LLMs and AI agents.
// Generated at build time so new posts and showcase projects are picked up automatically.
export async function GET(context) {
  const site = context.site ?? new URL("http://localhost:4321");
  const url = (path) => new URL(path, site).href;

  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publish_date.getTime() - a.data.publish_date.getTime());

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role}. ${profile.summary} Based in ${profile.location} (${profile.remote.toLowerCase()}).${profile.openToWork ? " Open to work." : ""}`,
    "",
    `Highlights: ${highlights.map((h) => `${h.value} ${h.label}`).join("; ")}.`,
    "",
    `Skills: ${skills.map((g) => `${g.label}: ${g.items.join(", ")}`).join(". ")}.`,
    "",
    "## Profile",
    "",
    `- [Homepage](${url("/")}): overview, highlights, skills, latest work`,
    `- [CV (PDF)](${url(profile.cv)}): full work history and education`,
    `- [Email](mailto:${profile.email}): contact for job opportunities`,
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.data.title}](${url(`/blog/${p.id}/`)}): ${p.data.description}`),
    "",
    "## Showcase",
    "",
    ...projects.map((p) => `- [${p.title}](${url(`/showcase/${p.slug}/`)}): ${p.tags.join(", ")}; Figma design sliced into a responsive landing page`),
    "",
    "## Optional",
    "",
    `- [RSS feed](${url("/rss.xml")})`,
    `- [Sitemap](${url("/sitemap-index.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
