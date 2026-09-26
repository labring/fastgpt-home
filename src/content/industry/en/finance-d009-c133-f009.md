---
title: Citation Sources and Traceability for Securities Research Report Retrieval
slug: /en/industry/finance-d009-c133-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Securities Research
meta_description: Securities research report data primarily comes from public reports published by licensed securities research institutions, and report libraries
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Securities Research Report Retrieval

## What the data for this category looks like
Securities research report data primarily comes from public reports published by licensed securities research institutions, and report libraries collected by compliant financial data service providers. Update cadence follows daily concentrated updates; emergency reports released alongside corporate announcements or macroeconomic data can be updated at any time. The document structure of a single research report typically includes fields such as title, author, publishing institution, release time, investment rating, target price, core logic, earnings forecast, risk warning, etc. Investment rating is a qualitative description, target price is denominated in RMB yuan, and earnings forecast includes standardized quantitative fields such as earnings per share and price-to-earnings ratio.

## What constraints do these characteristics impose on the citation sources and traceability link
The compliance attributes and structured characteristics of securities research reports impose clear constraints on the citation and traceability process. First, research reports must indicate publishing institutions and release times, and the traceability process must fully display these fields to meet industry information disclosure compliance requirements. Second, research reports contain quantitative data with units such as target price and earnings forecast. Similar data from different reports may vary, so traceability must accurately match the specific slice’s values and source to avoid confusion. Third, research reports are updated at a high frequency, so the traceability process must associate with the latest report versions to prevent referencing outdated content that reduces decision accuracy. Fourth, single research reports are lengthy, so traceability after chunking must clearly indicate the approximate position of the chunk in the original report to help users locate the original content.

## How to Configure
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `Citation Source Field` | `Issuing Organization, Release Time, Research Report Title, Original Link` | Meets compliance disclosure requirements for securities research reports. This configuration fully displays the subject, time, topic and original access address required for traceability |
| `maxContext` | `8000-12000 characters` | Adapts to the core logic length of a single research report, and avoids truncating key traceability information including ratings and target prices |
| `Recall count` | `Top 3-5` | The core investment research logic of securities research reports is concentrated. This value retains valid information while avoiding redundancy |
| `Similarity threshold` | `0.75-0.85` | Filters low-correlation retrieval results, and adapts to the dense professional terminology characteristics of securities research reports |
| `Chunk size` | `1000-1500 characters` | Retains complete logical units of research reports, while adapting to conventional settings for most citation limits |
| `Display Citation Source Toggle` | `Enabled` | Meets compliance requirements of the securities industry, and clearly displays information sources to users |

> The parameter values listed on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules. Analyze specific cases individually, and test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: A `quote type error` error is returned when calling the knowledge base citation function. Cause: The parameter format of `Citation Source Field` is not configured as required, or the imported research report chunks do not include the specified traceability fields. For FastGPT 4.6.7 and later versions, this error is mostly triggered by mismatched field formats.
- Symptom: No knowledge base citation sources are displayed in the reply content. Cause: The `Display Citation Source Toggle` is not enabled, or the configuration of `Citation Source Field` is empty, so the system cannot extract traceability information.
- Symptom: Research report chunks exceeding the set length are returned even after setting `Citation limit` to 1500 characters. Cause: The `Chunk size` configuration is not set to an interval smaller than the citation limit, so the recalled original chunks themselves exceed the allowable citation length limit.

## How to Confirm Proper Configuration
- Upload a public securities research report to the knowledge base, launch a targeted retrieval query, and check if the configured `Citation Source Field` content is included in the reply.
- Check the system’s returned error logs to confirm that no `quote type error` related prompts appear.
- Compare the length of the retrieved research report chunks with the set `Citation limit` to confirm that the chunks do not exceed the preset length.
- Adjust the status of the `Display Citation Source Toggle`, launch the query again, and confirm that the display status of the cited content meets expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
