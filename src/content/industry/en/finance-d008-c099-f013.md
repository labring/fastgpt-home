---
title: Knowledge Base Retrieval and Recall for Gas Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c099-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Gas Intelligent Due
meta_description: Data sources for gas due diligence reports include internal operation ledgers of gas enterprises, pipeline network inspection records, gas safety
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Gas Intelligent Due Diligence Reports

## What the category’s data looks like
Data sources for gas due diligence reports include internal operation ledgers of gas enterprises, pipeline network inspection records, gas safety assessment documents, public gas supervision data released by local housing and urban-rural development and urban management departments, and monthly reports of upstream gas supply sources. Update frequencies vary across sources: pipeline network inspection records are updated weekly, safety assessment reports are updated quarterly, and supervision public data is updated in real time. Core document fields include pipeline node number, pressure value, inspection date, hidden danger level, and rectification status. Units include professional measurement identifiers such as MPa, meters, and date formats. Single document length ranges from several pages to dozens of pages.

## Constraints imposed by these characteristics on knowledge base retrieval and recall
Multi-source heterogeneous data sources require retrieval systems to support cross-data source field mapping, to avoid repeated recall of content for the same pipeline node.
Different update frequencies require matching incremental synchronization configurations, to ensure the latest hidden danger rectification status or supervision information is included in the recall scope in a timely manner.
Professional fields and units require retrieval to support precise field matching, to prevent misclassification of non-gas scenario terms such as "pressure" or "leakage" as relevant content.
Long single document lengths require retaining contextual association of core fields during segmented retrieval, to avoid semantic fragmentation that reduces recall accuracy.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8–12` | Gas due diligence reports need to cover multiple types of information such as pipeline network nodes, hidden danger records, and supervision data. Excessive count will cause context overload, while insufficient count cannot cover all relevant content |
| `Similarity Threshold` | `0.72–0.85` | Gas industry has dense professional terminology. This threshold filters low-match irrelevant documents while retaining weakly matched content containing professional expressions such as "leakage" or "abnormal pressure" |
| `Segment Length` | `800–1200 characters` | Single gas inspection report or pipeline network ledger has long length. Segmentation retains contextual association of core fields such as node number and hidden danger level to avoid semantic fragmentation |
| `Incremental Sync Cycle` | `Configured by data source type: Daily/Weekly/Quarterly` | Different data sources have different update frequencies. Supervision public data can be set to daily, inspection ledgers to weekly, and gas source reports to quarterly |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Large-scale gas pipeline network archive files have large content, requiring sufficient parsing time to complete field extraction and segmentation |
| `Reranked Return Count` | `Top 4–6` | Due diligence reports need to prioritize highly relevant core hidden dangers and pipeline network data, and filter redundant content after reranking |

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: Empty results occasionally appear after configuring an external retrieval engine. Cause: The retrieval whitelist for gas industry supervision sites has not been configured, or retrieval keywords do not include professional identifiers such as pipeline network numbers and pressure units, leading to an overly narrow matching scope.
- Phenomenon: The locally deployed ChatGLM2 model cannot be selected in the knowledge base creation page, even though the model has been started via a container and connected to OneAPI. Cause: Access parameters for this model are missing from the system configuration, or the currently used V4.8.17 free version has permission restrictions for model access.
- Phenomenon: Gas professional content cannot be retrieved after importing a Notion link. Cause: The field parsing switch for Notion documents has not been enabled, or the sharing permission of the Notion page has not been opened, resulting in failure to fully pull the document content.

## How to Confirm Successful Configuration
- Perform a manual retrieval once, enter test keywords containing gas professional terms, and verify that the returned result fields include core content such as pipeline network numbers and pressure values.
- Review the incremental synchronization task logs to confirm that the synchronization cycles of different data sources match the preset configuration, with no failed error reports.
- Access the model configuration page to confirm that the locally deployed ChatGLM2 model appears in the available model list.
- Upload a test gas inspection report, and verify that the parsed segmented content retains core fields and contextual association.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
