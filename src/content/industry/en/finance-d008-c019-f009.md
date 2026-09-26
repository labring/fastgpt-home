---
title: Citation Sources and Traceability for Duty-Free Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c019-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Duty-Free Intelligent
meta_description: Duty-free category due diligence data comes from three main channels: the Customs General Administration’s duty-free goods filing and public
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Duty-Free Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Duty-free category due diligence data comes from three main channels: the Customs General Administration’s duty-free goods filing and public notification system, offshore duty-free policy documents released by the Ministry of Finance, and daily operation ledgers of offshore duty-free shops.

Data updates follow two rhythms: policy documents are updated irregularly alongside national policy adjustments, while operation ledger data is updated daily based on business transaction records.

Document formats fall into two types: structured and unstructured. Filing and notification data uses table format, with fields including filing number, operating entity, category scope, upper quota limit, and others. Policy documents are multi-chapter texts, covering duty-free quota rules, verification requirements, and violation penalty clauses. Operation ledgers are detailed tables, with fields including transaction time, purchaser identity, product category, consumption amount, and others. Most field units use yuan and person-times, and filing numbers follow a unified administrative coding format.

## What Constraints Do These Characteristics Impose on the "Citation Sources and Traceability" Link
When working with mixed multi-source data, match corresponding data source identifiers during traceability to avoid confusing same-category data from different channels.

Policy data updates are irregular, so the traceability link must sync the latest policy versions. Failing to do so may result in citations of invalid old rules.

Structured fields require precise binding during traceability, rather than only using text matching. For example, a filing number must fully correspond to its associated operating entity.

When parsing long-text policy documents, avoid splitting rule clauses across chapters. Splitting such clauses will lead to incomplete traceability content.

Operation ledgers are updated frequently, so the recall link must prioritize transaction data from the latest dates. This ensures the timeliness of due diligence reports.

## How to Set the Configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `Recall count` | `Top 8 entries` | Core fields of duty-free due diligence data are concentrated, and a single piece of data has sufficient information. Excessive recall will increase context redundancy and interfere with the model's recognition of core rules |
| `Similarity threshold` | `0.75–0.82` | Fields such as duty-free filing numbers and upper quota limits have high recognizability. A threshold that is too low will introduce non-compliant data from unrelated categories, while a threshold that is too high will omit valid policy credentials |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | A complete offshore duty-free policy document may contain multi-chapter clauses, and parsing takes a long time. Setting this duration avoids timeout truncation of key content |
| `Chunk size` | `800–1000 characters` | Duty-free operation ledgers are structured tables. Too short a segment length will split verification rules across pages, while too long a segment length cannot meet precise context traceability requirements |
| `Rerank result count` | `Top 5 entries` | Duty-free due diligence reports need to prioritize relying on two core data types: filing vouchers and quota rules. Rearrangement retains the most relevant traceability entries |
| `enable_citation` | `true` (API call) | Enabling this parameter ensures that the returned result carries complete citation source information, meeting the traceability requirements of due diligence reports |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: When calling the API to generate a due diligence report, the returned result does not include the `citations` field. Cause: The `enable_citation=true` parameter is not included in the API request, or the citation permission configuration is not enabled for the release channel.
- Phenomenon: After increasing `Recall count` to 2000, the large model output does not reference any recalled content. Cause: The context window exceeds the model's carrying limit, and a large amount of redundant recalled content is not fully included in the prompt, causing the model to fail to trigger the citation logic.
- Phenomenon: Traceability works normally during local testing, but the citation field is empty when calling the external API. Cause: The external call did not correctly configure the `public citation permission` for the release channel, or the corresponding authentication parameter was not included in the request header.

## How to Confirm the Configuration Is Correct
- Enter the knowledge base management page, check whether the `引用来源` switch is enabled.
- Upload a duty-free operation ledger file, trigger parsing and check the parsed field list to confirm that core fields such as filing number and consumption amount are correctly extracted.
- Call the test API with the `enable_citation=true` parameter, check whether the returned result contains the `citations` field and the release time information of the corresponding source.
- Adjust the `Similarity threshold` to 0.7, upload a document of a non-duty-free category, and confirm that the recalled results only include matching duty-free related data, with no irrelevant content mixed in.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
