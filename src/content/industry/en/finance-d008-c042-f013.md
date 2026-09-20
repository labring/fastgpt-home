---
title: Knowledge Base Retrieval and Recall for Intelligent Due Diligence Reports in Brand Agency Operations
slug: /en/industry/finance-d008-c042-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Intelligent Due
meta_description: Data for intelligent due diligence reports in brand agency operations comes from e-commerce backend operation reports provided by brands, social media
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Intelligent Due Diligence Reports in Brand Agency Operations

## What the Data for This Category Looks Like
Data for intelligent due diligence reports in brand agency operations comes from e-commerce backend operation reports provided by brands, social media platform interaction data logs, publicly available competitor benchmarking documents, and user feedback collection forms.
Update cadence: daily synchronization of e-commerce data, weekly updates of social media interaction records, and monthly generation of full review reports.
Supported document types include structured Excel tables, unstructured graphic-text reports, and short-text user messages.
Fields include account identifier, posting time slot, interaction count, converted order count, and customer unit price (yuan). There is no unified fixed format; some reports add temporary statistical columns.

## How These Characteristics Impose Constraints on Knowledge Base Retrieval and Recall
The multi-source heterogeneous data characteristics of brand agency operations require the retrieval system to support both structured field matching and unstructured text retrieval. This avoids data omission caused by adapting only to a single format.
Frequently updated data requires incremental index updates. Full index updates consume excessive computing resources and cannot meet real-time due diligence requirements.
The presence of multi-column structured tables requires a chunking strategy that splits content by field dimension. This prevents unrelated column data from being included in a single chunk, which harms retrieval accuracy.
For long-form monthly review reports, balance must be struck between chunk length and contextual relevance. Too-short chunks break report logic, while too-long chunks increase retrieval noise.

## Configuration Settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `maxChunkSize` | 800–1200 characters | Brand agency operation data includes short single operation records and long-form monthly review reports. This range balances contextual integrity and retrieval accuracy |
| `recallTopK` | Top 8–12 results | Intelligent due diligence requires coverage of multi-dimensional operation data. Too many recalled results introduce redundant content, while too few miss critical benchmarking information |
| `similarityThreshold` | 0.72–0.85 | Brand data fields have relatively high correlation. A threshold that is too low introduces irrelevant competitor data, while a threshold that is too high misses valid operation records |
| `rerankEnable` | Enabled | Agency operation data includes multi-column structured information. The reranking model optimizes the sorting logic for field matching results and improves retrieval relevance |
| `UPLOAD_FILE_MAX_SIZE` | 200 MB | Monthly review reports may contain large volumes of historical operation data. 200 MB covers conventional upload requirements |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Large multi-column Excel tables take longer to parse. 300 seconds prevents parsing timeout failures |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- After calling the chat interface, no knowledge base matching content is returned. The interface returns a prompt of "No matching knowledge". The cause is failure to fill the unique identifier of the newly created knowledge base in the `datasetIds` field of the chat request.
- After retrieving a long document from the knowledge base, results are not sorted by relevance. The recalled results remain in the initial retrieval order. The cause is failure to enable the `rerankEnable` configuration, or the reranking model's trigger threshold exceeds the content length limit.
- When uploading a multi-column operation table, only two columns of data are extracted. The parsed document only displays two column fields. The cause is failure to configure multi-column parsing parameters, or failure to split content by field dimension during chunking, resulting in some column data not being indexed.

## How to Verify Proper Configuration
- Call the knowledge base creation interface, obtain the returned `id` field, fill this `id` in the `datasetIds` parameter of the chat request, initiate a test chat containing operation-related keywords, and verify that the returned results include the uploaded knowledge base content.
- Upload an operation Excel table containing three or more columns, view the parsed document details, and confirm that all column fields have been extracted and indexed.
- Initiate a retrieval request containing long-document keywords, view the interface returned log fields, confirm the presence of the `rerank` identifier, and verify that the reranking model is active.
- Adjust `similarityThreshold` to 0.78, initiate a retrieval, and verify that the similarity of returned results falls within the set threshold range.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
