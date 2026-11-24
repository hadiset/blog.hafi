// Single source for profile facts and copy. Rules: docs/design-guide.md.

export const profile = {
  name: "Hadi Setiawan",
  role: "Full Stack Web Developer · Server Administrator",
  summary:
    "I build Laravel and Node.js web apps and keep the Linux servers behind them fast, secure and cheap to run.",
  location: "Semarang, Indonesia",
  remote: "Open to remote",
  openToWork: true,
  email: "work@hadiset.com",
  cv: "/cv-hadi-setiawan.pdf",
  linkedin: "https://www.linkedin.com/in/hadi-set",
  github: "https://github.com/hadiset",
};

export const highlights = [
  { value: "6+", label: "years in web development" },
  { value: "11+", label: "years in IT, since 2014" },
  { value: "10+", label: "production VPS managed" },
  { value: "−15%", label: "monthly hosting cost" },
  { value: "100k+", label: "orders in a custom Laravel CRM" },
  { value: "90+", label: "Core Web Vitals on the main landing page" },
];

export const achievements = [
  "Built an internal Laravel CRM (TALL stack) for 100,000+ order records; key reports went from hours to seconds.",
  "Cut monthly hosting costs 15% by consolidating 10+ DigitalOcean droplets.",
  "Raised the main landing page to 90+ Core Web Vitals and an 80%+ landing page view rate from Meta Ads.",
  "Automated WordPress deployment and set up monitoring, security and backups across servers.",
];

export const skills = [
  {
    group: "web",
    label: "Web Development",
    items: ["Laravel", "Livewire", "Alpine.js", "PHP", "Node.js", "Express", "TypeScript", "Zod", "Vitest", "Tailwind CSS", "REST API"],
  },
  {
    group: "devops",
    label: "Server & DevOps",
    items: ["Linux", "VPS", "NGINX", "Apache", "Docker", "Shell scripting", "SSL & security", "Backup & monitoring", "Cron"],
  },
  {
    group: "database",
    label: "Databases",
    items: ["MySQL", "MariaDB", "PostgreSQL", "Redis", "MongoDB", "Prisma", "Eloquent", "Indexing & tuning"],
  },
  {
    group: "cms-tools",
    label: "CMS & Tools",
    items: ["WordPress", "Plugin customization", "Git", "VS Code"],
  },
  {
    group: "network",
    label: "Networking",
    items: ["MikroTik", "Routers & switches", "LAN / Wi-Fi", "CCTV systems"],
  },
];
