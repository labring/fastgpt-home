# Industry hub filtering and pagination verification

Scope: [issue #343](https://github.com/labring/fastgpt-home/issues/343), checked on 2026-10-13.

## Content and browsing contract

The production Industry loader owns application-area classification, locale publication, summary fields, and destination URLs. Historical `finance-*` / `fin-*` identities resolve to `finance`; `biomed-*` resolves to `biomed`. Other identities declare `application_area: finance`, `biomed`, or `research` in hidden source metadata. Missing, unsupported, duplicate, and conflicting declarations fail loading with source context.

The hub emits the default twelve cards in static HTML and loads one locale-specific summary asset from `/industry-index/{locale}/index.json`. Counts, available filters, pagination, and the default ItemList derive from that same collection. The index contains slug, area, title, description, and href. Article bodies remain in article delivery. Scientific Research appears separately in each locale after its first article is published.

The focused regression uses production modules with compact fixtures to cover both Finance prefixes, pharmaceutical investment research, Biopharma, explicit Scientific Research, locale availability, classification failures, three-page traversal without duplicates, URL normalization, first-page rendering, accessible controls, owner routes, and ItemList parity. Export assertions compare the complete index and sitemap against the current loader and require every summary destination to have an HTML export.

## Reproduction

```sh
npm run verify:content-reuse
npx tsc --noEmit
npm run lint
node --conditions=react-server --test --test-name-pattern='React server rendering' scripts/verify-content-reuse.test.js

NEXT_PUBLIC_SITE_VARIANT=cn NEXT_PUBLIC_HOME_URL=https://fastgpt.cn NODE_OPTIONS=--max-old-space-size=8192 npm run build
NEXT_PUBLIC_SITE_VARIANT=cn INDUSTRY_EXPORT_DIR=out node --test scripts/verify-content-reuse.test.js
NEXT_PUBLIC_SITE_VARIANT=cn NEXT_PUBLIC_HOME_URL=https://fastgpt.cn npm run verify:i18n-seo

NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io NODE_OPTIONS=--max-old-space-size=8192 npm run build
NEXT_PUBLIC_SITE_VARIANT=io INDUSTRY_EXPORT_DIR=out node --test scripts/verify-content-reuse.test.js
NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run verify:i18n-seo

NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io node --test --test-concurrency=1 scripts/*.test.js scripts/lib/*.test.js
```

Run builds and the full test suite sequentially: existing release tests temporarily replace the workspace `out/` directory. An initial overlapping run caused an export `ENOENT`; subsequent verification separates those operations.
The full suite also needs the export's Site Variant explicitly: its sidebar CTA check defaults to China when configuration is absent. An unconfigured run against the International export requested a China-only FAQ; the check passed when rerun with `io`.

## Recorded results

- Strict TypeScript and repository ESLint passed.
- China and International production builds and i18n SEO verification passed. Each content-reuse run with completed export assertions passed all 13 applicable tests. The React server condition test passed separately.
- The final full suite, configured for the International export, passed 308 tests with zero failures. Its two conditional checks (React server rendering and Industry export) were exercised separately as recorded above.
- Two independent code reviews covered repository standards and issue requirements, with no actionable findings.

| Locale | Summaries | JSON bytes | gzip bytes | Brotli bytes | Hub HTML bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Simplified Chinese | 16,057 | 6,381,044 | 970,623 | 632,331 | 154,275 |
| English | 14,678 | 5,004,207 | 529,471 | 368,747 | 224,612 |

These are measurements of this content snapshot. Regression expectations derive from the current content loader, so future publications can change totals. Local gzip response preparation and delivery took 165–394 ms for Chinese data and 49–52 ms for English data; this measures the local server, with production network behavior left to release verification. After loading, filter and pagination actions issued no additional summary requests.

## Browser acceptance

Chrome was operated against local static hub snapshots with the generated JavaScript and summary assets. A local server applied gzip and could delay or fail the summary response.

- Chinese All: 16,057 articles, 1,339 pages. Finance: 10,080 articles, 840 pages. Biopharma: 5,977 articles, 499 pages. Scientific Research stays hidden with zero published articles.
- Finance page two displayed identities 13–24. Back and Forward restored page one and page two. Switching to Biopharma reset to page one; returning to All removed the area parameter.
- Biopharma page 499 displayed its sole remaining article, `biomed-d013-c106-f015`, with Next disabled. Refresh restored that selection after loading.
- `?industry=research&page=1.5&utm_source=qa` normalized to All page one while retaining `utm_source=qa`.
- An eight-second delayed response retained twelve usable first-page links, disabled browsing controls, and accurate loading copy. A forced HTTP 503 displayed Retry; retrying a successful response restored the originally requested Finance page two.
- Keyboard Tab/Shift+Tab exposed visible focus. Enter selected an area and activated page two; result-heading focus and the live result status updated.
- At 320 CSS pixels, cards used one column, controls remained usable, and pagination wrapped within the viewport. Desktop cards retained the existing two-column layout.
- English All showed 14,678 articles across 1,224 pages; Finance showed 9,000 across 750 pages, and Biopharma showed 5,678 across 474 pages. Direct Finance page-two navigation, filter reset, refresh, Back/Forward, and returning to All passed. Biopharma's final page held the remaining two articles with Next disabled.
- The English link `?industry=research&page=999999` normalized to All page 1,224, with the URL and controls agreeing. The English layout also remained usable at 320 CSS pixels.

Local snapshot navigation prefetches for unrelated pages returned 404 because the snapshot server held only the hub assets. Those responses are outside the feature's summary-loading path.

## Verification boundaries

Browser checks cover Chrome desktop and its responsive device emulation. Accessibility checks cover keyboard operation and rendered ARIA semantics; spoken output in a screen reader and physical mobile devices were not exercised. Production deployment and production-network latency remain release-stage checks.

## Related reading follow-up (2026-10-14)

Chinese and English problem, scenario, and workflow articles now render a localized Continue reading section after the body. Each article links to up to three distinct published articles in its own locale and application area, excluding itself. Small pools show their available candidates; empty pools hide the section.

The loader orders each locale/area pool by a SHA-256 rank of its slugs and takes the next three entries cyclically. A fixed collection produces stable recommendations across reloads, builds, source enumeration, and filename changes. Adding or removing articles can update the selection. Every article in a pool with at least two entries receives an incoming recommendation. The shared article component reuses existing related-card styles and emits ordinary links into static HTML.

Regression fixtures exercise all three page types, locale/area isolation, zero through three candidates, uniqueness, source-order stability, deletion, incoming-link coverage, localized labels, and owner/preview paths. Completed-export checks read every Industry article and compare its rendered recommendations with the production loader.

- China production build and i18n SEO verification passed. Completed-export checks passed all 15 applicable tests, covering 16,057 articles and 48,171 related links.
- Chinese Chrome checks passed for all three page types. Reload preserved the same recommendations; keyboard Tab exposed visible focus and Enter opened the selected article. At 320 CSS pixels, the cards retained readable wrapped titles and stayed within the viewport.
- International production build and i18n SEO verification passed. Completed-export checks passed all 15 applicable tests, covering 14,678 articles and 44,034 related links. Its first build attempt stopped in the existing Google Fonts loader; an unchanged retry completed successfully.
- English Chrome checks passed at desktop and 320 CSS pixels: localized labels and long titles rendered correctly, reload retained the three recommendations, and selecting a card opened its article.
- Strict TypeScript, repository ESLint, and the React server condition check passed. Standards and specification reviews found no actionable issues in the follow-up.
- The final full suite passed 310 tests with zero failures; both conditional checks were exercised separately through the completed-export and React server runs above.
