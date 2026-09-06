---
title: Add Third-Party Document Library Server Types
slug: /en/integration/third-party-dataset-server-types
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset
source_type: Official documentation
---

# Add Third-Party Document Library Server Types

This guide covers the core process for extending FastGPT's dataset functionality by adding custom third-party document library server type definitions.

## Locate Type Definition File
All third-party document library server type definitions are managed in a dedicated core file within the FastGPT project. Navigate to `FastGPT\packages\global\core\dataset\apiDataset.d.ts` to access this file. This is the official location for defining authentication and configuration fields for external document library integrations.

## Define Custom Server Type
Use TypeScript to define the required fields for your third-party document library. For example, the Yuque Dataset requires authentication and configuration fields, which can be implemented with the following code:
```ts
export type YuqueServer = {
  userId: string;
  token?: string;
  basePath?: string;
};
```
Below is a breakdown of each supported field:
| Field Name | Type | Requirement | Purpose |
|------------|------|-------------|---------|
| `userId` | string | Required | Authenticate requests to the third-party document library |
| `token` | string | Optional | Add secure supplementary authentication, if supported by the library |
| `basePath` | string | Optional | Enable root directory selection for the connected document library |

## Root Directory Configuration Requirements
> 🤖 Success: If your third-party document library includes a root directory selection feature, you must include the `basePath` field in your server type definition. For full details on integrating the root directory configuration form, refer to the [root directory feature documentation](./third_dataset.en.mdx#adding-the-configuration-form).

## Validate Implementation
After defining your custom server type, you can reference the provided example visual aid at `/imgs/thirddataset-1.png` to confirm your code aligns with FastGPT's expected third-party dataset system structure. This image illustrates the standard implementation pattern for custom external document library integrations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
