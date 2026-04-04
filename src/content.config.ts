/// <reference types="astro" />
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const now = defineCollection({
  loader: glob({ pattern: "now.md", base: "./src/data" }),
  schema: z.object({
    updatedAt: z.date().optional(),
    title: z.string().default("Now"),
    description: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ({ image }: any) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog, now };
