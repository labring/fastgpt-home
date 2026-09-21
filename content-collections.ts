import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const BLOG_LOCALES = ['en', 'zh'] as const;
const BLOG_CATEGORIES = ['product', 'engineering', 'industry'] as const;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const assetUrl = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => /^https?:\/\//i.test(value) || (value.startsWith('/') && !value.startsWith('//')),
    { message: 'Expected an https URL or a site-relative public asset path' }
  );
const localizedText = z.object({
  en: z.string().trim().min(1),
  zh: z.string().trim().min(1)
});

const authors = defineCollection({
  name: 'authors',
  directory: 'content/authors',
  include: '*.json',
  parser: 'json',
  schema: z.object({
    name: localizedText,
    avatar: assetUrl,
    description: localizedText
  }),
  transform: (document) => ({
    ...document,
    slug: document._meta.path
  })
});

const blogs = defineCollection({
  name: 'blogs',
  directory: 'content/blogs',
  include: '**/*.mdx',
  schema: z.object({
    category: z.enum(BLOG_CATEGORIES),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    thumbnail: assetUrl.optional(),
    author: z.string().regex(SLUG_PATTERN).optional(),
    draft: z.boolean().default(false),
    content: z.string()
  }),
  transform: async (document, context) => {
    const pathSegments = document._meta.path.split('/');
    const locale = pathSegments[0];
    const slug = pathSegments[1];

    if (!BLOG_LOCALES.includes(locale as (typeof BLOG_LOCALES)[number])) {
      throw new Error(`Blog ${document._meta.path}: locale must be en or zh`);
    }
    if (!slug || pathSegments.length !== 2 || !SLUG_PATTERN.test(slug)) {
      throw new Error(`Blog ${document._meta.path}: expected content/blogs/<locale>/<slug>.mdx`);
    }

    if (document.author) {
      const authorExists = context
        .documents(authors)
        .some((author) => author._meta.path === document.author);
      if (!authorExists) {
        throw new Error(`Blog ${document._meta.path}: unknown author ${document.author}`);
      }
    }

    return {
      ...document,
      locale,
      slug,
      dateModified: document.dateModified || document.date,
      mdx: await compileMDX(context, document, {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeKatex,
          [rehypePrettyCode, { theme: 'github-light', keepBackground: true }],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ]
      })
    };
  }
});

export default defineConfig({
  content: [authors, blogs]
});
