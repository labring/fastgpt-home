---
title: Multi-turn Dialogue and Prompting for Air Pollution Control Research Report Retrieval
slug: /en/industry/finance-d009-c055-f005
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Air Pollution Control
meta_description: Air pollution control research report data primarily comes from public monitoring bulletins issued by ecological environment authorities, special
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Air Pollution Control Research Report Retrieval

## What the data for this category looks like
Air pollution control research report data primarily comes from public monitoring bulletins issued by ecological environment authorities, special research reports from industry associations, experimental observation data from research institutes, and completion documents for air pollution control projects. Public monitoring data is updated daily or weekly, industry research reports are released monthly or quarterly, and project documents are updated in real time as projects progress. Document structures typically include monitoring site information, pollutant concentration data, governance technology parameters, emission limit standards, and project acceptance conclusions. Fields cover specific identifiers such as site numbers, governance facility models, and operating hours.

## What constraints these characteristics impose on multi-turn dialogue and prompting
Quantitative data in air pollution control research reports relies on clear units and field identifiers. Multi-turn dialogue must guide the large model to retain original units and field information to avoid confusing parameters across different monitoring sites. Data update cycles vary across sources, so the dialogue process must prompt users to confirm data timeliness and prevent the use of expired monitoring or project data. Documents often contain multiple sets of related parameters, so multi-turn dialogue must gradually break down user questions and supplement missing contextual information to ensure accurate responses.

## How to Configure Parameters
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recallTopK` | `Top 8-12` | Single documents for air pollution control research reports often contain multiple sets of related parameters. Too many recall results will cause context overload, while too few will fail to cover complete scenarios |
| `similarityThreshold` | `0.72-0.80` | Technical parameters and monitoring indicators for air pollution control data have strong correlation. A threshold that is too low will introduce irrelevant industry general data, while a threshold that is too high may miss detailed project information from the same scenario |
| `rerankTopN` | `Top 4-6` | After reranking, core project monitoring data and policy basis must be retained to prevent the large model from being disturbed by redundant information |
| `referenceMaxLength` | `1200-1800 characters` | Paragraphs in air pollution control research reports often contain multiple sets of quantitative data with clear units. An overly long reference will exceed the large model's context window, while an overly short one will lose parameter association information |
| `maxContext` | `8000-12000 tokens` | Multi-turn dialogue often involves comparisons of multiple sets of parameters, requiring sufficient context to retain associated information from historical questions and answers |
| `promptTemplate` | `Break down parameters by question, require retention of original units and field names` | Targeting the quantitative characteristics of air pollution control data, the prompt must guide the large model to clearly label data sources and corresponding units to avoid confusing parameters across different monitoring sites |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Increasing `referenceMaxLength` to more than 2000 characters results in the large model not citing any retrieved research report content. This occurs because the configured reference length exceeds the context window limit of the bound large model, so the system cannot fully load the reference text and only retains metadata for the recall results.
- Retrieved result paragraphs contain non-business-related internal identification fields. This occurs because the prompt does not explicitly require filtering internal identification fields in documents, causing the large model to include irrelevant fields in the response content.
- The chat interface cannot display image attachments from the knowledge base. This occurs because the image parsing related configuration items for FastGPT are not enabled, or the uploaded image format is not supported by the system.

## How to Verify Proper Configuration
- Initiate a question containing specific monitoring parameters, and check whether the response retains the original units and field names.
- Adjust the `recallTopK` parameter, and verify whether the number of retrieved results matches the preset value range.
- Upload an air pollution control research report with images, and test whether the chat interface can display the image content normally.
- After binding a custom model, check whether the model configuration in the workspace and chat interface is consistent, and confirm that no cached residues remain.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
