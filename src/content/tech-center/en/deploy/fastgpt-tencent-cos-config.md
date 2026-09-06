---
title: Configure Tencent Cloud COS for FastGPT
slug: /en/deploy/fastgpt-tencent-cos-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure Tencent Cloud COS for FastGPT

### Prerequisite Bucket Setup
Before integrating Tencent Cloud COS with self-hosted FastGPT, prepare two dedicated COS buckets: one public and one private. Every bucket name must include your Tencent Cloud account’s App ID suffix, such as `fastgpt-public-1250000000`.
- Configure the public bucket to allow anonymous read access to enable public access to stored files.
- Leave the private bucket with default private access controls to restrict unauthorized access.
You must also configure Cross-Origin Resource Sharing (CORS) settings for your buckets using Tencent Cloud’s official documentation, linked at https://cloud.tencent.com/document/product/436/13318.

### Core Configuration Parameters
All settings are defined via environment variables. Required parameters are marked with an asterisk (*):

| Environment Variable               | Details                                                                 |
|-------------------------------------|-------------------------------------------------------------------------|
| `STORAGE_VENDOR`*                   | Must be set to `cos` to enable Tencent Cloud COS storage integration.    |
| `STORAGE_REGION`*                   | Region of your COS buckets, e.g. `ap-shanghai`.                         |
| `STORAGE_ACCESS_KEY_ID`*            | Your Tencent Cloud access key ID.                                       |
| `STORAGE_SECRET_ACCESS_KEY`*        | Your Tencent Cloud secret access key.                                   |
| `STORAGE_PUBLIC_BUCKET`*            | Full name of your public COS bucket, including the App ID suffix.        |
| `STORAGE_PRIVATE_BUCKET`*           | Full name of your private COS bucket, including the App ID suffix.       |
| `STORAGE_COS_PROTOCOL`              | Valid options: `https:` or `http:`, must include the trailing colon. Do not use `https:` if your custom domain lacks an SSL certificate. |
| `STORAGE_COS_USE_ACCELERATE`        | Optional. Set to `true` to enable global acceleration domain. Default: `false`. If enabled, your bucket must have global acceleration activated. |
| `STORAGE_COS_CNAME_DOMAIN`          | Optional. Custom domain for your COS storage, e.g. `your-domain.com`.    |
| `STORAGE_COS_PROXY`                 | Optional. Proxy server URL, e.g. `http://localhost:7897`.               |

### Full Configuration Example
A complete, functional environment variable configuration for Tencent Cloud COS is shown below:
```dotenv
STORAGE_VENDOR=cos
STORAGE_REGION=ap-shanghai
STORAGE_ACCESS_KEY_ID=your_access_key
STORAGE_SECRET_ACCESS_KEY=your_secret_key
STORAGE_PUBLIC_BUCKET=fastgpt-public
STORAGE_PRIVATE_BUCKET=fastgpt-private
STORAGE_COS_PROTOCOL=http:
STORAGE_COS_USE_ACCELERATE=false
STORAGE_COS_CNAME_DOMAIN=
STORAGE_COS_PROXY=
```
> Note: Replace placeholder values (e.g. `your_access_key`, `fastgpt-public`) with your actual Tencent Cloud credentials and bucket names, ensuring each bucket name includes your App ID suffix.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
