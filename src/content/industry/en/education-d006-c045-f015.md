---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Progress
meta_description: Training Compliance: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics

## What this category's data looks like

This page addresses off-campus training compliance filing and penalty response scenarios. Materials come from three categories: school operation licenses, course filing materials, and fee disclosure. School operation licenses provide institution name, school address, validity period, and issuance date; course filing materials provide course name, number of class hours, filing date, and handler signature; fee disclosure provides fee items, amount basis, disclosure date, and receipt. The three types of materials are updated weekly or monthly. The field characteristic is that the name, quantity, and date of the same record often do not match across the two materials, versions are not synchronized, and signatures or receipts are missing. When materials enter the knowledge base retrieval service, each serves as a candidate fragment source for recall and comparison, and does not directly generate progress tables and statistical basis explanations.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The "progress table and statistical basis explanation" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the institution name, school address, validity period, and issuance date are consistent with the course filing materials | In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and check the names, dates, and signatures of the license fields against the filing material fields |
| Course filing materials | Whether the course name, number of class hours, filing date, and handler signature match the fee disclosure | Compare the ranking of the top few items before and after enabling `usingReRank`, see whether the course name and number of class hours are consistent across the two materials, and separately mark missing signatures or receipts |
| Fee disclosure | Whether the fee items, amount basis, disclosure date, and receipt are synchronized with the version of the filing materials | Adjust `similarity` to observe changes in the number of candidates and scores, check the disclosure date and receipt, and list items whose versions are not synchronized separately in the progress table |
| Progress table and statistical basis explanation | Whether the number of records and the statistical count match, and whether the basis is written in the header | Use one week of records to check the total, see whether the basis and exceptions are clearly stated; record the number of citations separately by array length, check the tokens of the cited text separately, and do not compare them as equal to the number of items |

## Three common errors

- Phenomenon: The name, quantity, and date of the same course do not match across the two materials. Cause: The materials are updated separately, and field-level verification and version synchronization have not been done.
- Phenomenon: The fee disclosure lacks a signature or receipt, but the progress table still includes it in the total. Cause: The statistical basis does not write exceptions in the header, and the number of records and the statistical count do not match.
- Phenomenon: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering and citation upper-limit trimming are not done.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few items; switch `searchMode` and `usingReRank`, and adjust `similarity` to observe changes in the number of candidates and scores.

Business test: use one week of records to check the total, see whether the basis and exceptions are clearly stated, and confirm that the number of records and the statistical count match.

- In the knowledge base search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and check the names, dates, and signatures of the school operation license, course filing materials, and fee disclosure.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and adjust `similarity` to observe changes in the number of candidates and scores; record the number of citations separately by array length, and check the tokens of the cited text separately.
