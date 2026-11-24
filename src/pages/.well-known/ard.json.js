import { profile } from "../../data/profile";

// Agentic Resource Discovery manifest (ARD v0.91, https://agenticresourcediscovery.org/spec/).
// Lists the machine-readable resources this site offers to AI agents. Also linked from every
// page with <link rel="ard">. Validated against the ARD conformance rules Lighthouse uses:
// each entry needs identifier (urn:air:<publisher>:...), displayName, type, and exactly one of
// url/data; 2-5 representativeQueries avoid a warning. Only application/* media types: the
// validator warns on non-standard types outside application/ (text/markdown, text/html), so
// llms.txt is left to its own discovery path.
export async function GET(context) {
  const site = context.site ?? new URL("http://localhost:4321");
  const url = (path) => new URL(path, site).href;
  const publisher = site.hostname;
  const id = (name) => `urn:air:${publisher}:site:${name}`;
  const updatedAt = new Date().toISOString();

  const entries = [
    {
      identifier: id("data"),
      displayName: `${profile.name}: profile, articles and projects (JSON)`,
      type: "application/json",
      url: url("/api/site.json"),
      description:
        "Structured profile (role, availability, contact, highlights, skills), blog articles and showcase projects. " +
        "The same data is available in-page through read-only WebMCP tools: get_profile, search_articles, list_showcase.",
      tags: ["portfolio", "profile", "blog", "json"],
      updatedAt,
      representativeQueries: [
        "is Hadi Setiawan open to work and how can I contact him",
        "what skills and experience does Hadi Setiawan have",
        "find Hadi Setiawan's articles about Docker or JavaScript",
      ],
    },
    {
      identifier: id("cv"),
      displayName: `${profile.name}: CV (PDF)`,
      type: "application/pdf",
      url: url(profile.cv),
      description: `${profile.role}. Full work history, skills and education.`,
      tags: ["cv", "resume", "hiring"],
      representativeQueries: [
        "download Hadi Setiawan's CV",
        "what is Hadi Setiawan's work history",
      ],
    },
    {
      identifier: id("rss"),
      displayName: `${profile.name}: blog RSS feed`,
      type: "application/rss+xml",
      url: url("/rss.xml"),
      description: "Feed of new blog articles on web development and running Linux servers.",
      tags: ["blog", "rss"],
      representativeQueries: [
        "subscribe to Hadi Setiawan's blog",
        "latest articles from Hadi Setiawan",
      ],
    },
  ];

  return new Response(JSON.stringify({ entries }, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
