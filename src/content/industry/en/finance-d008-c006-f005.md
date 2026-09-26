---
title: Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine (TCM) Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f005
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Traditional
meta_description: Main data sources for TCM intelligent due diligence reports include public standards from the National Pharmacopoeia Committee, production processes
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine (TCM) Intelligent Due Diligence Reports

## What the data for this category looks like
Main data sources for TCM intelligent due diligence reports include public standards from the National Pharmacopoeia Committee, production processes and quality documents filed by pharmaceutical manufacturers, sampling inspection public data from market supervision departments, and circulation records from traditional Chinese medicine traceability platforms.
Data update cycles fall into three categories: National Pharmacopoeia standards are revised every five years. Enterprise filed documents are updated quarterly alongside production adjustments. Sampling and traceability data is updated monthly.
The core modules of a single due diligence report include original species, processing specifications, active ingredient content, production batch, and compliance qualifications. Corresponding units for each field are Latin species name, process steps, mg/g, production batch number, and unified social credit code.

## What constraints these characteristics impose on multi-turn dialogue and prompt engineering
The multi-source nature of TCM due diligence data requires multi-turn dialogue to first clarify the query scope: whether it covers general pharmacopoeia standards or exclusive due diligence content for a specific enterprise.
Active ingredient content fields include clear units such as mg/g. Prompts must enforce retaining corresponding units in output results to avoid disconnecting numerical values from their units.
Large differences in data update cycles require prompts to specify calling the latest version of national pharmacopoeia standards. Prompts must also distinguish between quarterly updated enterprise filed data and monthly updated sampling and traceability data.
Batch and traceability fields require precise matching. Multi-turn dialogue must gradually guide users to provide production batch numbers or traceability codes. Fuzzy retrieval will lead to result deviations, so this must be avoided.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | A single TCM due diligence report is typically 3000–5000 characters long. Multi-turn dialogue needs to retain multi-round context and multiple report contents to avoid context overflow |
| `Recall count` | `Top 8 entries` | TCM due diligence data includes multi-dimensional fields. Sufficient retrieved entries are required to cover modules such as original species, content, and qualifications, to avoid missing key information |
| `Similarity threshold` | `0.75–0.85` | A large number of approximate expressions exist in TCM terminology, such as roasted licorice and stir-fried licorice. If the threshold is too low, irrelevant results will be introduced. If the threshold is too high, approximate compliant terms cannot be matched |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | A single TCM due diligence report includes multiple sections of process descriptions and test data, which takes a long time to parse. This avoids file import failure caused by parsing timeout |
| `Chunk size` | `800–1000 characters` | Long paragraphs exist in TCM processing techniques and content test data. Too short segment length will destroy the logical coherence of process descriptions, while too long segment length will affect retrieval accuracy |
| `Rerank result count` | `Top 5 entries` | Multi-turn dialogue needs to prioritize returning the most relevant compliance data and test results, to avoid excessive redundant information interfering with user judgment |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- A common issue is empty retrieval results returned during multi-turn dialogue, while target content can be retrieved using the knowledge base test function alone. The cause is that the multi-turn dialogue context is too long, causing the query content during retrieval to be diluted by the context. The semantics of TCM terms are disrupted, preventing correct matching of retrieved entries.
- Another issue is a 404 Invalid URL (POST /api/chat/completions) error during dialogue. The cause is that the configured external data connection address is not correctly bound to the workflow node, or the API key is not configured in the platform, preventing normal calling of the database to query structured TCM due diligence data.
- A third issue is that the prompt requires responses to be no more than 300 words, but the actual output exceeds the limit. The cause is that the constraints for the TCM due diligence scenario are not clearly bound in the prompt, and the platform's built-in response length limit parameter is not enabled, causing the large model to ignore the word count constraint.

## How to confirm configurations are set correctly
- Initiate a query targeting the active ingredient content of a specific TCM material, and check whether the returned results include correct units, to confirm that the retrieval configuration meets current scene requirements.
- Upload a complete TCM due diligence report, wait for parsing to complete, then check the file parsing log to confirm no timeout alerts are triggered.
- Trigger multi-turn dialogue, sequentially raise query questions of different dimensions, and check whether the dialogue context is correctly retained without information loss.
- Add a word count constraint to the prompt, initiate a test query, and check whether the response length meets expectations, to confirm the constraint has taken effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
