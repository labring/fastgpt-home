const { execFileSync } = require('node:child_process');
const path = require('node:path');
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

test('generated blog records expose heading TOC data with matching slugs', async () => {
  execFileSync(process.execPath, [path.join(__dirname, 'generate-content-collections.js')], {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore'
  });

  const { allBlogs } = await import(
    `../.content-collections/generated/index.js?toc-test=${Date.now()}`
  );
  const post = allBlogs.find((blog) => blog.slug === 'fastgpt-permission-system-design-evolution');

  assert(post, 'Expected the Chinese blog fixture');
  assert.deepEqual(post.toc.slice(0, 3), [
    { id: '引言', title: '引言', depth: 2 },
    { id: '1-第一性原理实体与关系的抽象', title: '1. 第一性原理：实体与关系的抽象', depth: 2 },
    { id: '2-技术选型混合权限模型', title: '2. 技术选型：混合权限模型', depth: 2 }
  ]);
  assert.equal(
    post.toc.some((item) => item.depth === 3),
    true
  );
});
