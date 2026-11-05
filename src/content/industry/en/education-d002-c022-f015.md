---
title: Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c022-f015
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Retrieval | Checks
meta_description: Student Financial Aid: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenarios of student awards, grants, loans, and hardship determinations. The core materials include three types: the family financial hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form is submitted by the student and initially reviewed by the counselor, with fields including household population, income, hardship level, and signature; the application form is filled out by the student and summarized by the department, with fields including award name, amount, academic year, and date; the loan receipt is issued by the bank or the financial aid center, with fields including contract number, disbursement date, and receipt status. The three types of materials have different update rhythms: the determination form is submitted centrally by academic year, the application form rolls with batches, and the receipt is returned according to the disbursement cycle. When entering the knowledge base retrieval service, the determination form and the application form serve as the main sources for semantic and full-text recall, while the receipt serves as a supplementary source for verifying the disbursement date and signature. Each participates in merging and reranking in the form of candidate snippets, for subsequent nodes or manual comparison.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Check whether the name, quantity, date, and signature are consistent with the ledger | In the search test, switch `searchMode`, use semantic and full-text recall respectively, record the number of candidates and `similarity`, and compare the determination form fields |
| Scholarship/grant application form | Check whether the award name, amount, academic year date, and department signature are complete | Compare the order of the top few items before and after enabling rerank, and check whether the key snippets of the application form are still in the front after `usingReRank` takes effect |
| Loan receipt | Check whether the contract number, disbursement date, and receipt status correspond to the application form | Test once each with synonymous questions, see whether the receipt candidates are recalled, and separately record the number of items in the citation array and the text tokens after `limit` truncation |
| Same record across materials | Check whether the name, quantity, and date in the two materials match | Compare the determination form and application form candidates side by side, locate the fields that do not match, hand them to the reviewer for confirmation, and write them back |

## Three common errors

- Phenomenon: The name or student ID of the same student does not match between the determination form and the application form. Cause: The two materials are entered at different stages, no unified primary key association is made, and snippets are taken separately during retrieval recall.
- Phenomenon: The disbursement date on the loan receipt is inconsistent with the date filled in on the application form. Cause: The receipt version is not synchronized, the old receipt remains in the knowledge base, and both old and new candidates appear during recall.
- Phenomenon: The determination form lacks the counselor's signature or the receipt lacks the bank seal. Cause: The scanned materials are incomplete, the candidate snippets only cover the body text, and the signature and seal areas are not recalled.

## How to verify the setup

This feature acceptance: test once each with synonymously rewritten questions, compare the candidates and `similarity` scores, then toggle rerank on and off to see the ordering of the top few items, and check the change in the number of candidates after switching `searchMode`.

Business test: use one real record to find the field inconsistent with the ledger, record the position and score of that field in the candidate snippets, and hand it to the reviewer for confirmation.

- In the search test, run the same question in semantic, full-text, and hybrid modes respectively, record the number of candidates and `similarity`, and confirm that the relevant snippets are still in the front after `usingReRank` is enabled.
- Compare the candidate snippets of the determination form, application form, and receipt side by side, verify the name, quantity, date, and signature field by field, write the mismatches into the discrepancy list, and write them back to the ledger.
