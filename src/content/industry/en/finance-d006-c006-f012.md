---
title: Model Access and Configuration for Traditional Chinese Medicine (TCM) Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f012
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Traditional Chinese
meta_description: TCM investment research data mainly comes from national pharmacopoeia standards, clinical research literature, pharmaceutical company quality control
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Traditional Chinese Medicine (TCM) Investment Research Knowledge Base Construction

## What this category of data looks like
TCM investment research data mainly comes from national pharmacopoeia standards, clinical research literature, pharmaceutical company quality control reports, and herbal material circulation monitoring data. Update cadences vary significantly: national pharmacopoeia standards are formally revised every several years; clinical literature is updated in real time alongside research progress; internal enterprise quality control and circulation data are updated monthly. Each single document has a fixed structure, including fields such as medicinal material origin, nature, taste and meridian tropism, functions and indications, usage and dosage, chemical component content, and pharmacological activity data. Dosage fields mostly use grams or milligrams as units, and chemical components are marked with specific content values and corresponding units.

## What constraints these characteristics impose on model access and configuration
The multi-source nature of TCM investment research data, combined with fixed structure but diverse field dimensions, creates multiple constraints for model access and configuration.
Vector normalization levels vary significantly across data from different sources, so parameters adapted for non-normalized vectors must be configured.
The fixed field structure requires precise matching of medicinal material-related fields during retrieval, so retrieval rules and thresholds need adjustment.
Chemical component and pharmacological data make up a high proportion of long text paragraphs, so chunk length must be adjusted to fit the model's context window capacity.
Real-time updated clinical literature and circulation data require a scheduled vector update workflow to ensure knowledge base timeliness.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedding_normalization` | Enabled | Adapts to non-normalized vector data from sources such as pharmacopoeias and literature, and complies with the vector model normalization configuration requirements added in version 4.8.23 |
| `chunk_size` | 800–1200 characters | Adapts to long paragraph splitting of chemical component and pharmacological data in TCM documents, avoiding single-segment content exceeding model input limits |
| `similarity_threshold` | 0.75–0.85 | Enables precise matching of fixed fields such as medicinal material origin and functions and indications, filtering low-relevance non-medicinal material search results |
| `top_k` | Top 6–8 results | Covers multi-field information of a single medicinal material document, avoiding missing key data due to insufficient recall results |
| `PARSE_FILE_TIMEOUT_SECONDS` | 120 seconds | Processes long documents containing large amounts of chemical component data, avoiding parsing timeout failures |
| `tool_choice` | auto | Allows the model to independently determine whether to call the document retrieval tool, adapting to the call demands of multi-source data in investment research |

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to conduct tests on your own samples before finalizing settings.

## Three frequently made errors
- Phenomenon: Configuring `tool_choice` to fixed tool call instead of setting it to `auto`, causing the model to be unable to independently determine whether to call the document retrieval tool, and the investment research workflow cannot flexibly adapt to dynamic data demands. Cause: Failing to adjust tool call logic based on the multi-source, multi-field scenario of TCM investment research, and incorrectly fixing tool trigger rules.
- Phenomenon: Adding models such as `gpt-4.1-mini` and `qwen3` in FastGPT version 4.9.2 fails, and a prompt of empty model streaming response is returned during calls. Cause: Failing to correctly configure the model API key and interface address, or failing to enable the model's streaming output switch, resulting in the model being unable to return normal response content.
- Phenomenon: Image download failure errors occur when calling the multimodal visual large model `Qwen2.5-vl` interface. Cause: Failing to configure an accessible image proxy service, or the image links in the knowledge base have access permission restrictions, causing the model to be unable to obtain the image materials to be analyzed.

## How to confirm configurations are correct
- Submit a single TCM standard document for parsing, check that the parsed segment length matches the configured `chunk_size`, confirming that the segmentation rule is in effect.
- Initiate a search for keywords related to medicinal materials, check that the similarity of returned results matches the configured `similarity_threshold`, confirming that the retrieval rule is in effect.
- Test triggering the tool call workflow, confirm that the model can independently choose whether to call the document retrieval tool, verifying that the `tool_choice` configuration is in effect.
- Upload a TCM clinical research document containing images, confirm that the model can normally obtain and analyze the image content, verifying that the multimodal interface configuration is in effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
