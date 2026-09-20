---
title: Deployment and Upgrade for Water Utility Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c083-f015
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Water Utility Intelligent Due
meta_description: Data sources for water utility intelligent due diligence reports include public monitoring datasets from municipal water utility authorities, water
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Water Utility Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Data sources for water utility intelligent due diligence reports include public monitoring datasets from municipal water utility authorities, water plant operation logs, pipeline inspection records, water quality test reports, pipeline operation and maintenance archives, and similar sources.
Two update cadences apply: real-time water quality monitoring data updates hourly, annual operation reports are uploaded in bulk quarterly, and inspection records are submitted immediately after each single inspection.
Document structure is fixed, including fields such as monitoring point number, monitoring time, turbidity, residual chlorine, pH value, pipeline pressure, and more.
Units are as follows: turbidity in NTU, residual chlorine in mg/L, pipeline pressure in kPa.
Some documents include point geographic coordinates and operation and maintenance notes.

## Constraints Imposed by These Characteristics on Deployment and Upgrade
Configure multi-format data access adapters during deployment for multi-source heterogeneous data sources, to avoid data loss caused by format incompatibility.
Configure separate trigger rules for real-time synchronization and scheduled full updates for data sources with different update cadences.
Ensure real-time data streams are not interrupted during upgrade, to prevent disruption to public service monitoring data availability.
Configure field mapping and unit verification rules during deployment, to avoid due diligence report content errors caused by field mismatches.
Configure sensitive data desensitization rules during deployment, as water utility data involves public service compliance.
Synchronize and update desensitization strategies during upgrade to meet latest regulatory requirements.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Single documents related to water utility due diligence (such as annual monitoring reports for a single point) typically do not exceed 800 MB, and parsing takes no more than 5 minutes, to avoid timeout interrupting the parsing process |
| `UPLOAD_FILE_MAX_SIZE` | `1024 MB` | Single files of water utility bulk inspection reports and pipeline survey data can reach up to 1 GB, so this setting adapts to large file upload requirements |
| `embedding_batch_size` | `16` | Water utility data text mostly consists of structured field descriptions plus monitoring values, a batch size of 16 balances embedding efficiency and server memory usage |
| `recall_count` | `Top 12 entries` | Water utility due diligence requires associating monitoring data across multiple time periods and points, 12 entries covers core associated information |
| `similarity_threshold` | `0.78–0.82` | Water utility monitoring data has relatively high feature similarity, this interval filters low-relevance redundant retrieval results |
| `SCHEDULED_REFRESH_INTERVAL` | `3600 seconds` | Real-time water quality monitoring data updates hourly, scheduled refresh ensures the knowledge base stays synchronized with source data |

> The parameter values provided on this page are standard recommended starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Frontend access shows `ERR_SSL_PROTOCOL_ERROR` or page load timeout. Cause: SSL certificate for reverse proxy is not configured correctly, local HTTP address is directly exposed for public access, and HTTPS protocol is not enabled.
- Symptom: Retrieval results have insufficient relevance, or the embedding model throws an error prompt `model not found`. Cause: The `embedding_model` parameter is not set to `ali-emb3`, and another embedding model is used incorrectly, which cannot adapt to the characteristics of water utility structured data.
- Symptom: After bulk uploading inspection reports, only the latest 1 document remains in the knowledge base. Cause: `DUPLICATE_HANDLING_STRATEGY` is not adjusted to `append`, and the default overwrite strategy is used, resulting in duplicate documents being replaced.

## How to Verify Successful Configuration
- Check container runtime logs to confirm there are no errors related to parsing timeouts or file size limits, and verify that core configurations meet the processing requirements of water utility data.
- Upload a test document that conforms to the water utility industry format, confirm that parsing is successful and field mapping is correct, and verify that data adaptation configurations take effect.
- Initiate a retrieval targeting water utility monitoring data, check that the recall count matches the set retrieval rules, and verify that retrieval configurations take effect.
- View the knowledge base update log to confirm that scheduled refresh tasks trigger at the preset interval, and verify that synchronization configurations are correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
