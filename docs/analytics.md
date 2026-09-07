# Site Analytics

Baidu Tongji and Microsoft Clarity measure visits to `fastgpt.cn`. Both require
the `cn` publication profile and the exact production hostname. International
Site, Preview Host, local development, and other subdomain visits are outside
this reporting scope.

Rybbit and Google Analytics retain their existing configuration-based scope on
all hosts. Rybbit reads `NEXT_PUBLIC_RYBBIT_TONGJI` as its script URL and preserves
`NEXT_PUBLIC_RYBBIT_TONGJI_SITEID` as `data-site-id`. Google reads
`NEXT_PUBLIC_GOOGLE_ID`. Empty script URLs or tracking IDs disable each provider
independently.

| Provider | Public project ID | Build variable |
| --- | --- | --- |
| Baidu Tongji | `49747f8b12850fd2f7824a9b7f3a4467` | `NEXT_PUBLIC_BAIDU_TONGJI` |
| Microsoft Clarity | `ybhfsnxoxi` | `NEXT_PUBLIC_CLARITY_TONGJI` |

The production image workflow supplies these public IDs to Docker at build time.
Empty variables disable the corresponding integration. Static exports retain
their build-time configuration.

The shared root layout imports `SiteAnalytics` immediately after hydration on all
hosts, keeping the script loader out of the initial JavaScript bundle. This module
declares all four providers directly. Baidu and Clarity use `afterInteractive`,
initialize their vendor queues, and fetch their tags asynchronously. Their startup
scripts enforce the exact production hostname. Rybbit and Google use `lazyOnload`,
which schedules loading after the page load event during browser idle time.

Lead attribution remains a separate dynamically imported component with its
existing idle scheduling. Analytics have no additional outer idle delay.

Baidu's `UrlChangeTracker` plugin owns client-side navigation pageviews. The
vendor accepts this plugin once, including when its dashboard SPA setting has
already enabled it. Clarity owns its navigation and interaction collection.

Run `npm run verify:site-analytics` and a China Site production build with the
public IDs above, followed by `npm run verify:p1` with the same build profile.
The initial JavaScript gzip budget remains 260 KiB. Regression checks cover all
provider enable/disable combinations, loading strategies, queues, and analytics
mounting before attribution becomes idle. Browser verification should cover
initial visits, navigation, one SDK tag per provider, and each provider's hostname
scope. Confirm incoming visits in each provider dashboard after deployment.

Local browser checks use cached official SDKs and intercept collection requests.
They cover homepage-to-pricing navigation, browser back, a History API navigation,
one tag per provider, and CSP. Dashboard ingestion is a post-deployment check.

References: [Next.js Script loading](https://nextjs.org/docs/app/api-reference/components/script#afterinteractive),
[Baidu SPA tracking](https://tongji.baidu.com/web/help/article?id=324),
[Clarity installation](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup),
[Clarity CSP](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp).
