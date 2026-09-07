# China Site Analytics

Baidu Tongji and Microsoft Clarity measure visits to `fastgpt.cn`. Both require
the `cn` publication profile and the exact production hostname. International
Site, Preview Host, local development, and other subdomain visits are outside
this reporting scope.

| Provider | Public project ID | Build variable |
| --- | --- | --- |
| Baidu Tongji | `49747f8b12850fd2f7824a9b7f3a4467` | `NEXT_PUBLIC_BAIDU_TONGJI` |
| Microsoft Clarity | `ybhfsnxoxi` | `NEXT_PUBLIC_CLARITY_TONGJI` |

The production image workflow supplies these public IDs to Docker at build time.
Empty variables disable the corresponding integration. Static exports retain
their build-time configuration.

The shared root layout imports the analytics module immediately after hydration.
Both bootstraps use Next.js `afterInteractive` and fetch their vendor scripts
asynchronously. This preserves early collection and keeps the SDK loader out of
the initial JavaScript bundle. Each bootstrap initializes the vendor queue before
loading its tag.

Baidu's `UrlChangeTracker` plugin owns client-side navigation pageviews. The
vendor accepts this plugin once, including when its dashboard SPA setting has
already enabled it. Clarity owns its navigation and interaction collection.

Run `npm run verify:site-analytics` and a China Site production build with both
variables above. Browser verification should cover initial visits, navigation,
one tag per provider, and hostname exclusions. Confirm incoming visits in each
provider dashboard after deployment.

Local browser checks use cached official SDKs and intercept collection requests.
They cover homepage-to-pricing navigation, browser back, a History API navigation,
one tag per provider, and CSP. Dashboard ingestion is a post-deployment check.

References: [Next.js Script loading](https://nextjs.org/docs/app/api-reference/components/script#afterinteractive),
[Baidu SPA tracking](https://tongji.baidu.com/web/help/article?id=324),
[Clarity installation](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup),
[Clarity CSP](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp).
