---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence
slug: /en/industry/education-d001-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Evidence
meta_description: Graduate Destinations: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in university employment signing and graduation destination statistics. The materials include three types: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing entity, position, and signing date; the graduation destination registration form carries the destination category, employer name, and registration date; the employer certificate carries the hiring intention, position, and stamped receipt. The three types of materials are updated by academic year and batch. The same record may have inconsistent names, quantities, and dates across different materials, with versions not synchronized or signed receipts missing. After the materials enter the knowledge base retrieval node, each serves as a citable original source, providing traceable provenance for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "basis entries traceable to the original text" are completed subsequently by AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Fields include signing entity, position, signing date, and signature, and must match the name, quantity, and date of the same record in the registration form | Open the citation marker to compare against the original agreement text, verify whether the signature and signing date are complete, and record the number of citations |
| Graduation destination registration form | Fields include destination category, employer name, registration date, and receipt, and must be version-synchronized with the employment agreement and employer certificate | Check the original registration form against the other two materials, verify whether the employer name and date are consistent, and record the array length separately |
| Employer certificate | Fields include hiring intention, position, stamp, and receipt date, and must match the position in the employment agreement and the destination in the registration form | Compare the original certificate against the agreement and registration form, verify whether the stamp and receipt are missing, and check the source identifier in `quoteList` |
| Knowledge base retrieval node | Cited content is output as an array, the length can be 0, and the chain still runs even if no content is found | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The employer name, position quantity, and date of the same record do not match between the agreement and the registration form. Cause: The two materials have different reporting standards and update batches, and no field-level comparison was performed.
- Symptom: The employer certificate and the registration form are not version-synchronized, and the old version is still cited. Cause: After the material was updated, it was not re-ingested, the citation points to a historical version, and the source identifier was not refreshed with the version.
- Symptom: The agreement lacks a signature or the certificate lacks a stamped receipt, yet the cited snippet is still treated as a basis. Cause: The scanned material is incomplete, and the retrieved matching snippet does not cover the signature and receipt areas.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs, and record the array item count and the `quoteMaxToken` budget values separately.

Business test: ask a cross-material basis question, see whether the answer provides traceable provenance, and check whether each citation corresponds to an original paragraph in the employment agreement, graduation destination registration form, or employer certificate.

- Open the citation markers and compare them one by one against the source documents, verify whether the cited snippets are consistent with the original paragraphs, and record the array length.
- In the node, check whether the selected knowledge bases use the same vector model, and open the search parameter panel to verify the values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
