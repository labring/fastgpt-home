---
title: FastGPT 4.15.5 New Storage and Parsing Features
slug: /en/deploy/fastgpt-4155-storage-pdf-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# FastGPT 4.15.5 New Storage and Parsing Features

## Core New Features in FastGPT 4.15.5
This update delivers two targeted enhancements for self-hosted FastGPT deployments, expanding storage compatibility and improving document processing capabilities. These additions allow administrators to better align their FastGPT instances with existing infrastructure and workflow requirements.

## Cloudflare R2 Object Storage Integration
FastGPT 4.15.5 now supports Cloudflare R2 object storage. The integration fully supports the R2 S3 API, enabling straightforward connection to Cloudflare’s storage platform. Additional supported functionality includes presigned access URLs for controlled, time-limited file access, and custom domain configuration for public buckets to align with brand standards. All configuration for Cloudflare R2 storage is managed via FastGPT’s standard environment variable system, with complete parameter details available in the environment variable configuration documentation.

## SoMark PDF Parsing Provider
The release introduces the SoMark PDF enhanced parsing provider as a new option for extracting text and data from PDF documents. To activate this provider, administrators must set the `SOMARK_API_KEY` environment variable. When multiple PDF parsing providers are configured simultaneously, FastGPT follows a fixed priority order to select the active service. The priority hierarchy is outlined below:

| Priority Rank | PDF Parsing Service |
|---------------|---------------------|
| 1             | Custom PDF Parsing Service |
| 2             | SoMark |
| 3             | TextIn |
| 4             | Doc2x |

Full configuration steps and parameter requirements for the SoMark provider are documented in the official environment variable configuration guide.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155)
