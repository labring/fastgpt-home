---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Handover
meta_description: Professional Exams: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The material drafting and responsibility handover for the registration review of professional and technical personnel vocational qualification examinations involves three core types of materials: the registration form, the academic qualification certificate, and the work experience certificate. The registration form carries basic personal information and the examination subjects applied for; the academic qualification certificate corresponds to the graduating institution, major, and certificate number; and the work experience certificate records the start and end of employment and the position. When the materials enter the knowledge base retrieval node, each participates in retrieval as a citable original text fragment, to be used for subsequent field comparison, ledger writing, and report generation. The field characteristics are concentrated in names, quantities, dates, and signatures: for the same record, the unit name and the start and end dates of employment in the registration form and the work experience certificate must be consistent; the certificate number in the academic qualification certificate must correspond to what is filled in the registration form. In terms of update rhythm, the registration form is adjusted with each batch, while the academic qualification certificate and the work experience certificate are updated as individual materials are supplemented and corrected. Versions and dates must be synchronized, and signatures and receipts must be complete; otherwise, the handover step cannot be signed for.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "issuable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Fields are complete; names, quantities, dates, and signatures correspond to the academic qualification certificate and the work experience certificate | Check whether the unit name and the start and end dates of employment filled in the registration form are consistent with the work experience certificate, check whether signatures and receipts are complete, and record the number of citations and the `quoteMaxToken` budget |
| Academic qualification certificate | The certificate number, graduating institution, and major correspond to what is filled in the registration form, and the dates are consistent | Open the citation marker to point back to the original paragraph, compare the certificate number with the fields in the registration form, confirm that the version and date are synchronized, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Work experience certificate | The start and end dates of employment and the position do not conflict with the registration form and the academic qualification certificate, and signatures and receipts are complete | Compare the unit name and start and end dates item by item with the registration form records, check for missing signatures or receipts, and record field differences and version numbers in `quoteList` |
| Handover record | The responsible person is clear, the version and date are consistent, and the next step can sign for receipt | Draft one according to the template and complete one handover, see whether missing items are blocked, and check whether the signer and date are filled in |

## Three common errors

- Phenomenon: For the same record, the unit name and the start and end dates of employment in the registration form and the work experience certificate do not match. Cause: The two materials were not compared during drafting, and the field sources were not synchronized.
- Phenomenon: The certificate number in the academic qualification certificate is inconsistent with what is filled in the registration form, and the version is not synchronized. Cause: After the materials were updated, the cited original text was not rechecked, and the old version fields were reused.
- Phenomenon: The work experience certificate lacks a signature or receipt, and the handover step cannot be signed for. Cause: The signature field and receipt field were not checked during drafting, and missing items were not blocked.

## How to verify the setup

Acceptance of this function: ask a question with an original text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
