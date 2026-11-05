---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Evidence
meta_description: Grades and Credits: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Find Supporting Evidence

## What this category's data looks like

In grade entry and credit recognition scenarios, materials usually include three types: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts carry course names, credits, grades, and entry dates; deferred examination applications carry the reason for application, original examination date, and signature; make-up examination arrangements carry make-up examination time, location, and receipt. When these three types of materials enter the knowledge base retrieval node, each participates in citation output as original text fragments: transcripts provide grade and credit fields, deferred examination applications provide the basis for deferral and approval signature, and make-up examination arrangements provide make-up examination nodes and receipt status. The material update rhythm is per semester; after version replacement, old versions may still remain in the knowledge base, so the names, quantities, and dates of the same record in two materials are prone to mismatch, and missing signatures or receipts may also occur. The function of this feature is to bring out these materials together with original text fragments and source identifiers, for subsequent field comparison, ledger writing, or response generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields include course name, credits, grade, and entry date; the signature column must be visible | In the citation fragment, check item by item whether the course name, credits, grade, and date are consistent with the original text, and confirm that the signature column appears in the fragment |
| Deferred examination application | Fields include reason for application, original examination date, and approval signature; the version must be current | Compare with the source document to confirm the reason for application and original examination date, check whether the approval signature is in the fragment, and verify whether the version is current |
| Make-up examination arrangement | Fields include make-up examination time, location, and receipt; the date must match the deferred examination application | Open the citation marker to compare with the source document, check the make-up examination time and location, and confirm whether the receipt appears in the fragment |
| Citation content array | The number of returned entries matches the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifiers in `quoteList`; `quoteMaxToken` is only recorded separately as a content budget |

## Three common errors

- Symptom: The name or credits of the same course do not match between two materials. Cause: Transcripts and deferred examination applications are entered separately, field definitions are not unified, and citation fragments each take the original text, resulting in differences.
- Symptom: The date in the make-up examination arrangement does not match the original examination date in the deferred examination application. Cause: Versions are not synchronized, and the old version of the make-up examination arrangement is still retrieved from the knowledge base.
- Symptom: No signature or receipt can be seen in the citation fragment. Cause: The signature column is missing when the material is scanned or entered, or the receipt was not stored in the knowledge base together with the make-up examination arrangement.

## How to verify the setup

Acceptance of this feature: ask a question with original text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: ask a cross-material basis question, and see whether the answer provides traceable sources.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, then run a test with a question that has no matching materials, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
