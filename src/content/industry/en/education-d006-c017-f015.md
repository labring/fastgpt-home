---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Progress
meta_description: Undergraduate Programs: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for undergraduate program establishment and dynamic adjustment draw on materials including program establishment application forms, talent cultivation plans, and expert review opinions, with updates rolling according to application batches and adjustment cycles. The program establishment application form carries the proposed program name, code, duration of study, and person-in-charge information; the talent cultivation plan carries the course structure, credit requirements, and study sequence; the expert review opinions carry the review date, conclusion, and signature field. When these three types of materials enter knowledge base retrieval and recall, each is split, indexed, and recalled as an independent fragment for subsequent nodes or manual comparison of fields, dates, and signatures. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, the progress table and statistical scope description will show total discrepancies. Weekly or monthly reports need to align record counts with statistical counts, write the scope into the table header, and list exceptions separately.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The progress table and statistical scope description are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment application form | Whether fields, dates, and signatures are consistent with the talent cultivation plan | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and `similarity` scores, and verify the program name, quantity, and dates |
| Talent cultivation plan | Whether the course structure, credits, and study sequence are synchronized with the application form | Turn `usingReRank` on or off to compare the ranking of the top few results, and check whether versions are synchronized and receipts are complete |
| Expert review opinions | Whether the review date, conclusion, and signature field are complete | Check the number of returned candidates and the tokens of the quoted text, verify signatures and dates, and after using `limit` to control the number of candidates, perform manual comparison |
| Progress table and statistical scope description | Whether record counts and statistical counts match, and whether the scope is written into the table header | Use one week of records to verify the totals, check whether exceptions are clearly stated, and record the number of quoted items separately by array length |

## Three common errors

- Symptom: The program name, quantity, or date of the same record does not match between the application form and the cultivation plan. Cause: The versions of the two materials are not synchronized, and the field scope is not unified.
- Symptom: Expert review opinions lack signatures or receipts, but the progress table still includes them in the totals. Cause: The signature field and receipts are not included in the verification action, and exceptions are not listed separately.
- Symptom: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and rerank and similarity filtering are not tuned.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to check the ranking of the top few results.

Business test: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated.

- In the knowledge base search test, switch `searchMode` through semantic, full-text, and hybrid in sequence, and record the number of candidates and scores.
- Verify the tokens of the quoted text and the number of array items; record `limit` and the quote upper limit separately, and do not compare them as equal.
