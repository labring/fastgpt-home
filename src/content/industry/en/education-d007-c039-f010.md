---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Review
meta_description: Exam Administration: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Trace Exceptions and Review Results

## What this category's data looks like

In exam organization and violation handling scenarios, the materials that enter the exception tracing and manual review stage mainly include exam manuals, examination room records, and violation fact records. The exam manual provides the process and judgment criteria, the examination room record carries the on-site time, seating, and invigilator signature, and the violation fact record carries the behavior description, evidence list, and receipt. The three types of materials are updated by session, and the same session may produce multiple versions due to supplementary entry or correction. Field characteristics are concentrated in four categories: name, quantity, date, and signature: the same candidate name may appear with simplified/traditional or homophone differences across different materials, the number of violation entries may be inconsistent between the record sheet and the fact record, dates may show start-end deviations due to cross-day exams, and signature fields may be missing or receipts not collected. After these materials enter the knowledge base retrieval node, each is cited in the form of an original text fragment, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The "exception list and review conclusion" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam manual | Whether the name, date, and signature fields are consistent with the examination room record, and whether the versions are synchronized | In the node, check the selected collections and their vector models, open the search parameter panel and check `quoteMaxToken` item by item, then open the citation markers to compare against the source documents |
| Examination room record | Whether the name, quantity, and date of the same record match the violation fact record, and whether signatures and receipts are complete | Run a test with a question that has no matching materials, see whether the citation array is empty while the chain continues, and record the number of returned entries |
| Violation fact record | Whether the behavior description, evidence list, and receipt correspond to the fields of the examination room record, and whether the versions are synchronized | In the conversation, open the citation markers, compare against the source documents, check whether each citation can point back to the original paragraph, and view `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |
| Exception list and review conclusion | Whether the exception is supported by original records, and whether the reviewer's signature is complete | Create an exception record, see whether it can be traced back to the source material, and check that the number of citations and `quoteMaxToken` are not compared for equality |

## Three common errors

- Phenomenon: the same candidate name is written differently in the examination room record and the violation fact record. Cause: simplified/traditional or homophone substitution during entry, not unified according to the field criteria of the exam manual.
- Phenomenon: the number of violation entries does not match between the two materials. Cause: versions were not synchronized after supplementary entry or correction, and the old version is still being cited.
- Phenomenon: signature fields are missing or receipts are not collected. Cause: the on-site process was not closed-loop, and signature and receipt fields were not validated when the materials entered the knowledge base.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, check whether the citation array and markers can point back to the original text, and view `quoteList` in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: create an exception record, see whether it can be traced back to the source material, and check that the number of citations and `quoteMaxToken` are not compared for equality.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check `quoteMaxToken` item by item.
- In the conversation, open the citation markers, compare against the source documents, check whether each citation can point back to the original paragraph, and record the number of citations.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
