import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publish_date: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string().max(160),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    slug: z.string().optional()
  })
});

export const collections = {
  'blog': blogCollection
}