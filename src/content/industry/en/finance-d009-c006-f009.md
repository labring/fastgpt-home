---
title: Citation Source and Traceability for Traditional Chinese Medicine Research Reports
slug: /en/industry/finance-d009-c006-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Traditional Chinese
meta_description: Traditional Chinese medicine (TCM) research report data mainly comes from public standards of the National Pharmacopoeia Commission, annual reports of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Traditional Chinese Medicine Research Reports

## What the data for this category looks like
Traditional Chinese medicine (TCM) research report data mainly comes from public standards of the National Pharmacopoeia Commission, annual reports of TCM industry associations, R&D announcements of listed pharmaceutical companies, and academic papers from TCM colleges and universities.
Update cycles vary by content type: Pharmacopoeia standards are revised every 5 years, industry reports are updated quarterly or annually, and pharmaceutical company R&D announcements are released in real time as projects progress.
Document structures typically include modules such as prescription composition, nature and flavor meridian tropism, clinical application, pharmacological research, and quality standards. Exclusive fields include decoction pieces dosage (unit: gram), active ingredient content (unit: milligram/gram), medicinal material origin, production batch number, and other related information.

## Constraints imposed by these characteristics on citation source and traceability
TCM research report data sources are scattered, with significantly different update cycles. The traceability link must configure differentiated timestamp verification rules for different data sources to avoid citing expired pharmacopoeia standards or outdated R&D conclusions.
Documents are modular and contain exclusive fields, so the traceability link must accurately locate original content from corresponding modules, and cannot rely on general full-text matching logic.
Exclusive units and fields require the traceability link to verify consistency between fields and units, to avoid confusing dosage standards for different medicinal materials.
Real-time released pharmaceutical company R&D announcements require the traceability link to support incremental recall and real-time updates, to ensure cited content uses the latest version.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recallCount` | Top 8-12 entries | TCM research reports contain multi-module exclusive content, and a sufficient recall range can cover relevant information from different modules |
| `similarityThreshold` | 0.72-0.85 | TCM research reports are dense with professional terminology. A threshold that is too low introduces irrelevant documents, while a threshold that is too high misses accurately matched professional content |
| `rerankTopN` | Top 5-7 entries | TCM research reports have highly professional content, and retaining core relevant documents after re-ranking meets traceability requirements |
| `maxContext` | 8000-12000 characters | The content of a single module in TCM research reports is relatively long, and sufficient context is required to carry original fragments for traceability |
| `quoteSourceFormat` | Follow the pattern of data source + document title + paragraph location | TCM research report traceability requires clear labeling of data source type and specific location to facilitate subsequent verification |
| `knowledgeBaseIncrementalUpdateInterval` | Every 1 hour (for pharmaceutical company announcements), every 7 days (for pharmacopoeia/industry reports) | Matches the update rhythm of different data sources to avoid citing expired content |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing the configuration.

## Three Common Configuration Mistakes
- Citation fragments are forcibly returned after interface calls, with no option to hide them. Cause: The `quoteEnable` parameter is not correctly configured to the off state, or the parameter configuration is not synchronized to deployed knowledge base nodes.
- The number of recalled citation documents exceeds or fails to meet preset requirements. Cause: Values for `recallCount` and `rerankTopN` are not adjusted based on the number of modules in TCM research reports, resulting in matching results that do not meet business needs.
- A `400 Bad Request` error is returned when triggering an API call, prompting that the context length exceeds the limit. Cause: The configured `maxContext` value is less than the total character length of currently recalled documents, exceeding the context limit supported by the model.

## How to Verify Successful Configuration
- Initiate a test search, check whether the format of citation fragments in returned results conforms to the preset `quoteSourceFormat` configuration, and verify that data sources and document locations are accurate.
- Adjust values for `recallCount` and `rerankTopN`, compare the number of recall results across different configurations, and confirm that results meet current business traceability requirements.
- Check incremental update logs of the knowledge base, and confirm that update intervals for different types of data sources match the configured `knowledgeBaseIncrementalUpdateInterval`.
- Call the interface to test the effect of the `quoteEnable` parameter, and confirm that citation content can be hidden or displayed as needed.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
