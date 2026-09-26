---
title: Citation Sources and Traceability for Baijiu Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c113-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Baijiu Intelligent Due
meta_description: Baijiu due diligence report data mainly comes from official distillery quality inspection reports, process standard documents released by regional
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Baijiu Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Baijiu due diligence report data mainly comes from official distillery quality inspection reports, process standard documents released by regional industry associations, batch sampling reports from third-party testing institutions, and baijiu industry research reports from financial institutions.
Data update rhythm adjusts with product batches. New documents are added when new products launch or processes are adjusted. Regional standards and industry research conclusions are updated annually or semi-annually.
Most document structures include fields such as batch number, alcohol content, total acid and total ester content, production date, and manufacturer. Alcohol content uses the unit %vol. Total acid and total ester use the unit g/L. Industry research documents also include analysis fields such as market share and revenue forecasts.

## What Constraints Do These Characteristics Impose on the Citation Sources and Traceability Link
The multi-source and dispersed nature of baijiu data requires the traceability link to cover official documents, third-party testing reports, and financial industry research content. This avoids information bias from a single source.
Exclusive fields tied to batches require traceability to accurately associate with the corresponding product batch. Cross-batch mixing of quality inspection or market analysis information is not allowed.
Fields with clear units require retaining original unit identifiers during traceability. Failure to do so will reduce the validity of due diligence data.
The non-fixed update rhythm requires the recall link to prioritize recently published documents. This ensures the use of the latest product information and industry research conclusions, and meets the timeliness requirements of financial due diligence.

## Configuration Settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `Recall Count` | Top 6-8 results | Baijiu due diligence reports cover multi-dimensional fields. Sufficient recall volume supports complete original text responses and avoids information gaps |
| `Similarity Threshold` | 0.75-0.85 | Semantic differences between baijiu-related terms are small. Too low a threshold will introduce irrelevant documents. Too high a threshold will miss valid information from the same batch |
| `Reranked Return Count` | Top 3-5 results | Prioritize recalling the most matching batch quality inspection reports or official announcements. This ensures the accuracy and relevance of traceability information |
| `Citation Field Matching Rule` | Match by batch number + document type | Baijiu products distinguish quality inspection results and analysis content by batch. Traceability documents must be bound to the corresponding batch |
| `Document Update Time Filter` | Set according to business needs | Adapts to the non-fixed update rhythm of new baijiu product launches and process adjustments. Prioritize recently published valid documents |
| `Retain Units in Traceability Text` | Mandatory retention | Baijiu-related indicators require clear units such as %vol and g/L. Retaining units ensures the integrity of traceability information |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Phenomenon: The returned due diligence response does not use knowledge base original text, and additional generated supplementary content appears. Cause: The `Force citation of knowledge base content` parameter is not enabled, and the prompt does not limit use to only recalled document content.
- Phenomenon: After the workflow runs, the response does not include citation source document information. Cause: The `Return citation source` configuration item is not enabled in the knowledge base call node, or the output format of the citation template is not configured.
- Phenomenon: There is no knowledge base recall search result option in the variable selection list of the code running node, and the first result cannot be called. Cause: The output variable of the knowledge base node is not mapped to the input variable of the code node, or the variable transfer permission between nodes is not enabled.

## How to Confirm the Configuration Is Correct
- Upload a baijiu quality inspection report document with a clearly marked batch number, initiate a due diligence query for the corresponding batch, and check whether the response directly uses the original text content in the document.
- View the citation source module attached to the response, confirm that the displayed document title and batch number match the uploaded knowledge base document.
- In the workflow debugging panel, view the output log of the knowledge base node, confirm that the number of returned recall results matches the configured `Recall Count`.
- Test calling the knowledge base variable in the code running node, confirm that the fields of the first recalled result correspond correctly to the fields of the knowledge base document.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
