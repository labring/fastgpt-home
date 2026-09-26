---
title: Knowledge Base Retrieval and Recall for Aviation Airport Marketing Content
slug: /en/industry/finance-d012-c126-f013
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Aviation Airport
meta_description: Data sources for aviation airport marketing content include official airline cooperation manuals, terminal guide materials, seasonal marketing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Aviation Airport Marketing Content

## What data for this category looks like
Data sources for aviation airport marketing content include official airline cooperation manuals, terminal guide materials, seasonal marketing campaign copy, membership system rules, flight schedule announcements, advertising space leasing documents, credit card benefits from financial partnerships, travel insurance promotion copy, and more.
Update frequencies vary: flight schedule data is updated weekly, marketing campaign copy is updated monthly or quarterly, and leasing documents are updated as needed.
Documents mix structured and unstructured formats. Structured content includes flight schedules, price lists. Unstructured content includes campaign social posts, leasing manuals, with fields such as terminal number, gate number, takeoff and landing times, marketing campaign validity periods, paired with corresponding business units.

## What constraints these characteristics impose on retrieval and recall
Mixed structured and unstructured data formats require the retrieval pipeline to support both field-level matching and semantic recall, to avoid ambiguity across similar business fields.
Some data has strong timeliness and must be filtered by effective or expiration time, so the recall pipeline requires time range parameters to be configured.
Document lengths vary significantly, from short prompts of tens of characters to thousands of-word leasing manuals, so adaptive chunking rules are needed.
The presence of specific business fields requires separate indexing to ensure accurate matching of business needs during retrieval.
Financial partnership marketing content also requires additional permission isolation rules to prevent cross-institution content leaks.

## How to configure settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_TABLE_ENABLE` | Enabled | Aviation airport marketing data includes a large number of structured tables such as flight schedules and price lists. Enabling this option extracts field-level indexes to avoid semantic ambiguity |
| `RECALL_CHUNK_SIZE` | 800–1200 characters | Aviation marketing content has large length differences. This range balances the completeness of long-document context and the accuracy of short-text retrieval |
| `SIMILARITY_THRESHOLD` | 0.72–0.85 | Similar business fields such as terminal numbers and flight numbers must be distinguished to avoid recalling low-relevance content |
| `FILTER_EXPIRED_CONTENT` | Enabled, filter by the `content_expire_time` field | Most aviation content has clear effective/expiration times, so expired flight schedules and campaign copy must be automatically filtered |
| `RECALL_TOP_N` | Top 6–8 results | User inquiries in airport marketing scenarios mostly focus on high-frequency needs, and a small number of highly relevant results can cover requirements |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Adapts to the upload needs of large leasing manuals and high-definition guide materials, avoiding file truncation |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material formats, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Issue: When creating a knowledge base, the text embedding model dropdown does not display the added ollama qwen2.5 model. Cause: The text embedding model is not associated with the current knowledge base's index configuration, or the model type does not meet vector retrieval requirements.
- Issue: Knowledge base search returns the `invalid configuration parameter name "hnsw.iter"` error. Cause: A non-existent parameter name is written in the index configuration, or the parameter has spelling errors including spaces or incorrect capitalization.
- Issue: Cross-tenant access occurs in marketing knowledge bases across different enterprises, allowing interns to view content from non-affiliated enterprises. Cause: Multi-tenant permission isolation rules are not configured, and each enterprise's knowledge base is not bound to an independent access permission identifier.

## How to verify correct configuration
- Upload an Excel document containing a flight schedule, and check if structured fields such as flight number, takeoff and landing times are extracted in the parsing results.
- Initiate a search for "Terminal 3 activities" and confirm that only currently active Terminal 3 marketing content is returned in the recall results.
- Attempt to initiate a search using an unauthorized access identifier, and confirm that no content from the target knowledge base is returned.
- View the vector index monitoring panel, and confirm that the response time of retrieval requests meets preset business requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
