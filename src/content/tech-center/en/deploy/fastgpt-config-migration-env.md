---
title: Migrate FastGPT Config to Environment Variables
slug: /en/deploy/fastgpt-config-migration-env
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Migrate FastGPT Config to Environment Variables

## Migrating from Config.JSON to Environment Variables
As of FastGPT v4.15.0, the open-source edition no longer loads optional settings from `config.json`. Users upgrading from earlier versions must remove the volume mount for `config.json` and migrate their existing custom settings to environment variables using the mapping below. No changes are required if no optional settings were configured.

## Configuration Parameter Mapping
The following table maps legacy `config.json` fields to their corresponding environment variables, with default values and descriptions:

| Former `config.json` field                  | Current environment variable | Default  | Description                                                                    |
| ------------------------------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------ |
| `systemEnv.customPdfParse.url`              | `CUSTOM_PDF_PARSE_URL`       | Empty    | Custom PDF parsing service URL.                                                |
| `systemEnv.customPdfParse.key`              | `CUSTOM_PDF_PARSE_KEY`       | Empty    | Custom PDF parsing service key.                                                |
| `systemEnv.customPdfParse.doc2xKey`         | `DOC2X_KEY`                  | Empty    | Doc2x PDF parsing service key.                                                 |
| `systemEnv.customPdfParse.textinAppId`      | `TEXTIN_APP_ID`              | Empty    | TextIn service App ID.                                                         |
| `systemEnv.customPdfParse.textinSecretCode` | `TEXTIN_SECRET_CODE`         | Empty    | TextIn service Secret Code.                                                    |
| `systemEnv.hnswEfSearch`                    | `HNSW_EF_SEARCH`             | `100`    | The `hnsw.ef_search` vector search parameter for PG, OceanBase, and openGauss. |
| `systemEnv.hnswMaxScanTuples`               | `HNSW_MAX_SCAN_TUPLES`       | `100000` | Maximum number of tuples scanned during vector search. Applies only to PG.     |
| `systemEnv.datasetParseMaxProcess`          | `DATASET_PARSE_MAX_PROCESS`  | `10`     | Maximum concurrency for the Dataset file parsing queue.                        |
| `systemEnv.vectorMaxProcess`                | `VECTOR_MAX_PROCESS`         | `10`     | Maximum concurrency for the vector indexing queue.                             |
| `systemEnv.qaMaxProcess`                    | `QA_MAX_PROCESS`             | `10`     | Maximum concurrency for the Q&A splitting queue.                               |
| `systemEnv.vlmMaxProcess`                   | `VLM_MAX_PROCESS`            | `10`     | Maximum concurrency for the image understanding model queue.                   |

## Enhanced PDF Parsing Setup
The open-source edition supports multiple enhanced PDF parsing services, with a fixed priority order if multiple configurations are present: custom PDF parsing service first, followed by SoMark, TextIn, then Doc2x. Only one service needs to be configured.

### Service-Specific Configuration
1. **Sealos PDF Parsing Service**
   1. Access [Sealos AI Proxy](https://hzh.sealos.run/?uid=fnWRt09fZP&openapp=system-aiproxy) and create an API key.
   2. Add the following environment variables:
      ```dotenv
      CUSTOM_PDF_PARSE_URL=https://aiproxy.hzh.sealos.run/v1/parse/pdf?model=parse-pdf
      CUSTOM_PDF_PARSE_KEY=your-sealos-api-key
      ```

2. **SoMark**
   1. Open [SoMark Studio](https://somark.ai/Studio/apikey) and create an API key.
   2. Set the environment variable:
      ```dotenv
      SOMARK_API_KEY=[REDACTED_CREDENTIAL]
      ```
   SoMark synchronous parsing accepts files up to 200 MB and 300 pages. Refer to the [SoMark API documentation](https://docs.somark.ai/en/api-reference) for full limits and error codes.

3. **Custom PDF Parsing Service**
   Use the following environment variables, with `CUSTOM_PDF_PARSE_KEY` optional. When provided, FastGPT sends it as `Authorization: Bearer <CUSTOM_PDF_PARSE_KEY>` in requests. The service must accept a `multipart/form-data` POST request with a `file` field and return JSON in the format:
   ```json
   {
     "pages": 10,
     "markdown": "Parsed Markdown content"
   }
   ```
   Example configuration:
   ```dotenv
   CUSTOM_PDF_PARSE_URL=https://your-pdf-parser.example.com/v2/parse/file
   CUSTOM_PDF_PARSE_KEY=your-service-key
   ```

4. **TextIn**
   ```dotenv
   TEXTIN_APP_ID=your-app-id
   TEXTIN_SECRET_CODE=your-secret-code
   ```

5. **Doc2x**
   ```dotenv
   DOC2X_KEY=your-api-key
   ```

### Final Notes
After updating any environment variables, restart the FastGPT service. To use the configured enhanced parsing service, enable **Enhanced PDF Parsing** when importing files into a Dataset or configuring App file uploads. If this option is disabled, FastGPT uses its built-in PDF parser.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
