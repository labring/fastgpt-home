---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Checks
meta_description: Skills Certification: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the social evaluation of vocational skill level certification, with materials drawn from three types: evaluation implementation plans, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan provides the batch, occupational direction, evaluation method, and time nodes, and serves as the primary baseline for names, quantities, and dates; the candidate registration form provides candidate names, ID numbers, declared levels, and signed receipts, and is used for item-by-item comparison of the same record; the assessor dispatch form provides assessor names, headcount, arrival dates, and signatures, and is used to check whether dispatch and the plan are synchronized. The three types of materials are archived by batch, and versions arise with plan revisions and registration corrections; the update cadence is per batch, and old versions are retained for reference. Field characteristics center on name wording, quantity definitions, date formats, and the presence or absence of signed receipts. When materials enter this feature, each plays a different role: the plan serves as the baseline source, while the registration form and dispatch form serve as comparison sources; cited snippets retain the original wording and source identifiers for subsequent nodes to locate discrepant fields.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check whether the batch name, number of evaluatees, start and end dates in the plan are consistent with the assessor dispatch form and registration form, and whether signatures and receipts are complete | Open the citation marker to trace back to the original paragraph, and record discrepant fields for names, quantities, and dates |
| Candidate registration form | Check whether the candidate name, declared level, and registration date are the same record in the registration form and the plan roster, and whether signatures and receipts are missing | Compare fields of the same record item by item, and flag unsynchronized versions and missing signature items |
| Assessor dispatch form | Check whether assessor names, dispatch headcount, and arrival dates correspond to the plan arrangements, and whether signatures are complete | Verify cited snippets against the source documents, and record discrepancies in quantities and dates |
| Cited content output | The number of returned entries matches the materials hit; an empty result is also normal, and the chain continues to run through | Run a test with a question that matches no materials, and observe that the array is empty while the chain is not interrupted |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the plan and the registration form. Cause: The two forms are entered separately, without item-by-item comparison by the same batch fields.
- Symptom: The cited snippet does not match the original text. Cause: It was first attributed to length truncation, without checking whether this round hit anything and which material was hit.
- Symptom: The dispatch form lacks signatures or receipts. Cause: The material circulation step did not write back, and versions were not synchronized, so old versions were still retrieved and hit.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and check whether the citation array and markers can trace back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain runs through.

Business test: use one real record to find fields inconsistent with the ledger.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the value of `quoteMaxToken`.
- Open the citation markers in the conversation, verify `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` against the source documents, and record the array entry count separately, without comparing it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
