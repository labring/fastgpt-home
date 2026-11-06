---
title: Citations and Source Traceability for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Handover
meta_description: Lab Safety Categories: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the university laboratory safety grading and classification scenario, focusing on cited sources and traceability in material drafting and responsibility handover. Three types of materials enter this feature: the laboratory grading and classification table, which records rooms, hazard source categories, and grade determinations; the hazard source list, which itemizes names, quantities, storage locations, and control measures; and the safety responsibility statement, which sets out responsible positions, signatures, and receipts. The three types of materials are cited as knowledge base sources in the retrieval node, each playing a different role: the grading and classification table provides the basis for grades, the hazard source list provides item-by-item facts, and the responsibility statement provides responsibility attribution and signing status. In terms of update cadence, the grading and classification table is adjusted as room use or hazard sources change, the hazard source list is updated as procurement, use, and disposal change, and the responsibility statement is re-signed per academic year or upon personnel changes. Field characteristics center on names, quantities, dates, version numbers, signatures, and receipts; the same record must remain consistent across the three materials before it can proceed to the next step of sign-off.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The "signable material drafts and handover records" are completed by subsequent AI nodes, code nodes, or manual work. The citation array is only responsible for bringing out the matched original text snippets and source identifiers; field comparison, ledger organization, and report generation all take place in subsequent steps.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Room names, hazard source categories, grade determinations, version numbers, and dates must be consistent with the hazard source list and the safety responsibility statement, and signature fields must not be left blank | In the citation array, trace each entry back to the original text paragraph, check names, quantities, dates, and version numbers, and check whether signatures and receipts are complete |
| Hazard source list | Item-by-item names, quantities, storage locations, and control measures must correspond to the grade determinations in the grading and classification table, with dates and version numbers synchronized | Open the citation markers to compare against the source documents, check that the number of entries matches the hit materials, and use `quoteList` to view the paragraph to which a single citation entry traces back |
| Safety responsibility statement | Responsible positions, signatures, receipts, and signing dates must be consistent with the responsible persons in the grading and classification table and the hazard source list; block when versions are not synchronized | Compare the cited snippets with the original text, verify responsible persons, signatures, and receipts, and confirm that dates and version numbers are consistent across the three materials |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal, and the chain continues to run through | Run a trial with a question that has no matching materials, and observe that the array is empty while the chain continues; when the citation limit is involved, check the tokens of the cited text, and record the number of array entries separately |

## Three common errors

- Symptom: the name or quantity of the same room does not match between two materials. Cause: during drafting, different versions were cited separately, and no item-by-item verification was made by tracing back to the original text.
- Symptom: the grading and classification table has been updated, but the hazard source list and responsibility statement are still old versions. Cause: versions were not synchronized, and dates and version numbers were not checked together.
- Symptom: the responsibility statement lacks a signature or receipt, yet the handover is still allowed through. Cause: the handover record did not list signatures and receipts as mandatory fields.

## How to verify the setup

Feature acceptance: ask a question with original-text support, check whether the citation array and markers can trace back to the original text, and use `quoteList` to view a single citation entry; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, confirm that `quoteMaxToken` is the cited content budget, record the number of array entries separately, and do not compare the two for equality.
- In the conversation, open the citation markers, compare each citation against the source documents to check whether it can trace back to the original text paragraph, and use `responseData` (non-streaming module results returned with detailed output enabled) to check the actual return structure of the citation array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
