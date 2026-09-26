---
title: Citation Source and Traceability for Refining and Chemical Research Reports
slug: /en/industry/finance-d009-c094-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Refining and Chemical
meta_description: Refining and chemical research report data mainly comes from public disclosure documents of national petrochemical industry associations, local
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Refining and Chemical Research Reports

## What this category of data looks like
Refining and chemical research report data mainly comes from public disclosure documents of national petrochemical industry associations, local petrochemical industry associations, professional third-party consulting organizations, and leading refining and chemical enterprises. Update cycles fall into three categories: industry weekly reports are updated weekly, monthly supply and demand analysis reports are released monthly, and annual industrial planning reports are updated quarterly or annually. Document structures include core process parameters, plant capacity and utilization rate data, regional market price spreads, upstream and downstream supply and demand balance sheets, and policy interpretation modules. Fields include plant name, capacity unit of ten thousand tons per year, utilization rate percentage field, price spread unit of yuan per ton. Some research reports include on-site investigation details of enterprise production plants.

## Constraints imposed by these characteristics on citation source and traceability
Scattered data sources with multiple update cycles require accurate binding of the publishing organization, release time, and document type for each cited content. This prevents cross-cycle data confusion. Documents contain multiple types of structured fields such as process parameters, price spreads, and supply and demand balance sheets. Traceability must associate fields with specific chapters of the corresponding document to ensure cited parameters match original text descriptions. Some research reports include on-site survey details of enterprises. Traceability must retain survey subject information to maintain citation credibility. Documents with different update frequencies have distinct timeliness requirements. Traceability must label the document's update cycle to facilitate subsequent data timeliness verification.

## Configuration settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `recall count` | `top 8–12 entries` | Single refining and chemical research report has lengthy content. Too many recalls exceed the context window. Too few fail to cover core data citation points. |
| `similarity threshold` | `0.72–0.85` | Refining and chemical research reports contain many professional terms. A low threshold introduces irrelevant industry general articles. A high threshold may miss accurate process parameter citations. |
| `reordered return count` | `top 3–5 entries` | Retain the most relevant research report fragments for traceability, while controlling the number of citations per answer to avoid information overload. |
| `knowledge base filter tags` | `["refining and chemical research reports", "petrochemical industry data"]` | Accurately filter knowledge base documents of the target category, excluding interference from research reports of other industries. |
| `citation source display format` | `Show document title + publishing organization + release time` | Traceability of refining and chemical research reports requires clear source entities and timeliness, conforming to conventional industry data verification requirements. |
| `maxContext` | `8000–12000 characters` | The core data chapter of a single refining and chemical research report is usually 3000–5000 characters. Reserving sufficient window space fully retains the context of cited fragments.

> The parameter values provided on this page are conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. Testing on local samples is recommended before finalizing settings.

## Three common configuration mistakes
- Phenomenon: When configuring a dynamic knowledge base in the "knowledge base search" node of a workflow, no selectable variables appear in the "citation variable" dropdown menu. Cause: No variable of type "knowledge base ID list" was created in global variable management, or the variable did not enable public call permissions.
- Phenomenon: The original log content of the input and response of the knowledge base search node is displayed in the answer. Cause: The "log output" switch of the workflow node was not turned off, or intermediate steps of tool calls were not filtered in the answer template.
- Phenomenon: Mongodb logs cannot distinguish refining and chemical research report retrieval requests from different users or different sessions. Cause: No `session_id` and `user_id` fields were added as grouping identifiers in log writing configuration, and the knowledge base source field was not separately labeled.

## How to verify correct configuration
- Initiate a query related to refining and chemical research reports. Check if the citation sources below the answer include the document title, publishing organization, and release time. Verify that these match the document information in the target knowledge base.
- Enter the configuration interface of the "knowledge base search" node in the workflow. Confirm that the preset knowledge base ID variable appears in the "citation variable" dropdown menu.
- View Mongodb logs. Confirm that each retrieval request includes the `session_id`, `user_id`, and `knowledge_base_tags` fields. Logs can be viewed grouped by session or knowledge base source.
- Adjust the `similarity threshold` to 0.9, initiate a query, and confirm that the number of recalled documents has decreased significantly. Verify that the threshold configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
