---
title: Knowledge Base Retrieval for Vocational College Skills Competition Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c033-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Retrieval | Progress
meta_description: Skills Competitions: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Skills Competition Organization: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials involved in organizing vocational college skills competitions: competition regulations, registration forms, and training plans. Competition regulations contain the event name, group, date, and signature field; registration forms contain contestant name, class, event, supervising instructor, and acknowledgment; training plans contain week number, training content, and supervising instructor signature. Materials are updated according to the pre-competition, during-competition, and post-competition rhythm; regulations are revised with notices, registration forms are revised with supplementary registrations, and training plans are submitted weekly. When entering knowledge base retrieval and recall, regulations provide the rule basis, registration forms provide personnel and quantities, and training plans provide process records. The progress table and statistical scope description need to align the fields, dates, and signatures of the three types of materials, ensure the record counts and statistical counts match, and write the scope into the table header.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The "progress table and statistical scope description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the fields, dates, and signatures match those in the registration forms and training plans | In the search test, switch `searchMode` and check whether the event name, group, date, and signature field in the regulations are consistent with the registration forms |
| Registration forms | Whether the name, quantity, and date of the same record are consistent across the regulations and training plans | Use `similarity` to observe candidate scores and check whether contestant name, event, supervising instructor, and acknowledgment signature are complete |
| Training plans | Whether versions are synchronized and whether missing signatures or acknowledgments are clearly stated | Compare the ranking of the top few results before and after enabling `usingReRank`, and check the week number, training content, and supervising instructor signature |
| Knowledge base retrieval service | Whether the number of candidates and scores can be reviewed | Record the number of returned candidates and scores, and separately record the number of items in the citation array and the tokens of the cited text after `limit` truncation |

## Three common errors

- Symptom: the name, quantity, and date of the same contestant do not match between the registration form and the training plan. Cause: the two materials are revised separately, versions are not synchronized, and they are not aligned by event and week number.
- Symptom: after the competition regulations are revised, the registration form still references the old group and old date. Cause: the materials are updated at different rhythms, and version markers and acknowledgment signature confirmation are lacking.
- Symptom: the training plan lacks the supervising instructor signature or acknowledgment. Cause: the submission step does not check the signature field, the statistical scope does not write exceptions into the table header, and the total does not match the record count.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; record the number of candidates and scores, switch `searchMode`, and check the impact of `similarity`, `usingReRank`, and `limit`.

Business test: use one week of records to check the total and see whether the scope and exceptions are clearly stated; align the record counts and statistical counts of the competition regulations, registration forms, and training plans item by item, and confirm that the table header scope covers signatures and acknowledgments.

- In the knowledge base search test, retrieve the same question once for each rewording, record the number of candidates and scores, and compare the candidate differences under the three `searchMode` modes.
- View the ranking of the top few results once with rerank enabled and once disabled, check the number of items in the citation array, and separately record the cited text tokens and the completeness after `limit` truncation.
