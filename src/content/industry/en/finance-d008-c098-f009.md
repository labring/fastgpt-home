---
title: Citation Sources and Traceability for Coal Chemical Industry Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c098-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Coal Chemical Industry
meta_description: Coal chemical industry data sources mainly include public regulatory disclosure information, monthly monitoring data from industry associations
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Coal Chemical Industry Intelligent Due Diligence Reports

## What data for this category looks like
Coal chemical industry data sources mainly include public regulatory disclosure information, monthly monitoring data from industry associations, production and operation documents publicly disclosed by enterprises, and third-party quality inspection reports. Data update rhythms vary: regulatory data is updated quarterly, industry monitoring data monthly, and enterprise annual reports are released on a calendar year basis. Each single document covers fields such as designed production capacity, actual output, applicable coal types for raw materials, byproduct output volume, and environmental emission indicators. Units are ten thousand tons, tons, category identifier, tons, and milligrams per cubic meter respectively. Document structure primarily consists of multi-chapter structured content.

## What constraints do these characteristics impose on the "citation sources and traceability" link
The multi-source and heterogeneous nature of coal chemical industry data means the traceability link must distinguish credibility levels across different data sources. It must prioritize recalling content from original release channels, and avoid citing non-authoritative secondary processed information. Differences in data update frequencies require configuring rules to automatically update traceability timestamps based on data source tags. This ensures the displayed release time matches the original document. Each single document covers multiple professional dimensions and has a large content volume. Teams must limit the character length of a single recalled document to prevent context overflow from affecting answer accuracy. For fields dense with professional terminology, field-level recall configuration must be enabled. This ensures cited content accurately matches the professional needs of the query.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `Recall Count` | `Top 8-12 entries` | Coal chemical industry single documents have large content volume. Excessive recall will cause context overflow, while insufficient recall cannot cover multi-dimensional query needs such as production and environmental protection |
| `Similarity Threshold` | `0.72-0.85` | Coal chemical industry has dense professional terminology, so low-match irrelevant content must be filtered to avoid citing unrelated industry data |
| `Reranked Return Count` | `Top 4-6 entries` | Retain the most relevant high-match content while controlling the number of citations in a single round of answers, which meets the conciseness requirements of due diligence reports |
| `Knowledge Base Data Source Tag Filtering` | Check `Regulatory Disclosure, Industry Monitoring, Enterprise Disclosure` | Prioritize recalling credible original data sources, exclude non-authoritative secondary processed content, and ensure compliant traceability information |
| `Maximum Character Count per Document Split` | `800-1200 characters` | Adapt to the content structure of coal chemical documents. After splitting, it can accurately match the professional field needs of queries and avoid context overflow |
| `Citation Source Display Format` | `Original Release Channel + Document Title + Release Time` | Clearly display traceability information to meet the compliant traceability requirements of due diligence reports |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common misconfigurations
- Phenomenon: After passing the knowledge base ID via the API, the workflow cannot reference coal chemical data from the specified knowledge base, and the returned result is empty. Cause: The binding parameter for the knowledge base ID is not configured in the workflow node, or the scope of the global variable does not cover the current workflow node.
- Phenomenon: The citation traceability function is configured, but the returned coal chemical data does not match the content in the professional knowledge base at all. Cause: The similarity threshold setting does not meet current scene requirements, or the data source tag filtering rule is not enabled, resulting in mixing of irrelevant general data.
- Phenomenon: Coal chemical table and PDF documents uploaded to the knowledge base are not recalled and cited, only text datasets are normally displayed. Cause: The parsing switch for the corresponding document type is not enabled, or the split document fragments do not match the query keywords and field requirements.

## How to confirm configuration is complete
- Enter the FastGPT knowledge base management interface, check the configured data source tag filtering rules, and confirm that the data source categories corresponding to the target coal chemical data are selected.
- Initiate a test query targeting specific professional fields in the coal chemical industry, check the citation source list in the returned results, and confirm that the displayed content comes from the original documents of the target knowledge base.
- Check the workflow running logs, confirm that the passed knowledge base ID matches the ID of the target knowledge base, and there are no parameter binding errors.
- Check the split results of the target document, confirm that the split fragments contain the professional fields required by the query, and no key information is truncated.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
