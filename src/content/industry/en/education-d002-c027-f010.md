---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Checks
meta_description: Graduate Destinations: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

University employment signing and graduation destination statistics involve three types of materials: employment agreements, graduation destination registration forms, and employer certificates. An employment agreement is signed by the graduate and the employer, and contains the position, reporting date, and signatures of both parties; a graduation destination registration form is compiled by the department, and contains the destination category, employer name, and unified social credit code; an employer certificate is issued by the hiring employer, and contains the acceptance letter number, seal, and receipt. The three types of materials enter the verification process in batches, each with a different role: the agreement serves as the factual basis for signing, the registration form serves as the working draft for statistical reporting, and the employer certificate serves as supporting evidence of hiring. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. In different materials, the same record often has abbreviated and full names coexisting, inconsistent date formats, and missing signature fields. The pace of material updates advances with signing batches; when versions are not synchronized, old and new forms exist at the same time, requiring field-by-field comparison and discrepancy localization.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The discrepancy list must then be handled by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the name, quantity, date, and signature are consistent with the registration form | Open the citation marker to trace back to the original agreement text, verify the position name, signing date, and signature fields of both parties, and record inconsistent fields |
| Graduation destination registration form | Whether the employer name and destination category of the same record are consistent with the agreement and employer certificate | Compare against the original paragraph of the registration form, check item by item the employer's full name, unified social credit code, and destination category, and mark discrepancies |
| Employer certificate | Whether the acceptance letter number, seal, and receipt are complete and the dates can correspond | Check the certificate number and signing date in the cited snippet, confirm whether the seal and receipt are missing, and write them into the discrepancy list |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, observe that the array length is 0 while the flow continues; record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled); the citation text budget is controlled by `quoteMaxToken`, and the two are not compared for equality |

## Three common errors

- Symptom: For the same record, abbreviated and full employer names coexist in the agreement and registration form, and the quantity and date do not match. Cause: Field conventions were not unified during entry, and the original text was not traced back for verification.
- Symptom: An old version of the registration form and a new form exist at the same time, and the cited snippet points to the old version. Cause: Versions were not synchronized, and multiple versions of materials coexist in the knowledge base without indicating the effective batch.
- Symptom: The employer certificate lacks a seal or receipt, and the cited snippet contains only the body text. Cause: The scanned material is incomplete, or the signature page was not stored together with the body text.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the flow completes.

Business test: use a real record to find fields inconsistent with the ledger, record the discrepancies, and hand them to the reviewer for confirmation and write-back.

- In the conversation, open the citation markers, check item by item whether the cited snippets are consistent with the original paragraphs against the source documents, and inspect the source identifier in `quoteList`.
- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and separately record the number of citation array items and the citation text budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
