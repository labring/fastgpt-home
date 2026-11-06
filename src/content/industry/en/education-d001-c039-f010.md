---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Find Supporting Evidence
slug: /en/industry/education-d001-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Evidence
meta_description: Exam Administration: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Find Supporting Evidence

## What this category's data looks like

This category covers exam organization and violation handling; materials include exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual specifies the organizational process and handling criteria, the examination room record sheet records the on-site time, invigilator signature, and abnormal situations, and the violation fact record carries candidate information, behavior description, evidence, and receipt. The material sources are educational examination institutions and school examination administration departments, and updates advance with exam batches, annual revisions, and supplementary notices. Field characteristics center on names, quantities, dates, signatures, and version numbers: the same candidate name or subject name may be written differently across materials, violation quantities and dates may not match, old manual versions may not have been replaced in sync, and record sheets may lack invigilator signatures or receipts. When materials enter this feature, the exam administration manual provides the basis clauses, while the examination room record sheet and violation fact record provide the factual fields; together the three support the correspondence between basis entries and the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still completes. "Basis entries that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, or generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | The basis comes from the institution’s materials and the version is current, and the entries can be matched to the original text | In the node, check the selected knowledge bases and their vector models, open the search parameter panel and check item by item; the cited fragment points back to the manual chapter, and record the number of citations and the `quoteMaxToken` budget |
| Examination room record sheet | The fields include name, quantity, date, and invigilator signature, and the entries can be matched to the original text | Check the citation superscripts against the source document, verify whether the name, quantity, and date of the same record are consistent with the manual, and check whether the signature and receipt are complete |
| Violation fact record | The fields include candidate information, behavior description, evidence, and receipt, and the entries can be matched to the original text | Open the citation superscripts to trace back to the original paragraph, verify whether the name, quantity, and date match the examination room record sheet, and confirm that the version has been synchronized |
| Cited content output | The number of returned entries is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; record the number of citations separately by array length, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the exam administration manual and the examination room record sheet. Cause: the two materials were filled in separately, and no field comparison was performed.
- Symptom: the cited fragment does not match the original text, and the superscript points to another version. Cause: the old manual version in the knowledge base has not been replaced in sync, and the version has not been synchronized.
- Symptom: the violation fact record lacks an invigilator signature or receipt, but the basis entry is still cited. Cause: the completeness of signatures and receipts was not checked before the materials were ingested.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain completes; at the same time, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- In the node, check the selected knowledge bases and their vector models, open the search parameter panel, and check the values item by item.
- Open the citation superscripts against the source document, check the name, quantity, date, signature, and receipt of the same record, and confirm that the version is current.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
