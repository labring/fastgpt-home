---
title: Citation Source and Traceability for Gas Industry Research Reports
slug: /en/industry/finance-d009-c099-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Gas Industry Research
meta_description: Gas industry research report data mainly comes from public reports of industry associations, regular financial reports of listed gas companies, policy
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Gas Industry Research Reports

## What the data for this category looks like
Gas industry research report data mainly comes from public reports of industry associations, regular financial reports of listed gas companies, policy interpretations from energy regulators, and special analyses from third-party energy consulting institutions. Updates follow a monthly and quarterly regular schedule. Temporary special reports are released when gas prices adjust or pipeline construction policies change. Each document includes modules such as report title, issuing institution, release date, core business data, risk warnings, and investment ratings. Core fields involve total gas supply, pipeline mileage, LNG CIF price, and more. Most units use common energy measurement units like cubic meters, yuan/ton, and kilometers.

## What constraints do these characteristics impose on the "citation source and traceability" link
The multi-source update feature of gas industry research reports requires the traceability link to accurately match the issuing institution and release date, to avoid confusing content on the same topic from different institutions. The flexible update schedule requires the recall logic to prioritize sorting by release time in reverse order, to ensure the latest research reports are displayed first. Clear core data fields in documents require traceability to locate specific chapters and paragraphs, rather than citing entire sections, to avoid data ambiguity. Diverse measurement units require traceability labels to include unit information, to prevent misreading of professional data. Some reports involve sensitive policy content, requiring the traceability link to retain complete source identifiers for compliance verification.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | `Top 10-15 entries` | Gas industry research reports have multiple data dimensions. Too many recalled entries will cause redundant context, while too few will fail to cover core viewpoints |
| `similarity threshold` | `0.75-0.85` | Professional terminology accounts for a high proportion in the gas industry. A threshold that is too low will introduce irrelevant general energy research reports, while a threshold that is too high will miss relevant matching content |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Single gas industry research report has a relatively long length, so sufficient time is required for field extraction and sectioning during parsing |
| `maxContext` | `8000-12000 characters` | Core data paragraphs of gas industry research reports are relatively long, so sufficient context is needed to retain complete field and unit information |
| `citation source display format` | `"Issuing Institution" + "Release Date" + "Chapter Title"` | Traceability of gas industry research reports requires clear source and specific location to facilitate users to verify original data |
| `rearranged return count` | `Top 5-8 entries` | Prioritize displaying the most relevant research report content, to avoid users being disturbed by too many non-core results |

> The parameter values provided on this page are common recommendations for starting point configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Errors
- Phenomenon: When calling the knowledge base to retrieve gas industry research reports, the returned results only mark 1 citation, and the prompt indicates insufficient citation upper limit. Cause: The `maxContext` configuration value is too small to accommodate context fragments of multiple research reports, or the global citation upper limit is set unreasonably.
- Phenomenon: In version 4.8.22, after importing a gas industry research report knowledge base in JSON format, the knowledge base option is empty when the application starts, and the corresponding knowledge base must be selected manually. Cause: The `DEFAULT_KNOWLEDGE_BASE_ID` parameter is not configured, or the imported JSON file fields do not meet the platform's parsing specifications.
- Phenomenon: Clicking the download button of the citation source fails to obtain the original fragment content of the corresponding research report. Cause: The `SOURCE_FILE_DOWNLOAD_ENABLE` configuration is not enabled, or the parsed research report fragments do not retain the downloadable link of the original file.

## How to Confirm Proper Configuration
- Initiate a gas industry research report retrieval, check the citation labels in the returned results, and verify whether the labeled issuing institution and date are consistent with the source file.
- Enter the knowledge base management interface, check whether the imported gas industry research report files display normal parsing progress and field information.
- Adjust the `recall count` parameter, initiate multiple retrievals, and observe whether the number of returned citations changes with the configuration.
- Click the download button of the citation source, and confirm that the original fragment content of the corresponding research report can be obtained.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
