---
title: Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c066-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Retrieval | Review
meta_description: Journal Submissions: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results

## What this category's data looks like

The preliminary review of academic journal submissions involves three types of materials: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts contain the title, authors, affiliations, date, and signatures/seals; author information forms contain names, ordering, count, and receipt; plagiarism check reports contain the similarity rate, comparison sources, and detection date. Materials are updated by submission batch, and fields for the same manuscript must be consistent across different materials. After manuscripts enter the knowledge base retrieval and recall function, they serve as the primary candidate source and participate in semantic and full-text recall; author information forms are used to verify authorship and count; plagiarism check reports are used to trace anomalous sources. Together, the three types of materials support anomaly tracing and manual review. Retrieval results only provide candidate snippets and similarity scores, and do not directly generate statistical tables or authorization results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The anomaly list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Title, authors, affiliations, date, and signature are consistent between the manuscript and the author information form | In the search test, switch `searchMode`, compare semantic and full-text candidates, and check whether the hit snippets contain the signature and date fields |
| Author information form | Authorship order, author count, and receipt signature are consistent with the manuscript | Compare the order of the top few candidates before and after enabling rerank, and check whether the author count and receipt are recalled |
| Plagiarism check report | Detection date, similarity rate, and comparison sources are synchronized with the manuscript version | Adjust `similarity` and `limit`, check the number of returned candidates and scores, and confirm the report date and version |
| Anomaly record | The anomaly is supported by original records and signed by the reviewer | Search for the anomaly record using synonymous questions, trace it back to the source material, and record the number of candidates and scores |

## Three common errors

- Phenomenon: The name and count of the same record do not match between the manuscript and the author information form. Cause: The two materials were not updated synchronously according to the same version, and the retrieval candidates did not hit fields in both places at the same time.
- Phenomenon: The date of the plagiarism check report is inconsistent with the manuscript version date. Cause: The report was not synchronized with manuscript revisions, the recalled snippets only cover the old version, and the receipt or signature is missing.
- Phenomenon: There are many candidates, but the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled or the similarity filter is too broad, and key snippets are missing after citation upper-limit trimming.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to observe the ordering of the top few, and record the number of candidates and scores.

Business test: create an anomaly record, see whether it can be traced back to the source material, and verify the fields, dates, and signatures of the manuscript, author information form, and plagiarism check report.

- In the search test, switch `searchMode`, compare the candidate snippets and scores of the semantic, full-text, and hybrid modes, and confirm that they match the material form.
- Adjust `similarity` and `limit`, compare the ordering of the top few before and after enabling `usingReRank`, check the number of citations and citation text tokens, and do not compare array length with the citation budget for equality.
