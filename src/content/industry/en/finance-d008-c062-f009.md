---
title: Citation Sources and Traceability for Advertising and Marketing Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c062-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Advertising and
meta_description: The data for advertising and marketing intelligent due diligence reports primarily comes from ad platform backend data, third-party media monitoring
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Advertising and Marketing Intelligent Due Diligence Reports

## What the data for this category looks like
The data for advertising and marketing intelligent due diligence reports primarily comes from ad platform backend data, third-party media monitoring reports, partner settlement vouchers, and archived ad creative materials. Data update frequencies fall into three categories: real-time delivery data is generated on the same day, media monitoring reports are updated daily, and settlement vouchers are updated monthly. The document structure includes fields such as delivery period, impressions, clicks, conversion data, creative ID, ad platform name, partner qualification number, and some documents include links to creative screenshots. Field units include counts (for impressions and clicks), yuan per unit (for conversion cost), and hours (for delivery duration).

## What constraints do these characteristics impose on the "citation sources and traceability" link?
The multiple update frequencies of advertising and marketing due diligence data require the traceability link to bind to the delivery cycle of the current due diligence project, to avoid retrieving invalid data across cycles. Documents from multiple sources are scattered across archives on different platforms, so traceability requires matching unique identifier fields such as creative ID and partner qualification number. Relying solely on text content matching can easily lead to confusion. Some documents include links to creative screenshots, so the citation link needs to support displaying non-text associated content. Long paragraphs of delivery detail documents require retaining the association between fields when segmented, to avoid losing the binding relationship between delivery metrics and corresponding creatives after splitting.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | Top 8-12 entries | Advertising and marketing due diligence data is scattered across documents from multiple delivery platforms, so a sufficient recall range is needed to meet due diligence requirements |
| `Similarity threshold` | 0.75-0.85 | A large number of similar delivery metric expressions exist in advertising and marketing data, so low-match irrelevant content needs to be filtered |
| `Chunk size` | 1000-1500 characters | Advertising and marketing due diligence documents include long paragraphs of delivery details, and this segment length can retain the association between fields |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Some advertising monitoring documents have large file sizes, so sufficient parsing time is needed to complete content splitting |
| `Citation field whitelist` | Includes impressions, creative ID, ad platform, partner qualification number | Advertising and marketing due diligence requires tracing specific delivery creatives and partner information, so key fields need to be limited for display |
| `knowledgeSearch` dynamic parameter | Bind to the delivery cycle of the current due diligence project | Ensure that only delivery data within the corresponding cycle is recalled, to avoid invalid recall across cycles |

## Three Common Configuration Mistakes
- Symptom: Only text datasets appear in the citation list, while image and structured table datasets are not cited. Cause: The `Enabled多模态数据召回` and `结构化数据解析` configurations are not enabled, and only plain text parsing mode is activated.
- Symptom: After configuring the `knowledgeSearch` dynamic parameter, the AI response does not return citations for the corresponding documents. Cause: The passed parameter variable is not bound to the knowledge base's filter conditions, or the parameter format does not comply with the knowledge base's filter rules.
- Symptom: Citation content cannot be displayed after iframe embedding. Cause: The `引用内容弹窗开关` is not enabled, or the front-end code does not correctly mount the DOM node for citation display.

## How to Confirm the Configuration is Correct
- Upload an advertising and marketing due diligence document that includes delivery metrics and creative links, trigger a knowledge base search, and check if the corresponding fragment of the document is included in the citation list.
- After configuring the `knowledgeSearch` dynamic parameter, pass a non-existent delivery cycle, and check that no matching documents are returned to confirm the filter logic is effective.
- Enable the citation display function, and check if the content in the configured `Citation field whitelist` is displayed on the conversation interface.
- Upload a large advertising monitoring document, check that the parsing task status code is `200` and there are no timeout errors, to confirm the parsing configuration is effective.

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
