---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Access
meta_description: Graduate Admissions: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Manage Authorized Access and External Services

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, materials enter authorized access and external services by role: the re-examination plan defines the process and timing, the candidate score sheet carries the preliminary and re-examination scores and rankings, and the adjustment list records adjustment batches and statuses. All three types of materials contain the three elements of fields, dates, and signatures (or receipts), and when they enter the knowledge base retrieval node they serve as cited sources for subsequent nodes to compare fields, write ledgers, and generate reports. Common inconsistencies: the name, quantity, and date of the same record do not match between the re-examination plan and the adjustment list; versions are not synchronized, causing an old table to overwrite a new one; missing signatures or receipts make the material incomplete. The update rhythm advances with admissions batches: the plan comes out first, the score sheet is supplemented later, and the adjustment list is dynamically added and removed. Sources must be checked by batch against source identifiers and original text fragments to ensure the external entry point and authorization scope are consistent.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. "The externally available entry point and authorization scope" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signatures are consistent with the adjustment list of the same batch | Open the citation marker to trace back to the original text, and check item by item the name, quantity, date, and signature column in the plan |
| Candidate score sheet | Whether the name, quantity, and date of the same record match between the score sheet and the re-examination plan | Access once with a restricted identity, see whether the visible scope matches the setting, and record the length of the citation array |
| Adjustment list | Whether the version is synchronized, and whether signatures or receipts are missing | Compare against the source document to check the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled), and check the source identifier and batch in `quoteList` |
| Knowledge base retrieval node | Cited content is output as an array, the length can be 0, and an empty array is also normal | Try running a question with no matching materials, see that the output is empty while the chain continues, then check the `quoteMaxToken` budget |

## Three common errors

- Symptom: the name, quantity, and date of the same candidate do not match between the score sheet and the adjustment list. Cause: the two materials are updated separately, and fields and signatures are not checked uniformly by batch.
- Symptom: the cited fragment does not match the original text, and there is no citation marker in the answer. Cause: this round had no hit, or the hit was an old-version material, and the version was not synchronized; the hit must be checked first before discussing trimming.
- Symptom: the material is missing a signature or receipt, but the external entry point is still visible. Cause: the authorization scope does not match identity and visible scope, and unauthorized visibility was not intercepted.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and record the number of citations and the value of the `quoteMaxToken` budget separately.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the length of the citation array and the `quoteMaxToken` budget.
- Open the citation marker in the conversation, compare against the source document to check `quoteList` within `responseData`, and check the fields, dates, and signatures of the re-examination plan, score sheet, and adjustment list.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
