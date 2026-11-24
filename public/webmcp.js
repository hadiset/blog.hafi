// WebMCP tools (https://webmachinelearning.github.io/webmcp/): lets an AI agent in the browser
// query this site directly instead of scraping it. All tools are read-only.
// Plain JS in public/ (not bundled) so BaseLayout can import() it from a tiny inline check:
// it is downloaded only in browsers that expose a model context.

let siteData;

// Fetched only when an agent calls a tool, never on page load.
function loadSiteData() {
  siteData ??= fetch("/api/site.json").then((res) => {
    if (!res.ok) throw new Error(`Could not load site data (HTTP ${res.status})`);
    return res.json();
  });
  return siteData;
}

export function registerTools(modelContext) {
  const tools = [
    {
      name: "get_profile",
      title: "Get Hadi Setiawan's profile",
      description:
        "Returns Hadi Setiawan's professional profile: role, summary, location, availability (open to work), " +
        "contact links (email, LinkedIn, GitHub, CV PDF), career highlights, achievements and skills by category.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => (await loadSiteData()).profile,
    },
    {
      name: "search_articles",
      title: "Search blog articles",
      description:
        "Searches Hadi Setiawan's blog articles (web development, Laravel, JavaScript, Docker, Linux servers). " +
        "Matches the query against title, description and tags. Returns newest first.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Keywords to match, e.g. 'docker wordpress'. Omit to list all." },
          category: { type: "string", description: "Exact category to filter by, e.g. 'JavaScript'." },
          limit: { type: "integer", minimum: 1, maximum: 50, description: "Maximum results. Default 10." },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async (input) => {
        const { articles } = await loadSiteData();
        const words = String(input.query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
        const category = String(input.category ?? "").toLowerCase();
        const limit = Math.min(Math.max(Number(input.limit) || 10, 1), 50);
        const results = articles.filter((a) => {
          if (category && a.category.toLowerCase() !== category) return false;
          const haystack = `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase();
          return words.every((w) => haystack.includes(w));
        });
        return { total: results.length, articles: results.slice(0, limit) };
      },
    },
    {
      name: "list_showcase",
      title: "List showcase projects",
      description: "Lists Hadi Setiawan's design-to-code showcase projects (Figma designs sliced into responsive landing pages).",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => ({ projects: (await loadSiteData()).showcase }),
    },
  ];

  for (const tool of tools) {
    try {
      // registerTool returns a promise in the current spec and may throw synchronously in
      // older previews; failures must never break the page.
      Promise.resolve(modelContext.registerTool(tool)).catch(() => {});
    } catch {}
  }
}
