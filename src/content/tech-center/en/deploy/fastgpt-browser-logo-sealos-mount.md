---
title: Mount Custom FastGPT Browser Logos via Sealos
slug: /en/deploy/fastgpt-browser-logo-sealos-mount
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/sealos
source_type: Official documentation
---

# Mount Custom FastGPT Browser Logos via Sealos

## Current Supported Logo Replacement Constraints
FastGPT’s current Sealos deployment workflow does not support full browser logo replacement across all platform interface elements. Only SVG-format logo files are compatible for custom mounting via Sealos, and this method currently only replaces the browser tab icon. A complete, fully integrated logo replacement experience across all interface elements will be made available once the platform’s visual customization feature is officially implemented.

## Step-by-Step Sealos Logo Mount Procedure
To deploy a custom browser logo for your FastGPT instance via Sealos, follow these exact steps:
1. Prepare your custom logo file exclusively in SVG format; no other file formats are supported per current documentation.
2. Within your Sealos deployment configuration, add a new mounted file with the fixed, required target path: `/app/projects/app/public/icon/logo.svg`.
3. Set the content of this mounted file to your custom SVG logo code as the assigned value for the mount.

The following screenshots illustrate the correct configuration for mounting the custom logo file in Sealos:
> ![Sealos logo mount configuration screenshot 1](../../../public/imgs/onsealos7.png)
> ![Sealos logo mount configuration screenshot 2](../../../public/imgs/onsealos8.png)

## Key Configuration Requirements
There are two non-negotiable requirements for successful custom logo deployment:
1. The logo file must be in SVG format; any other format will not be recognized by the FastGPT application.
2. The mounted file must use the exact target path `/app/projects/app/public/icon/logo.svg`; any deviation from this path will prevent the custom logo from loading.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/sealos)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
