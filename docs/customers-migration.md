# FastGPT Customers In-Process Migration

## Goal

Serve the customer stories center directly from `fastgpt.cn/customers` in the same Next.js
application as `fastgpt-home`. The browser, canonical metadata, sitemap entries, APIs, and
static assets all remain on the `fastgpt.cn` origin. No cross-domain reverse proxy is involved.

## First-Principles Constraints

1. A route is part of the application only when its UI, data access, API handlers, assets, and
   cache invalidation share the same deployable runtime.
2. The customer stories center is database-backed and cannot run in a static-export-only image.
3. Existing Home routes and customer routes must not share unqualified component, library, API,
   or asset names.
4. Public URLs are always rooted at `/customers`; canonical and machine-readable URLs use
   `SITE_URL=https://fastgpt.cn/customers`.
5. Secrets stay server-side. Only variable names are committed; deployment values remain in
   Sealos secrets or environment configuration.

## Resulting Architecture

- `src/app/customers`: customer pages, metadata endpoints, admin pages, and Route Handlers.
- `src/customers`: customer-only components, models, hooks, data access, AI, and storage code.
- `public/customers`: customer-only static assets.
- `.next/standalone`: one production Next.js server for Home and customer routes.
- `/admin`: optional admin surface, disabled unless `CUSTOMERS_ADMIN_ENABLED=true`. The admin runs as a separate instance on port `3001`; the public instance on `3000` sets the flag to `false` so `/admin` returns 404.

## Deployment Contract

- Container port: `3000`.
- Required public URL: `SITE_URL=https://fastgpt.cn/customers`.
- Required data connection: `MONGODB_URI`.
- AI, S3, Pexels, agent, and admin values use the names documented in `.env.template`.
- The existing Sealos Service/Ingress must target port `3000` for the new image.

## Release Order

1. Add all required runtime secrets to the Home deployment.
2. Build and publish the merged Home image.
3. Change the Home workload target port to `3000` if it still targets the old Nginx port `80`.
4. Deploy one canary and verify `/`, `/customers`, a customer detail page, and
   `/customers/api/categories`.
5. Enable `CUSTOMERS_ADMIN_ENABLED` only after the public surface is healthy.
6. Retire the standalone customer deployment after search engines and logs confirm that all
   canonical customer URLs resolve from `fastgpt.cn`.

## Rollback

Roll back the Home image and runtime port together. The previous standalone customer deployment
should remain available but not canonical until the merged release passes production checks.
