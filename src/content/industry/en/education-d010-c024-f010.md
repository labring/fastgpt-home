---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Operations
meta_description: Graduate Admissions: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover

## What this category's data looks like

The materials for deployment, operations, and application handover in graduate admissions re-examination and admission include the re-examination plan, the candidate score sheet, and the transfer list. The re-examination plan carries the process, scoring dimensions, and date and signature fields, and is the basis for judgment; the candidate score sheet carries the preliminary examination and re-examination scores, conversion rules, and candidate numbers, and is the data source; the transfer list carries the transfer batch, proposed admission status, and receipt field, and is the destination of results. The materials come from admissions system exports, college submissions, and graduate admissions platform returns. The update rhythm is centralized updates after batch release, daily verification before and after the re-examination, and final review before admission publicity. When these materials enter the knowledge base retrieval node, each serves as a quotable original passage for referring back to sources in answers. Field characteristics: dates, signatures, quantities, and names must be consistent across different materials, and versions must be synchronized.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original passage fragment and a source identifier, and the length may be 0. The handover-ready deployment status and operation records are completed next by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields, dates, and signatures are complete, and names, quantities, and dates are consistent with the candidate score sheet and transfer list | Verify item by item the dates, signature fields, and candidate numbers in the re-examination plan, and refer back to the original passage; open the citation marker to compare against the source document |
| Candidate score sheet | Score fields, conversion rules, and candidate numbers match the names, quantities, and dates in the re-examination plan and transfer list | Verify the candidate numbers and quantities in the score sheet and transfer list, and confirm version synchronization; run a test with a question that has no matching material and see that the output is empty while the chain continues |
| Transfer list | Transfer batch, proposed admission status, and receipt signature are complete, and the version is synchronized with the re-examination plan | Verify the dates, signatures, and receipts in the transfer list, and confirm consistency with the re-examination plan and candidate score sheet; check that the number of citation array entries matches the matched materials |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and the search parameters are consistent with the values in the knowledge base retrieval section | In the node, verify the selected collections and their vector models; open the search parameter panel and verify item by item; record the number of citation array entries, record the tokens of the citation text separately, and do not compare the number of entries with `quoteMaxToken` for equality |

## Three common errors

- Phenomenon: The same candidate's name, quantity, and date do not match between the score sheet and the transfer list. Cause: The two materials were exported from different batches, and fields and dates were not verified item by item according to the handover sheet.
- Phenomenon: The version of the re-examination plan is not synchronized, and the old scoring dimensions are still cited. Cause: After the update, the version number and effective date were not verified, and the receipt was missing during handover.
- Phenomenon: The transfer list lacks a signature or receipt, and the cited fragment does not match the original text. Cause: It was attributed first to length truncation, without first checking whether this round matched and which material was matched.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. Check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled), view the source identifier of each citation in `quoteList`, compare the tokens of the citation text with `quoteMaxToken`, and record the number of array entries separately.

Business test: verify once item by item according to the handover sheet and see which item is missing from the record; verify the fields, dates, and signatures of the re-examination plan, candidate score sheet, and transfer list, confirm that the version, connection, and task record are consistent, and then hand over to operations or the next shift.

- Open the search parameter panel and verify item by item, confirming consistency with the values in the knowledge base retrieval section; in the node, verify the selected knowledge bases and their vector models.
- Run a test with a question that has no matching material, and see that the output is empty while the chain continues; in the conversation, open the citation markers, compare against the source documents, and verify that the cited fragments correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
