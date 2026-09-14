import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
