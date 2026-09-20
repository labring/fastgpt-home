---
title: Deployment and Upgrade for Cosmetic Intelligence Due Diligence Reports
slug: /en/industry/finance-d008-c030-f015
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Cosmetic Intelligence Due
meta_description: Cosmetic intelligence due diligence data primarily comes from brand drug regulatory filing documents, third-party ingredient test reports, supplier
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Cosmetic Intelligence Due Diligence Reports

## What the Data for This Category Looks Like
Cosmetic intelligence due diligence data primarily comes from brand drug regulatory filing documents, third-party ingredient test reports, supplier COA analysis certificates, and public compliance information from e-commerce platforms. Data updates are triggered by formula adjustments, filing changes, or batch production completion. Core filing information is updated at least once annually. A single complete due diligence document includes fields such as filing number, INCI name ingredient list, production batch number, heavy metal and microbial test items, and compliance statements. Ingredient content is measured in percentage or mg/kg units. Some test reports include raw data in scanned document format.

## What Constraints Do These Characteristics Impose on Deployment and Upgrade
The multi-format, multi-field nature of cosmetic data creates targeted constraints for document parsing and index configuration during deployment. Diverse formats of filing documents require adjustments to parsing timeout and parallelism parameters. Professional terminology and precise content in ingredient lists require dedicated prompts for entity extraction models. Frequently updated filing and batch data require incremental sync tasks to avoid lagging index data. The upgrade process must adapt to new compliance format changes while retaining association index rules for legacy data, to prevent data gaps in due diligence reports.

## Configuration Recommendations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Cosmetic filing PDFs typically include multi-page ingredient lists and test reports, leading to longer parsing times |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Scanned documents or raw data files for single-batch test reports have large file sizes, so upload limits need to be relaxed |
| `maxContext` | `800–1200 characters` | Single records in cosmetic ingredient lists are moderately long; excessive length causes model context redundancy |
| Similarity threshold | `0.75–0.85` | Precise matching of filing data and test reports for the same batch of products is required to avoid mixing data across batches |
| Incremental sync interval | `2 times per day` | Filing and batch information for cosmetics is updated frequently, so latest compliance data needs to be synced in a timely manner |
| `RECALL_TOP_N` | `Top 8 entries` | Due diligence reports need to cover multi-dimensional data including ingredients, compliance, and testing; a moderate number of recalled entries ensures completeness |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Issue: After deploying version v4.8.20-fix2, configuring the OneAPI model interface results in ineffective page configuration, with logs indicating invalid API address. Cause: The `AI_MODEL_API_URL` environment variable was not correctly configured in docker-compose.yml with the `/v1` path appended. Legacy configuration files have been overwritten by page configuration.
- Issue: In FastGPT instances deployed with a PG database, knowledge base index creation fails, and file parsing progress stalls for extended periods. Cause: The `PARSE_PARALLEL_NUM` parameter was not lowered. The default parallelism exceeds the resource capacity of an 8c16G GPU-free virtual machine, causing parsing process blocking.
- Issue: The timing of deep thinking triggers in due diligence reports is inconsistent. Simple ingredient queries also trigger the deep thinking process. Cause: No threshold conditions for model deep thinking triggers were configured, or trigger rules were not bound in page settings, causing the model to trigger deep thinking indiscriminately.

## How to Confirm Configuration is Correct
- Verify that `AI_MODEL_API_URL` includes the `/v1` suffix via the FastGPT model management page, and confirm consistency between the environment variable configuration in docker-compose.yml and the API address displayed on the page.
- Upload a standard cosmetic filing PDF file, wait for the parsing task to complete, and check if the parsed text includes complete core fields such as INCI names and ingredient content, with no missing content or garbled text.
- Manually trigger an incremental sync task, check if the sync log successfully imports new filing data, with no connection timeout or format error prompts.
- Submit a test request containing a long-text ingredient query, observe whether the model returns relevant knowledge base entries according to the configured similarity threshold and number of recalled entries, and verify that the deep thinking trigger rule is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
