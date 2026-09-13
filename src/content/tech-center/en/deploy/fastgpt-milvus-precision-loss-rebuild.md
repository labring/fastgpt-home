---
title: Resolve FastGPT Milvus Data Precision Loss
slug: /en/deploy/fastgpt-milvus-precision-loss-rebuild
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# Resolve FastGPT Milvus Data Precision Loss

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## When to Rebuild Milvus Data
JavaScript int64 precision loss can corrupt vector data identifiers in Milvus-based FastGPT deployments. You must rebuild your Milvus data only if you experience this precision issue. To confirm whether your instance requires this fix, inspect the `dataset_datas` collection in your database: check the `dataId` values stored within the `indexes` field. If these values exhibit trailing precision loss, you need to complete this rebuild workflow. Users who deployed FastGPT with PostgreSQL do not need to take any action for this specific problem.

## Required Configuration Values
Before running the rebuild command, collect two critical parameters from your FastGPT environment:
1.  `rootkey`: The admin root key defined in your FastGPT environment variables. This key provides elevated access to execute the admin reset API endpoint.
2.  `host`: Your fully qualified FastGPT domain, including the HTTPS protocol (for example, `https://your-fastgpt-domain.com`).

## Execute the Milvus Data Rebuild
Open a terminal session on a machine with network access to your FastGPT domain. Run the following authenticated HTTP POST request, replacing the placeholder values with your actual configuration details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/resetMilvus' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Substitute `{{rootkey}}` with your environment’s root key, and `{{host}}` with your FastGPT domain (omit any trailing slashes). This command sends a validated request to the FastGPT admin API, which automatically rebuilds all affected Milvus data to resolve the int64 precision loss issue. No additional user input is required after initiating the command.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812)
