# Customers Reverse Proxy Runbook

This integration keeps `fastgpt-customers` as an independent application and exposes it at
`https://fastgpt.cn/customers`. No customer-story application code is copied into
`fastgpt-home`.

## How It Works

The browser connects only to `fastgpt.cn`. The Nginx server already packaged in the
`fastgpt-home` image forwards `/customers` and `/customers/**` to the configured HTTPS origin.
Because this is a server-side reverse proxy rather than a browser redirect, the address bar stays
on `https://fastgpt.cn/customers`.

The proxy preserves the complete `/customers/**` path. The customer application is built with
Next.js `basePath: '/customers'`, so HTML, APIs, JavaScript, CSS, images, sitemap, and detail pages
all use the same mounted prefix without response rewriting.

## Sealos Environment Variables

Configure these private runtime variables on the `fastgpt-home` application:

```dotenv
CUSTOMERS_PROXY_ENABLED=true
CUSTOMERS_ORIGIN_HOST=solutions.fastgpt.cn
CUSTOMERS_PROXY_SECRET=<same-random-value-as-the-customer-app>
```

`CUSTOMERS_ORIGIN_HOST` is a hostname only: no `https://`, port, path, or trailing slash. The
current origin is `solutions.fastgpt.cn`; it may later be replaced by a dedicated origin hostname
without another code change.

`CUSTOMERS_DNS_RESOLVER` is optional. Leave it unset unless the Home container cannot detect the
Sealos IPv4 DNS resolver from `/etc/resolv.conf`.

Configure these runtime variables on the `fastgpt-customers` application:

```dotenv
HOST=https://fastgpt.cn/customers
SITE_URL=https://fastgpt.cn/customers
CUSTOMERS_PROXY_SECRET=<same-random-value-as-fastgpt-home>
```

Generate one secret of at least 32 URL-safe characters. Store it as a private Sealos environment
variable on both applications; never use a `NEXT_PUBLIC_*` name or bake it into an image.

```bash
openssl rand -hex 32
```

During rotation only, the customer application can temporarily accept the old value:

```dotenv
CUSTOMERS_PROXY_SECRET_PREVIOUS=<old-value>
```

## Release Order

1. Build and deploy a new `fastgpt-customers` image from the customer-path code. The old image
   does not support the `/customers` base path.
2. Set the customer application variables above and keep its public port on `3000` and admin port
   on `3001`.
3. Verify the origin accepts `/customers` when `X-Customers-Proxy-Secret` is present.
4. Merge and deploy the `fastgpt-home` changes.
5. Set the Home variables above and restart the Home application so its entrypoint renders the
   Nginx location.
6. Verify `https://fastgpt.cn/customers`, one category, one detail page, an API request, sitemap,
   and static assets.

The independent admin hostname remains connected to port `3001`. Do not expose admin pages below
`/customers`.

## Verification

Run the public online gate after both applications restart:

```bash
CUSTOMERS_VERIFY_URL=https://fastgpt.cn/customers \
CUSTOMERS_VERIFY_ORIGIN_URL=https://solutions.fastgpt.cn \
CUSTOMERS_PROXY_SECRET='<private-value>' \
npm run verify:customers-proxy
```

For local end-to-end verification with built standalone artifacts:

```bash
CUSTOMERS_APP_DIR=/absolute/path/to/fastgpt-customers \
CUSTOMERS_HOME_IMAGE=fastgpt-home-customers:test \
npm run verify:customers-proxy-docker
```

Expected behavior:

| Request | Expected result |
| --- | --- |
| `https://fastgpt.cn/customers` | Customer Stories page, address bar unchanged |
| `https://fastgpt.cn/customers/**` | Page/API/asset served through the same prefix |
| Origin request with the shared header | Content is served |
| Origin request without the shared header | No duplicate indexable content |
| `/customers/admin` or `/customers/login` | Redirected away from the public mount |
| Independent admin hostname on port 3001 | Admin login remains available |

## Rollback

Set this Home environment variable and restart the Home application:

```dotenv
CUSTOMERS_PROXY_ENABLED=false
```

This disables only `/customers` forwarding. The remaining `fastgpt-home` routes and the
independent `fastgpt-customers` application are unchanged.
