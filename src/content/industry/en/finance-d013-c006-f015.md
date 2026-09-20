---
title: Deployment and Upgrade for Traditional Chinese Medicine (TCM) Financing Daily Reports
slug: /en/industry/finance-d013-c006-f015
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Traditional Chinese Medicine
meta_description: Data sources for TCM financing daily reports primarily include publicly disclosed financing announcements for TCM enterprises from stock exchanges
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Traditional Chinese Medicine (TCM) Financing Daily Reports

## What the data for this category looks like
Data sources for TCM financing daily reports primarily include publicly disclosed financing announcements for TCM enterprises from stock exchanges, financing records filed by local financial regulatory bureaus, and public financing data from third-party industry databases.
The update frequency is daily, covering all full TCM-related financing events of the current day.
Each daily report is presented as a structured table or CSV file, with the following fixed fields: financing subject (full name of TCM enterprise or affiliated institution), financing round, financing amount (including unit), financing completion time, investor list, affiliated TCM sub-category (such as proprietary Chinese medicine, TCM decoction pieces, Chinese herbal medicine planting), and financing purpose. There are no unified unit restrictions for fields; some sources mix ten thousand yuan and hundred million yuan as amount units.

## What constraints these characteristics impose on deployment and upgrade
The daily update rhythm requires configuring stable scheduled synchronization tasks during deployment, to avoid data lag from overly long task intervals or server resource waste from overly short intervals. Multi-source data and field differences require configuring custom field mapping rules before deployment, to adapt to structural differences across data sources and avoid parsing mismatches. The inconsistent financing amount unit issue requires configuring a unified unit conversion logic during deployment, to prevent numerical deviations in subsequent analysis. Bulk-uploaded daily report files usually contain multiple sets of financing records, which impose higher requirements on upload file size limits and parsing timeout periods. During the upgrade process, scheduled synchronization tasks must be kept uninterrupted, to avoid failure to synchronize daily financing data in a timely manner.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `UPLOAD_FILE_MAX_SIZE` | `800 MB` | Bulk packaged TCM financing daily report files for a single batch usually do not exceed 750 MB, with reasonable reserved margin |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | TCM financing daily reports contain multi-dimensional fields, with higher parsing time than general documents, requiring matching the full parsing cycle |
| `SCHEDULED_SYNC_INTERVAL` | `86400 seconds` | Matches the daily update rhythm of financing daily reports, ensuring timely synchronization of same-day data |
| `CUSTOM_FIELD_MAPPING` | Map according to "financing subject / round / amount / time / investor / sub-category" | Adapts to the unique sub-category field of TCM financing daily reports, avoiding parsing field mismatches |
| `DATA_UNIFICATION_RULE` | Uniformly convert financing amounts to the "ten thousand yuan" unit | Resolves the issue of mixed amount units (ten thousand yuan / hundred million yuan) across different source data |
| `ENTITY_RECOGNITION_THRESHOLD` | `0.85` | Improves the accuracy of entity recognition for TCM enterprise names, filtering misidentified results with low matching scores |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to conduct tests on local samples before finalizing settings.

## Three Common Mistakes
- A 413 error is returned when uploading bulk TCM financing daily report files. The `UPLOAD_FILE_MAX_SIZE` configuration is not adjusted, and the default value is smaller than the actual size of the packaged file.
- Calls to models deployed locally via Ollama return empty content. The correct interface address for Ollama is not configured in FastGPT, or cross-domain access permissions for Ollama are not enabled, causing requests to fail to transfer normally.
- After configuring a third-party large model API Key in a Docker-deployed instance, the model fails to respond normally. The API Key is not written to the container's environment variable configuration file, or the container is not restarted to make the configuration take effect.

## How to Verify Successful Configuration
- Upload a single test TCM financing daily report file, and check whether the parsed fields fully match the original data.
- Manually trigger a scheduled synchronization task, and check whether there are timeout or parsing failure error messages in the task logs.
- After configuring the third-party large model API Key, initiate a test question and answer to confirm that the model can normally return valid content.
- Check the system firewall and container port mapping rules, and confirm that port 3000 can be normally accessed via the specified IP.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
