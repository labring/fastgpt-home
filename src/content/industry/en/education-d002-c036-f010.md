---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Checks
meta_description: Professional Exams: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Compare Documents and Locate Differences

## What this category's data looks like

For the professional and technical personnel qualification examination registration review, materials enter the knowledge base retrieval node as a three-part set: the registration form, the academic qualification certificate, and the work experience certificate. The registration form carries the name, ID number, examination subjects, work unit, and the applicant's signature; the academic qualification certificate carries the graduating institution, major, education level, graduation date, and seal verification; the work experience certificate carries the start and end dates, position, cumulative years, unit seal, and handler's signature. The three types of materials are uploaded in batches, updated centrally during registration season, and supplementary documents and receipts are appended separately. The field characteristics are a mix of structured tables and scanned documents, and the three types of fields—dates, names, and quantities—are most prone to discrepancies during cross-material comparison. The retrieval node returns cited snippets and source identifiers from the knowledge base selected by the same vector model, for subsequent nodes to verify field by field.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is completed next by a subsequent AI node, code node, or manual work, and is used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, examination subjects, work unit, and applicant's signature are consistent within the form and can be traced back to the original text | Open the citation corner mark to compare against the original paragraph of the registration form, verify field by field, and record the source identifier |
| Academic qualification certificate | Graduating institution, major, education level, graduation date, and seal verification are complete, and the date is consistent with what is filled in the registration form | Check whether the cited snippet traces back to the original text of the academic qualification certificate, and compare the graduation date with the value filled in the registration form |
| Work experience certificate | Start and end dates, cumulative years, position, unit seal, and handler's signature are complete, and the years range is consistent with what is filled in the registration form | Check whether the cited snippet traces back to the original text of the work experience certificate, and compare the start and end dates and cumulative years |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) can be checked | Run a test with a question that matches no materials, and see whether the array is empty while the chain continues |

## Three common errors

- Symptom: The graduation date or name of the same record does not match between the registration form and the academic qualification certificate. Cause: The two places were entered separately, and cross-material field comparison was not performed before proceeding to the next step.
- Symptom: The start and end dates on the work experience certificate are inconsistent with the years range filled in the registration form. Cause: The versions were not synchronized, and after supplementary documents were added, the old version of the material was still being retrieved and matched in the knowledge base.
- Symptom: The work experience certificate lacks a unit seal or handler's signature, and the registration form lacks the applicant's signature or receipt. Cause: The signature and receipt items were not checked against the material checklist during upload.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and check whether the number of entries in the citation array and the corner marks can trace back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain runs through; `quoteMaxToken` is only the citation content budget, and the number of array entries is recorded separately.

Business test: use a real record to find fields inconsistent with the ledger, compare the cited snippets with the ledger field by field, list the discrepancy list, and submit it to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- In the conversation, open the citation corner marks, check against the source documents whether each citation can trace back to the original paragraph, and record the source identifier in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
