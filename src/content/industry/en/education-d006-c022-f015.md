---
title: Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c022-f015
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Retrieval | Progress
meta_description: Student Financial Aid: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the student awards, grants, loans, and hardship determination scenario. Materials include three types: family financial hardship determination forms, award and grant application forms, and loan receipts. The determination form contains family members, income, hardship level, and review signatures; the application form contains award name, amount, academic year, and approval signature; the loan receipt contains contract number, disbursement date, amount, and receipt seal. Materials are updated by academic year and batch, and weekly or monthly report nodes require progress aggregation. When entering the knowledge base retrieval service, the determination form and application form serve as candidate sources for field comparison and specification explanation, and the loan receipt serves as a candidate source for date, number, and seal completeness. Together, the three types of materials support the verification of record counts and statistical counts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The "progress table and statistical specification explanation" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Fields include family members, income, hardship level, and review signatures; dates and signatures must be consistent with the corresponding records in the application form | In the knowledge base search test, switch `searchMode` to hybrid, and verify the number of determination form candidates and their scores; compare the name, quantity, and date of the same record in the determination form and the application form |
| Award and grant application form | Fields include award name, amount, academic year, and approval signature; the version must be synchronized with the determination form | Test once each with synonym-rewritten questions to see whether the application form candidates include both semantic and full-text results; enable `usingReRank` to compare the ranking of the top few results |
| Loan receipt | Fields include contract number, disbursement date, amount, and receipt seal; missing signatures or receipts must be marked as exceptions | Verify whether the date and number of the receipt candidates are consistent with the application form; record the number of candidates and their scores, and check whether key snippets are retained after `similarity` filtering |
| Progress table and statistical specification explanation | Record counts and statistical counts must match, the specification must be written in the header, and exceptions must be marked separately | Use one week of records to verify the totals; check the tokens of the cited text, record the array count separately, and do not compare the count as equal to `limit` |

## Three common errors

- Phenomenon: the name and quantity of the same record do not match between the determination form and the application form. Cause: the two forms are entered separately and no field-level comparison is performed, so candidate snippets do not cover the differing items.
- Phenomenon: the application form version is not synchronized with the determination form, causing duplication or omission in statistical totals. Cause: update rhythms are inconsistent, and old versions remain in the knowledge base candidate pool.
- Phenomenon: the loan receipt lacks a signature or the receipt is missing, but the progress table still includes it in the total. Cause: receipt completeness is not marked separately as an exception, and the specification is not written in the header.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare the number of candidates and their scores, then toggle rerank on and off to observe the ranking of the top few results; switch `searchMode` and `similarity`, `usingReRank` to observe differences.

Business test: use one week of records to verify the totals, and check whether the specification and exceptions are clearly written; check the tokens of the cited text, and record the array count separately.

- In the knowledge base search test, switch the retrieval mode, compare the number of candidates and scores for the same question, and confirm that both semantic and full-text results have been merged.
- Use one week of records to verify the totals, compare the name, quantity, date, and signature of the determination form, application form, and loan receipt item by item, and write exceptions into the specification explanation.
