---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Multilingual
meta_description: Research Finance: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the research funding budget adjustment and reimbursement scenario, handling three types of materials—budget adjustment applications, reimbursement forms, and contract invoices—along with their multilingual counterparts. Sources include adjustment explanations submitted by project teams, financial circulation documents, and scanned supplier contracts and receipts, with updates rolling according to project milestones and financial cycles. Field characteristics center on names, quantities, dates, signatures, and acknowledgments: budget adjustment applications record account and amount changes, reimbursement forms record expense details and approval chains, and contract invoices record transaction parties and invoicing information. When materials enter the knowledge base retrieval and recall stage, they serve respectively as terminology sources, field comparison references, and anchors for referring back to the original text, used to generate a unified glossary and comparison draft, and to support terminology consistency checks before external release.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified glossary and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Account names, amounts, effective dates, and signatures must correspond item by item with reimbursement forms and contract invoices | In the search test, retrieve with synonymous questions, check whether the names, quantities, dates, and signatures in candidate snippets are consistent, and record the number of candidates and scores |
| Reimbursement form | Expense details, quantities, occurrence dates, and approval signatures must match contract invoices and budget adjustment applications | Switch `searchMode` to semantic, full-text, and hybrid, and compare whether candidate snippets cover both document fields and contract clauses |
| Contract invoice | Transaction parties, invoicing dates, quantities, and acknowledgments must remain version-synchronized with reimbursement forms and budget adjustment applications | Compare the top few rankings before and after enabling `usingReRank`, and check whether candidates retain key original snippets and acknowledgment information |
| Glossary and comparison draft | The same term is consistent throughout, translated names can refer back to the original text, and the three sampled entries are written consistently | Use `similarity` and `limit` to observe the number of candidates and scores, and check the cited text tokens and array counts separately |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are entered separately, terminology is not unified, and retrieval candidates do not cover the comparison fields.
- Phenomenon: The contract invoice and reimbursement form versions are not synchronized, and the old version's signature is missing. Cause: Update rhythms differ, acknowledgments are not archived together with the new version, and merged results mix in historical snippets.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, and key snippets are squeezed out after similarity filtering and citation limit trimming.

## How to verify the setup

This feature's acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the top few rankings; at the same time switch `searchMode` and `usingReRank`, record the number of candidates and scores, and check cited text tokens separately.

Business testing: Sample three terms to check whether their usage is consistent throughout, confirm that translated names can refer back to the original text, and verify the names, quantities, dates, and signatures of budget adjustment applications, reimbursement forms, and contract invoices.

- In the knowledge base search test, retrieve the same term with different questions, compare candidate snippets and similarity scores, and confirm whether the name, quantity, date, and signature fields are consistent.
- Enable and disable rerank separately, observe changes in the order of the top few candidates, check the cited text tokens and array counts, and confirm that key paragraphs have not been trimmed out.
