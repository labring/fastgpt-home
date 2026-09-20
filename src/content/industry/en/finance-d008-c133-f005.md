---
title: Multi-turn Dialogue and Prompt Engineering for Securities Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c133-f005
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Securities
meta_description: Securities due diligence data sources include public annual reports, quarterly reports, and temporary announcements of listed companies, compliance
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Securities Intelligent Due Diligence Reports

## What Data Looks Like for This Category
Securities due diligence data sources include public annual reports, quarterly reports, and temporary announcements of listed companies, compliance documents released by regulatory authorities, and public industry research materials. The update schedule is triggered by regular disclosure deadlines and real-time regulatory updates. Document structures mix structured tables and unstructured text paragraphs, and include fields such as security code, disclosure subject, disclosure time, core operating data, and related transaction details. Some fields have clear units of measurement.

## Constraints Imposed by These Characteristics on Multi-turn Dialogue and Prompt Engineering
The mixed structure of securities due diligence data requires multi-turn dialogue to support switching between structured field queries and unstructured text comprehension. The combined regular and real-time update schedule requires prompts to clearly define the data source’s disclosure time range, to avoid calling outdated information. The feature of multiple fields with clear units of measurement requires prompts to enforce that the model attaches corresponding units when returning results, to prevent data ambiguity. Additionally, due diligence often requires tracing related transactions and changes in operating data across multiple announcements, so the dialogue process must retain contextual association for multi-turn follow-up questions, to avoid information gaps.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–16000 characters` | Adapts to the long context requirement of tracing across multiple announcements for securities due diligence, preventing loss of key historical dialogue |
| `chunkSize` | `800–1200 characters` | Securities due diligence documents contain long paragraphs and structured tables; this segment length balances text integrity and retrieval accuracy |
| `similarityTopK` | `Top 8–12 results` | Covers core fields and related transaction details across multiple announcements, avoiding missing key information from single retrieval |
| `rerankTopN` | `Top 3–5 results` | Focuses on the most relevant due diligence data, reducing unnecessary information interference with dialogue logic |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Adapts to parsing time for large structured due diligence documents, preventing parsing interruptions |
| `promptTemplate` | `Please return the corresponding content for the fields asked by the user based on the uploaded securities due diligence documents, clearly mark the measurement unit and disclosure time corresponding to the data` | Adapts to the characteristics of multiple due diligence fields and the need for clear units and time, standardizing model output format |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: Calling the knowledge base dialogue interface returns results that do not include structured fields from the due diligence documents. Cause: The prompt template does not explicitly require extracting specified fields, causing the model to only return unstructured text content.
- Phenomenon: Knowledge base training results in empty data in a local deployment scenario. Cause: The `UPLOAD_FILE_MAX_SIZE` configuration value is smaller than the total size of the uploaded due diligence documents, or the `PARSE_FILE_TIMEOUT_SECONDS` setting is too short, causing large file parsing timeout.
- Phenomenon: Cross-announcement tracing query results in data confusion during multi-turn dialogue. Cause: The `maxContext` configuration value is too small, causing historical follow-up question context to be truncated, making it impossible to associate due diligence data from different disclosure times.

## How to Verify the Configuration Is Correct
- Upload a complete annual securities due diligence document, trigger knowledge base parsing, and check whether the parsed text blocks include core operating fields and related transaction details to confirm that the segmentation and parsing configurations take effect.
- Initiate a test dialogue with multiple follow-up questions, for example, first query operating data for a specific quarter, then follow up with details of related transactions in the same period, and check whether the dialogue context retains the subject and time range from the previous query to confirm that the context configuration is reasonable.
- Initiate a test query with clear field requirements, for example, "Please return core operating data within the specified disclosure period", and check whether the model return results mark the corresponding measurement unit and disclosure time to confirm that the prompt template configuration complies with requirements.
- Call the public dialogue interface to initiate a test request, check the field completeness and format of the returned results to confirm that the interface parameters are consistent with the front-end configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
