---
title: Citations and Source Traceability for Graduate Education Process Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c025-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Citations | Checks
meta_description: Graduate Education: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Education Process Management: Compare Documents and Locate Differences

## What this category's data looks like

Graduate training process management involves three types of materials: training plans, proposal reports, and mid-term assessment forms. The sources are supervisor submissions, college academic affairs archiving, and system ledgers. The update cadence advances according to semester milestones. Field characteristics center on name, student ID, course name, credit count, proposal date, assessment date, signature, and receipt. When a training plan enters this feature, it serves as the baseline source for verifying courses and credits; the proposal report serves as process material for verifying the title, date, and signature; the mid-term assessment form serves as stage material for verifying the assessment conclusion, date, and receipt. In knowledge base retrieval, each of the three types of materials is cited in the form of original text snippets, and the number of citations matches the hit materials; being empty is also a normal output. During material verification, first check whether the name, quantity, and date of the same object are consistent across the two materials, then check whether the versions are synchronized and whether signatures or receipts are complete, and finally hand the discrepancy list to the reviewer for confirmation and write it back to the ledger.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The discrepancy list is completed subsequently by an AI node, code node, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Course name, credit count, date, and signature are consistent between the training plan and the ledger | Open the citation marker, compare against the original paragraph of the training plan, check whether the course name, credit count, date, and signature are consistent with the ledger, and record the discrepancy fields |
| Proposal report | Title, proposal date, signature, and receipt are consistent between the proposal report and the ledger | Check the title, proposal date, signature, and receipt in the original snippet of the proposal report, compare against the ledger fields, and confirm whether the versions are synchronized |
| Mid-term assessment form | Assessment conclusion, assessment date, signature, and receipt are consistent between the mid-term assessment form and the ledger | Check the assessment conclusion, assessment date, signature, and receipt in the original snippet of the mid-term assessment form, compare against the ledger, and record the inconsistent fields |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues; inspect the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The training plan and proposal report are submitted by different nodes, and the field definitions are not unified, so field-by-field comparison is required before locating the discrepancy.
- Symptom: Versions are not synchronized, and an old proposal report coexists with a new mid-term assessment form. Cause: After the materials were updated, they were not written back to the ledger, and the cited snippet still points to the old original text, so the version of the hit material must be checked.
- Symptom: A signature or receipt is missing, and the signature field in the cited snippet is empty. Cause: The sign-off step in the material circulation process was not completed, so the original snippet and source identifier must be checked to confirm whether the sign-off step was omitted.

## How to verify the setup

Feature acceptance: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and inspect `quoteList` within `responseData`.

Business test: use a real record to find fields inconsistent with the ledger, record the discrepancy list, and after confirmation by the reviewer, write it back.

- Open the citation markers, compare item by item against the source documents, check whether the cited snippets correspond to the original text, and record the inconsistent fields.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and check that `quoteMaxToken` is the content budget and that the array entry count is recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
