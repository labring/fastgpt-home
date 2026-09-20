---
title: Knowledge Base Retrieval and Recall for Environmental Monitoring Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c103-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Environmental
meta_description: Environmental monitoring data comes from three main sources: publicly available automatic monitoring stations operated by ecological environment
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Environmental Monitoring Intelligent Due Diligence Reports

## What the data for this category looks like
Environmental monitoring data comes from three main sources: publicly available automatic monitoring stations operated by ecological environment departments, in-house sensor networks of enterprises, and paper or electronic test reports from third-party testing institutions.
Automatic monitoring data updates hourly or by minute. Third-party test reports are updated when a project is completed or during quarterly inspections.
A single document contains fields including monitoring site number, monitoring period, pollutant concentration value, exceedance determination result, detection method standard, and site latitude and longitude coordinates. Concentration units are uniformly μg/m³. Time uses East 8th zone standard timestamp format. Some reports include links to associated on-site sampling photos.

## Constraints Imposed on Retrieval and Recall
The high-frequency updates of automatic monitoring data require the retrieval pipeline to support incremental index updates. This avoids resource consumption caused by full index rebuilding.
The multi-field mixed document structure requires weighted matching configuration by field dimension during retrieval. For example, pollutant concentration values must match threshold ranges, and site information must be accurately associated with corresponding monitoring periods.
Long-text detection method documents and short-text numerical concentration data are stored together. Segmenting this content must preserve field association relationships. This prevents loss of contextual connections after splitting.
Unstructured OCR content from third-party test reports must first undergo structured parsing before field information can be added to the retrieval index. Without this step, accurate field-level recall cannot be achieved.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | Top 10-15 results | Single environmental monitoring documents have high information density. Too many recalled results will cause context overflow and negatively impact subsequent reasoning effects |
| `Similarity threshold` | 0.72-0.80 | Numerical matching of pollutant concentrations requires high accuracy. This prevents irrelevant monitoring data with low similarity from being recalled |
| `Chunk size` | 800-1200 characters | A single monitoring report contains multiple sets of monitoring data and explanatory text. Segmentation must preserve complete monitoring information for a single site |
| `Incremental Index Update Cycle` | 1 hour | Automatic monitoring data updates hourly. Indexes must be synchronized to ensure data timeliness |
| `Rerank result count` | Top 3-5 results | Due diligence reports require accurate matching of specific user monitoring sites and periods. Too many re-ranked results will increase reasoning overhead |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | OCR and structured parsing of large third-party test reports take a long time. Sufficient parsing time must be reserved |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Each situation requires separate analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Issue: The re-ranking model passes local testing, but re-ranking results return false during API calls. Cause: The re-ranking model service address is not bound in the FastGPT knowledge base configuration, or the configured API key has insufficient permissions.
- Issue: The number of retrieval results is far lower than the set `Recall count`, and a large number of irrelevant non-monitoring documents are included. Cause: Uploaded documents have not undergone structured parsing, and weighted retrieval rules have not been configured based on monitoring fields. This causes generic text matching to retrieve irrelevant content.
- Issue: Retrieval results differ significantly between online chat and API calls. Cause: The knowledge base ID parameter is not passed correctly during API calls, or the custom `Similarity threshold` parameter is not specified. This uses the default configuration instead of the pre-configured custom parameters.

## How to Verify Proper Configuration
- View the knowledge base index update log to confirm that automatic monitoring data completes incremental synchronization according to the set `Incremental Index Update Cycle` period.
- Initiate a test retrieval, enter a query containing a specific monitoring site and pollutant name, and check whether the recalled result fields include the corresponding site number and concentration value.
- Call the API interface to initiate retrieval, and compare whether the `相似度` field in the returned results matches the set threshold range.
- Upload a third-party test report, and confirm whether the parsed structured fields are fully included in the retrieval index.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
