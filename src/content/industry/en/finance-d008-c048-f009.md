---
title: Citations and Source Traceability for Urban Commercial Bank Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c048-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citations and Source Traceability for Urban Commercial Bank
meta_description: Data sources for urban commercial bank intelligent due diligence reports include credit files from internal credit management systems, quarterly
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citations and Source Traceability for Urban Commercial Bank Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Data sources for urban commercial bank intelligent due diligence reports include credit files from internal credit management systems, quarterly submission reports from local financial regulatory authorities, and corporate credit reports from local credit bureaus.
Data updates follow a quarterly schedule. Real-time compliance record data is updated monthly.
Most documents combine structured tables and unstructured risk descriptions. Fields include the unified social credit code of the credit subject, current credit balance, list of affiliated enterprises, and regulatory rating results.
The unit for amount fields is 100 million yuan. Rating results use grade-based expressions. Percentage-based statistical values are not used.

## Constraints on Citations and Source Traceability
Mixed structured and unstructured data structures require traceability to support both precise matching of structured fields and localization of non-consecutive text fragments. This prevents incomplete traceability caused by matching only partial text.
Quarterly update frequency requires traceability to mark the last update time of data. This prevents use of outdated information across update cycles.
Fields with unique identifiers such as unified social credit codes require traceability to prioritize these fields as the association basis. This reduces the risk of information confusion between different credit subjects.
Data sources cover internal management files and external regulatory reports. This requires the traceability chain to retain access and parsing logs for all data sources. This ensures compliance with permission requirements.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `similarity threshold` | 0.75–0.85 | Matches association accuracy between structured fields and unstructured text in urban commercial bank due diligence reports, avoids misclassifying low-relevance content as citation sources |
| `recall count` | Top 6 | Valid citation fragments for urban commercial bank due diligence reports typically do not exceed 5 segments. Setting top 6 covers all valid sources while reducing redundancy |
| `maxContext` | 1200 characters | Adapts to the average length of single documents for urban commercial bank due diligence reports, ensures complete credit subject information and compliance descriptions are included during context recall |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Urban commercial bank due diligence reports contain batch structured tables, which have long parsing times. 300 seconds prevents parsing interruptions for large documents |
| `referenceUpdateTimestamp` | Enabled | Marks the last update time of citation sources, aligns with the quarterly update rhythm of urban commercial bank data, ensures timeliness of traceability information |
| `structuredFieldMatch` | Enabled | Prioritizes matching unique identifier fields such as unified social credit codes, reduces the risk of information confusion between different credit subjects |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: Only a citation list is displayed after generating a reply, with no valid answer content. Cause: The `structuredFieldMatch` parameter is not configured, causing structured field matching to fail. This prevents association of credit subject information in due diligence reports, and the large language model cannot generate a corresponding answer.
- Phenomenon: In FastGPT 4.9.6, when accessing the application via a non-login share link, the citation viewing function is disabled but the citation module still appears. Cause: Both `referenceSourceDisplay` and `shareAnonymousEnableReference` configuration items are not disabled simultaneously. Disabling only the former does not take effect.
- Phenomenon: Citation sources from the previous round cannot be traced during multi-turn conversations. Cause: `maxContext` is not set to cover the context length of the previous round of conversation, causing citation association information to be lost during recall.

## How to Confirm Proper Configuration
- Upload a test document of an urban commercial bank due diligence report, initiate a query containing the credit subject name, and check whether the update time of the citation source is marked in the returned results.
- Adjust the value of `similarity threshold`, initiate multiple queries, and check whether the number of returned citations matches the expected range.
- Generate a non-login share link, disable the citation viewing function, access the link again, and check whether the citation module is hidden.
- Initiate two consecutive queries, and check whether the second round of reply associates the citation source from the first query.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
