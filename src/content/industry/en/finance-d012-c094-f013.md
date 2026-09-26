---
title: Knowledge Base Retrieval and Recall for Refining and Chemical Marketing Content
slug: /en/industry/finance-d012-c094-f013
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Refining and
meta_description: Refining and chemical marketing-related data mainly comes from internal enterprise production management systems, marketing department material
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Refining and Chemical Marketing Content

## What the data for this category looks like
Refining and chemical marketing-related data mainly comes from internal enterprise production management systems, marketing department material libraries, and publicly available industry refining and chemical product parameter documents.
Update rhythms differ by data type: Marketing materials adjust with promotional activities, and are updated monthly to quarterly. Production-related parameters adjust with unit optimizations, and are updated weekly to daily.
Document structures fall into two categories: structured parameter tables and unstructured documents.
Structured fields include product grade, processing volume, and energy consumption indicators, with units such as tons, kg standard coal per ton, and others.
Unstructured documents include activity plans and customer communication scripts.

## What constraints do these characteristics impose on knowledge base retrieval and recall?
The refining and chemical category has a large number of structured parameters, dense professional terminology, and widely varying update rhythms. This imposes multiple constraints on retrieval and recall.
Structured product parameters require precise field matching to avoid semantic recall mixing product indicators across different grades.
Marketing materials update frequently with promotional activities. The system must support incremental synchronization and scheduled refreshes to prevent recalling expired campaign content.
Long documents such as activity plans must retain context information like campaign objectives and target audiences when split, to avoid losing key logic during segmentation.
The polysemy of professional terminology requires field restriction and synonym expansion to improve recall accuracy.
Unit matching rules must strictly comply with refining and chemical industry measurement standards.

## How to set configurations
| Configuration Item | Suggested Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–16000 characters` | Refining and chemical marketing documents often include long plans and professional parameters. Sufficient context preserves complete logic |
| `Max knowledge base citations` | `Top 6–10 entries` | Structured parameters and marketing materials have high relevance. Too many references increase context redundancy |
| `Similarity threshold` | `0.75–0.85` | Refining and chemical professional terms have high recognizability. A threshold that is too low may recall irrelevant parameter documents, while a threshold that is too high may miss valid content |
| `Chunk size` | `1000–1500 characters` | Long marketing plans need to retain complete information such as campaign cycles and target audiences. Segment spacing adapts to the paragraph structure of professional documents |
| `maxResponseTokens` | `2000–3000 characters` | Marketing content replies need to include product parameters and activity details. Sufficient length covers complete explanations |
| `Knowledge Base Incremental Sync Frequency` | `Every hour to daily` | Marketing materials are updated monthly to quarterly, while production parameters are updated weekly to daily. Synchronization frequency adapts to update rhythms |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The AI reply always includes the text "FastGPT is a knowledge base question answering system based on large language models (LLM)" at the end. Cause: No custom reply rules are configured in the system prompt, and the platform's default system preset output content is retained.
- Phenomenon: After deploying via docker-compose, knowledge base and workflow configuration items appear empty, but interface calls return normal results. Cause: The local data volume is not properly mounted or permission configuration is incorrect, and configuration files are not persistently stored after container restarts.
- Phenomenon: The structured parameters returned by retrieval do not match the units of actual requirements. Cause: Field-level unit matching verification is not enabled, only semantic similarity recall is relied on, and parameter measurement fields are not restricted.

## How to confirm the configuration is correct
- Upload a refining and chemical product parameter document and a marketing plan document. Check if the split segmented content retains complete activity logic and parameter information, and verify that the segment length matches the expected configuration.
- Initiate a test query to retrieve target refining and chemical product parameters or marketing campaign content. Check if the number of recall results meets the configured reference upper limit, and whether the similarity is within the set threshold range.
- Check the system prompt configuration. Confirm that the platform's default fixed output text is not retained, and that custom reply rules have taken effect.
- Manually trigger a knowledge base incremental sync. Check if the sync log shows that the latest marketing materials have been included, and confirm that the sync frequency configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
