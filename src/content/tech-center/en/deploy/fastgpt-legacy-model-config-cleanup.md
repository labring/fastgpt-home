---
title: Clean Up Legacy FastGPT System Model Configs
slug: /en/deploy/fastgpt-legacy-model-config-cleanup
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# Clean Up Legacy FastGPT System Model Configs

## Overview of System Model Schema Changes
This FastGPT 4.16 release enforces strict validation schemas for initializing and saving system model configurations. Legacy versions may have stored numeric strings, serialized price tier data, or incomplete fields that fail the new validation rules. The `cleanSystemModelConfigs` admin endpoint resolves these configuration inconsistencies, reloads the system model cache, and can be safely run multiple times.

## Dry Run Validation
Before modifying any database records, run a dry run to inspect problematic configurations without making changes. Use the following curl command, replacing placeholders for your domain and root key:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/cleanSystemModelConfigs' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: your-ROOT-KEY' \
  -d '{"dryRun":true}'
```
This dry run does not alter database data or reload the model cache. Review the `invalidSamples` field in the response; if no records require manual correction, proceed with the full cleanup.

## Full Cleanup Execution
To apply fixes to all valid legacy configurations, run the following command with `dryRun` set to `false`:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/cleanSystemModelConfigs' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: your-ROOT-KEY' \
  -d '{"dryRun":false}'
```
The cleanup performs three core transformations:
1. Converts valid numeric strings to numeric values
2. Parses serialized `priceTiers` values into proper arrays
3. Removes invalid optional numeric fields

For missing required fields, the system applies predefined default values:
- LLM model fields: `maxContext` (16000), `maxResponse` (16000), `quoteMaxToken` (13000)
- Embedding model fields: `defaultToken` (500), `maxToken` (3000)
- All price-related fields: 0
- `functionCall` remains optional, and missing embedding `weight` defaults to 0

After running the cleanup, updated data is written consistently, and the system model cache is reloaded immediately—even if no database records were modified. A subsequent dry run will report `wouldUpdate` as 0 if all configurations are valid. Any records that still fail the full schema validation will not be updated, and will appear in the `invalidSamples` response field.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
