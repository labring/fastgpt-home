# Style Bing ads landing pages outside the site design system

The `/ads/` Bing search landing pages ship as a standalone light-theme CSS module with a minimal four-link navigation bar instead of the site's HeroUI/Tailwind dark theme and global navbar. Paid-click pages are judged on conversion and first-screen latency, the agency preview design behind them was already client-approved, and the PPT spec explicitly requires a reduced-exit navigation; cross-page consistency comes from the shared second-screen template, not from the site theme. The pages are `noindex` and absent from the sitemap, so they never compete with the themed, indexable site pages they overlap with.

## Amendment (2026-09-14): header and footer reuse the homepage components

The client decided the header and footer must be exactly identical to the homepage. The landing body keeps the approved light Arco CSS module, but the page now mounts the homepage `Navbar` and `Footer` verbatim inside the `.home` theme scope with `HomeThemeFix`, so paid visitors see the full site chrome (all nav links, language switcher, consult CTA, footer columns) and every other page exit the homepage offers. The reduced-exit rationale now applies to the landing body only. `verify-ads.js` asserts the homepage navbar link labels, consult CTA, footer tagline, and copyright render on every exported ads page. The pages stay `noindex` and outside the sitemap and site navigation registries.

