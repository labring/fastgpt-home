---
title: Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Find Supporting Evidence
slug: /en/industry/education-d001-c022-f015
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Retrieval | Evidence
meta_description: Student Financial Aid: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Student Awards, Financial Aid and Hardship Assessment: Find Supporting Evidence

## What this category's data looks like

The materials for the student awards, grants, loans, and hardship determination scenario mainly include three types: the family economic hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form records family members, income, and hardship level; the application form records the applied item, amount, and review comments; the receipt records loan disbursement and arrival confirmation. All three types of materials contain name, student ID, department, date, and signature fields, and the same record often appears repeatedly in two materials. Materials are updated by academic year or batch; the determination form and application form change with the review cycle, the receipt changes with the loan batch, and old versions need to be taken down promptly or marked as invalid. When materials enter the knowledge base retrieval and recall function, the determination form and application form mainly serve as the basis source, and the receipt serves as the supporting evidence for arrival and signature; together, the three support cross-material basis queries and the generation of entries that can point back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The basis entries that can point back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Family economic hardship determination form | Fields include family members, income, hardship level, date, and signature; the name, quantity, and date of the same record in the two materials match; the version is current; signatures are complete | In the search test, switch `searchMode` to semantic, full-text, and hybrid, and check the number of candidates and scores; after filtering with `similarity`, see whether the determination form snippets retain the income and signature fields; check whether the returned entries can point back to the original text of the determination form |
| Scholarship/grant application form | Fields include applied item, amount, review comments, date, and signature; consistent with the determination form in name, student ID, and department; when the version is not synchronized, the current version prevails; if a signature is missing, it needs to be returned for supplementary signing | Use the `usingReRank` switch to compare the ranking of the first few items and confirm that the application form review comment snippets are ranked at the front; check whether the key paragraphs of the application form are complete after `limit` trimming; check whether the name and date of the same record in the application form and determination form are consistent |
| Loan receipt | Fields include loan disbursement, arrival confirmation, date, and signature; corresponds to the application form in amount and student ID; when the receipt is missing or the version is not synchronized, mark it as pending supplementation | Under hybrid retrieval, see whether receipt candidates appear together with application form candidates; check whether the receipt snippets can point back to the arrival and signature positions in the original text; record the number of candidates and scores, and confirm that the key fields of the receipt have not been trimmed away |

## Three common errors

- Symptom: the name or student ID of the same student does not match between the determination form and the application form. Cause: the two materials are entered separately, lacking cross-material field comparison and a unified primary key.
- Symptom: the loan receipt amount is inconsistent with the application form amount. Cause: the receipt is updated by batch, while the application form is updated by academic year; versions are not synchronized, resulting in residual old values.
- Symptom: the determination form or application form lacks a signature, or the receipt is missing. Cause: the material scanning or entry step did not verify the signature and receipt fields, and retrieval still returns that snippet.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle rerank to see the ranking of the first few items; switch `searchMode` and `similarity`, and check the tokens and array count of the quoted text after `limit` trimming, recording each separately.

Business test: ask a cross-material basis question, see whether the answer gives a citable source that can be pointed back to, and check whether the source can be located in the original text of the determination form, application form, or receipt at the corresponding field and date.

- In the search test, fix the question, switch `searchMode` and `usingReRank`, and record the number of candidates, scores, and changes in the ranking of the first few items.
- For the same record, check the name, student ID, amount, date, and signature in the determination form, application form, and receipt respectively, and mark whether the version is current.
