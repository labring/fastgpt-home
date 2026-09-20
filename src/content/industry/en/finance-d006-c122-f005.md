---
title: Multi-turn Dialogue and Prompt Engineering for Joint-stock Bank Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c122-f005
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Joint-stock
meta_description: Joint-stock bank investment research data primarily comes from internal investment research teams’ industry analysis reports, policy documents
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Joint-stock Bank Investment Research Knowledge Base Construction

## What the data for this category looks like
Joint-stock bank investment research data primarily comes from internal investment research teams’ industry analysis reports, policy documents released by banking regulatory authorities, quarterly operating financial reports publicly disclosed by peer banks, and financial indicator data released by macroeconomic statistical departments. Update cadence varies significantly by data type: regulatory policies are updated in real time upon release, peer bank financial reports are updated quarterly, and internal research reports are released weekly. Document structure includes title, issuing entity, release time, core business indicators (such as capital adequacy ratio, non-performing loan ratio), chart annotations, and some files contain structured indicator tables. Units are mostly percentage points and hundreds of millions of RMB.

## What constraints these characteristics impose on multi-turn dialogue and prompt engineering
Multi-source and heterogeneous data types require multi-turn dialogue to distinguish retrieval logic between structured indicators and unstructured research reports, to avoid information confusion caused by mixed retrieval. Differences in data update cycles require prompt engineering to clearly specify the valid time range of data. For example, regulatory policies must prioritize retrieving content from the past 7 days, and peer bank financial reports may only use information disclosed in the current quarter. Unique professional fields in bank investment research (such as core tier 1 capital net amount) require prompt engineering to clearly define the field’s definition and unit, to prevent the AI from generating values that do not comply with industry specifications. Continuous investment research follow-up question scenarios require multi-turn dialogue context to fully retain previously mentioned institution names and indicator types, to avoid repeated questioning.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `Last 10 turns of dialogue history` | Joint-stock bank investment research dialogues mostly involve continuous industry and institutional analysis. Retaining 10 turns covers complete follow-up question logic and avoids context loss |
| `recall_top_k` | `Top 8 retrieval results` | The investment research knowledge base includes three core data categories: regulatory, peer, and macro. 8 results cover most investment research query needs and avoids interference from redundant information |
| `similarity_threshold` | `0.75–0.82` | Investment research data contains a large number of professional terms and industry indicators. A threshold that is too low will introduce irrelevant content, while a threshold that is too high will result in insufficient valid retrieval |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Bank investment research files often contain multi-page charts and structured tables, with longer parsing time than general documents |
| `UPLOAD_FILE_MAX_SIZE` | `1000 MB` | Bank investment research files often contain multi-page charts and structured tables, requiring relaxation of the default file size limit |
| `prompt_template` | `Please combine the following knowledge base content: {context}, answer the user's question regarding joint-stock bank regulatory indicators (such as capital adequacy ratio, non-performing loan ratio): {question}` | Clearly specify constraints for bank-specific regulatory indicators to prevent the AI from generating values and conclusions that do not comply with industry specifications |
| `default_question` | `Please query current joint-stock bank industry regulatory policies` | Investment research personnel often need to quickly obtain basic industry information, and the default question reduces initial operation steps |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Issue: An interface error occurs during official dialogue after connecting the knowledge base, with no abnormal prompt in the preview interface. Cause: The `cross_origin_whitelist` parameter is not configured, and the official environment domain name is not added to the allow list, resulting in interception of knowledge base interface calls.
- Issue: Uploading bank research report files to the dialogue box always fails to parse, with no error logs recorded in the backend. Cause: The `UPLOAD_FILE_MAX_SIZE` parameter is not adjusted. Bank investment research files often exceed the default file size limit, and upload requests are silently intercepted.
- Issue: The AI confuses regulatory policy content from different time periods in multi-turn dialogue, such as mixing 2023 policies with 2024 policies. Cause: The valid time range of data is not specified in the prompt, resulting in retrieval of invalid policy files across cycles and affecting query accuracy.

## How to Verify Successful Configuration
- Initiate a continuous follow-up question that includes joint-stock bank institution names and regulatory indicators, and check whether the dialogue history fully retains context information.
- Upload a bank research report file containing a structured indicator table, and confirm that field content can be correctly extracted after parsing.
- After configuring the default question, refresh the dialogue interface, and confirm that the initial question box automatically loads the preset content.
- Copy the content generated by the dialogue to an external tool, and confirm that the format can be rendered normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
