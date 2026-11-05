---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Checks
meta_description: Research Agreements: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Compare Documents and Locate Differences

## What this category's data looks like

The signing of scientific research project task statements involves three types of materials: the project task statement, the subject task breakdown table, and the budget statement. The project task statement is drafted by the lead unit and states the project name, number, start and end dates, undertaking unit, and signature fields; the subject task breakdown table is filled in by each subject leader and lists the subject name, leader, task milestones, and corresponding budget; the budget statement is jointly prepared by the finance and scientific research management departments and lists budget subjects, amounts, calculation basis, and approval signatures. The three types of materials are updated according to the rhythm of preliminary review before signing, re-review during signing, and archiving after signing, and the version number and date need to be synchronized. When entering this function, the project task statement serves as the main object, while the subject task breakdown table and budget statement serve as comparison sources, each providing field fragments for citation output, to be used for subsequent field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work; the citation array itself is not the discrepancy list.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task statement | The name, number, start and end dates, and signature fields must be consistent with the ledger | Retrieve the original paragraph of the task statement, check whether the project name, number, start and end dates, and signature page are complete, and record the cited fragment and source identifier |
| Subject task breakdown table | The subject name, leader, task milestones, and budget must correspond to the task statement | Compare the subject name, leader, milestone dates, and budget amounts item by item, list mismatched fields separately, and annotate their sources |
| Budget statement | The budget subjects, amounts, calculation basis, and approval signatures must be consistent with the breakdown table | Check the budget subject names, amounts, calculation basis, and approval signatures, and verify whether the version date is synchronized with the task statement |
| Citation output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a trial query with a question that has no matching materials, observe that the array is empty while the chain continues, and register the array length and the `quoteMaxToken` budget separately |

## Three common errors

- Phenomenon: The name, quantity, or date of the same subject does not match across the two materials. Cause: Different reporting standards or failure to check back against the original table during transcription, resulting in deviations in field values.
- Phenomenon: Versions are not synchronized; the task statement has been updated while the breakdown table or budget statement is still an old version. Cause: Update notifications did not cover all preparers, and the version number was not rechecked during archiving.
- Phenomenon: Missing signatures or receipts, and the cited fragment cannot point back to the approval page. Cause: Uploading before the signing process is complete, or missing pages in scanned copies, causing retrieval to hit incomplete paragraphs.

## How to verify the setup

This function's acceptance check: ask a question with original-text support, check whether the citation array and superscripts can point back to the original text, and inspect the number of citations and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled); then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use a real record to find a field inconsistent with the ledger, submit it to the reviewer for confirmation, and write it back.

- Turn on the conversation citation superscripts, check the original text fragments and source identifiers item by item against the source documents, and confirm that each citation can point back to the original paragraph.
- Open the search parameter panel, check whether the selected knowledge bases use the same vector model, and verify item by item that the search parameter values are consistent with the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
