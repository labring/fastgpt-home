# CI and rendering ablation

Baseline: `2d39d3e39e208403e55bd3cb97b73931ec3bbd05`.

## Findings and changes

Preview already performs one CRM-disabled build. Its largest avoidable work was
inside static rendering: the localized layout serialized the full dictionary into
a client component, and 19,775 article routes plus two Industry hubs rendered an
extra Navbar and language dialog.

- Pass only `links` and `navCta` across the client boundary. These props contain
  approximately 2% of the former dictionary payload across all nine locales.
- Recognize Industry, Reference, Model, and Glossary pages as owning their layout.
  Each affected page now renders one Navbar. Remove the identical localized 404
  wrapper and inherit the root recovery component.
- Remove Preview's separate filing-link assertion and recursive submodule checkout;
  enable npm download caching. Retain public filing configuration, the build,
  CRM-disabled boundary, and artifact identity/integrity checks.
- Remove development regression suites and historical G1/G2 acceptance from the
  default release gate. Preserve their standalone commands. Remove repeated FAQ
  registry, case-only HTTP, per-variant Guide source, and production cardinality
  checks already covered by retained gates.
- Use `npm run build` directly in both coordinators and remove the forwarding alias.

The shared release source plan changes from 46 to 18 steps; CN export checks from
21 to 19 and IO from 22 to 20. These are release-coordinator changes; PR Preview
does not execute that source plan. Source-record reuse and artifact sealing require
every retained check to pass.

## Controlled local comparison

Both runs used Node 24.13.0, Next 16.3.2, nine workers, the same Preview public
configuration, and a cleared Next compilation cache. Timing covers
`npm run build:preview`, including generation, postprocessing, and artifact packaging.
Preview artifacts retain the measured build duration, post-RSC-cleanup file count, removed
RSC payload count, HTML count/bytes, and exported artifact count/bytes for the next comparison.

| Measurement | Baseline | Final | Reduction |
| --- | ---: | ---: | ---: |
| Build and packaging | 686.226 s | 421.355 s | 38.60% |
| Static generation, rounded Next log | 5.6 min | 3.0 min | — |
| Generated Next pages | 27,854 | 27,854 | 0 |
| Exported HTML routes | 27,697 | 27,697 | 0 |
| HTML bytes | 9,358,584,583 | 6,321,386,802 | 32.45% |
| Sum of individually gzipped HTML bytes | 1,269,321,284 | 918,291,685 | 27.65% |

This is one before/after observation of the combined changes. It establishes no
individual timing attribution or hosted-CI speed guarantee. The gzip measurement
describes HTML only; it is separate from the uploaded artifact size. The prior
hosted run [36378446013](https://github.com/labring/fastgpt-home/actions/runs/36378446013)
took 23m41s on a different revision and is context only. Hosted timing requires the
next actual Preview run.

## Verification

- All 27,697 exported route names, metadata (including canonical/hreflang), JSON-LD,
  and HTML root attributes match the baseline.
- Text and ordered anchor URLs match after accounting for the removed navigation.
  The baseline snapshot stripped the extra fixed nav on article pages but retained
  its language dialog. For a strict comparison, the unchanged Navbar was rendered
  with the original dictionary, route, and Preview environment; its dialog was
  projected into the final article HTML, and its full output into the two hubs.
  All 19,777 affected pages matched their baseline text and link hashes, with one
  fixed nav in the actual final HTML. Every other page matched directly.
- Content hygiene passed on every exported HTML file. Final Chinese filing text and
  links passed a one-time check, and the Preview artifact passed its CLI verifier.
- All 18 source gates passed (25.692 s summed command time), along with 35 release,
  artifact, Preview, cache, and recovery regressions. The layout SSR regression and
  two footer regressions also passed. Changed TSX lint/format and diff checks passed.

The focused layout regression is runnable with:

```bash
node --test --test-name-pattern='self-contained' scripts/verify-content-reuse.test.js
```

Local measurement logs, snapshots, projection script, and machine-readable summary
remain in `.scratch/ci-ablation/`. The final successful export and Preview artifact
remain available locally. Changes are uncommitted; deployment has not been run.
