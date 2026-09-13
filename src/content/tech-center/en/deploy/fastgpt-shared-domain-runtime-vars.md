---
title: Configure FastGPT Shared Domain and Runtime Variables
slug: /en/deploy/fastgpt-shared-domain-runtime-vars
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Shared Domain and Runtime Variables

## Core Domain Configuration Variables
These environment variables govern external access to the FastGPT frontend and hosted static files. `FE_DOMAIN` is a required parameter that defines the full origin clients use to access the FastGPT instance, including scheme, host, and optional port; this value completes all generated file and image URLs. For local development workflows, use `http://localhost:3000` as the `FE_DOMAIN` value. `FILE_DOMAIN` sets the dedicated domain for file access, which can either point directly to the FastGPT service or a separate domain to isolate potential file-related security risks. `NEXT_PUBLIC_BASE_URL` adds a sub-path prefix for deployments, such as `/fastgpt`, and this value must remain fixed when building the FastGPT container image.

## Runtime and Network Settings
These variables manage the FastGPT service’s network binding, runtime environment, and build resource limits. `HOSTNAME` sets the service host used for internal URL generation and SSRF local-address detection; container deployments typically set this value to `0.0.0.0` to allow external network access. `PORT` defines the Next.js listening port, which is also used for local-address detection, with a default value of `3000`. `NODE_ENV` is the standard Node.js runtime environment flag, with production container images configured to set this to `production`. `NEXT_TELEMETRY_DISABLED` disables Next.js telemetry in production images, with a default value of `1` to opt out of telemetry by default. `NODE_OPTIONS` configures Node.js runtime options during production builds, with a default value of `--max-old-space-size=4096` to increase the build memory limit and prevent out-of-memory errors during image construction.

## Full Environment Variable Reference
| Variable                  | Default                     | Description                                                                                                                                                                   |
| ------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FE_DOMAIN`               | Required                    | The origin clients use to access FastGPT, including the scheme, host, and optional port. It completes file and image URLs. Local development can use `http://localhost:3000`. |
| `FILE_DOMAIN`             | Empty                       | File access domain. It usually points to FastGPT, but a separate domain can isolate file risk.                                                                                |
| `NEXT_PUBLIC_BASE_URL`    | Empty                       | Next.js sub-path deployment prefix, such as `/fastgpt`. It must be fixed when building the image.                                                                             |
| `HOSTNAME`                | `localhost`                 | Service host used for internal URLs and SSRF local-address detection. Containers commonly set it to `0.0.0.0`.                                                                |
| `PORT`                    | `3000`                      | Next.js listening port. Also used for local-address detection.                                                                                                                |
| `NODE_ENV`                | Empty                       | Standard Node/Next.js runtime environment. Production images set it to `production`.                                                                                          |
| `NEXT_TELEMETRY_DISABLED` | `1`                         | Disables Next.js Telemetry in production images.                                                                                                                              |
| `NODE_OPTIONS`            | `--max-old-space-size=4096` | Node options used during production image builds to increase the build memory limit.                                                                                          |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
