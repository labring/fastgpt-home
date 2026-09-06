---
title: Run FastGPT Post-Upgrade Initialization API Requests
slug: /en/deploy/fastgpt-post-upgrade-init-api-requests
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40
source_type: 官方文档
---

# Run FastGPT Post-Upgrade Initialization API Requests

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Post-Upgrade Initialization Requirement
After deploying a new FastGPT version, three administrative initialization APIs must be executed to complete the upgrade setup. All requests require a mandatory `headers.rootkey` authentication header, which is pulled directly from your FastGPT environment variables. No additional configuration fields are required for these API calls beyond the authentication header.

## Required API Endpoints
Three specific HTTP endpoints must be called using your FastGPT deployment's base domain in place of the `xxxxx` placeholder:
1.  `https://xxxxx/api/admin/initv4`
2.  `https://xxxxx/api/admin/initChat`
3.  `https://xxxxx/api/admin/initOutlink`

## Step-by-Step Execution Instructions
1.  Retrieve your `headers.rootkey` value from the FastGPT environment variables configured during your initial or prior deployment.
2.  Deploy the updated FastGPT software package to your target hosting environment.
3.  Send each of the three listed HTTP requests, ensuring the `headers.rootkey` header is included with every call. Substitute `xxxxx` in each endpoint URL with your actual deployment domain.
4.  Monitor the execution status of the first two endpoints (`initv4` and `initChat`). These requests may crash unexpectedly due to insufficient available memory on your hosting server.
5.  If either of the first two requests crashes, re-run the failed command(s) without additional modifications.
6.  Confirm all three initialization requests complete successfully before validating your upgraded FastGPT instance.

## Troubleshooting
The only documented error condition for these initialization requests is unexpected termination of the `initv4` and `initChat` endpoints. This failure is directly tied to insufficient memory allocated to your FastGPT hosting environment. The only supported resolution is to re-run the failed requests once memory resources are confirmed available, or adjust your environment's memory allocation if the error persists after initial retries.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40)
