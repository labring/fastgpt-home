const test = require('node:test');
const assert = require('node:assert/strict');

test('blog MDX compiles math and code highlighting at build time', async () => {
  const [
    { compileMDX },
    remarkMath,
    rehypeKatex,
    rehypePrettyCode,
    rehypeSlug,
    rehypeAutolinkHeadings
  ] = await Promise.all([
    import('@content-collections/mdx'),
    import('remark-math'),
    import('rehype-katex'),
    import('rehype-pretty-code'),
    import('rehype-slug'),
    import('rehype-autolink-headings')
  ]);

  const mdx = await compileMDX(
    { cache: async (_input, compute) => compute(_input) },
    {
      _meta: {
        path: 'test/compile-check',
        filePath: 'test/compile-check.mdx',
        fileName: 'compile-check.mdx',
        directory: 'test',
        extension: 'mdx'
      },
      content: [
        '## A heading',
        '',
        'Inline $x^2$.',
        '',
        '$$E=mc^2$$',
        '',
        '```ts',
        'const answer = 42;',
        '```'
      ].join('\n')
    },
    {
      remarkPlugins: [remarkMath.default],
      rehypePlugins: [
        rehypeKatex.default,
        [rehypePrettyCode.default, { theme: 'github-dark', keepBackground: false }],
        rehypeSlug.default,
        [rehypeAutolinkHeadings.default, { behavior: 'wrap' }]
      ]
    }
  );

  assert.match(mdx, /katex/);
  assert.match(mdx, /data-rehype-pretty-code-figure/);
  assert.match(mdx, /answer/);
  assert.match(mdx, /href:"#a-heading"/);
});
