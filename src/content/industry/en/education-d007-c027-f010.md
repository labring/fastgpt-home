---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Review
meta_description: Graduate Destinations: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results

## What this category's data looks like

This category's data covers three types of materials: employment agreements, graduation destination registration forms, and employer certificates. An employment agreement contains the employer name, position, signing date, signatures of both parties, and school verification; a graduation destination registration form contains the destination category, employer name, reporting date, student signature, and department confirmation; an employer certificate contains an acceptance letter or receipt, employer seal, and date. The three types of materials are often updated in batches, field names and date formats are not standardized, the name, quantity, and date of the same record may not match across two materials, versions may not be synchronized, and signatures or receipts may be missing. After the materials enter knowledge base retrieval, they serve as citation sources for exception tracing and manual review to compare fields, write ledgers, and generate reports, and the cited snippets are used to refer back to the source materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The exception list and review conclusions are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the employer name, position, signing date, signatures of both parties, and school verification are complete and consistent with the registration form | Locate the original text of the agreement in the cited snippet, check the source identifier and paragraph position of that citation in `responseData` (non-streaming module results returned with detailed output enabled), and compare the date and signatures field by field |
| Graduation destination registration form | Whether the destination category, employer name, reporting date, student signature, and department confirmation are consistent with the employment agreement | Open the citation marker to refer back to the original text of the registration form, check whether the name, quantity, and date match, and check whether the versions are synchronized |
| Employer certificate | Whether the acceptance letter or receipt, employer seal, and date are complete and consistent with the other two materials | Locate the original text of the certificate in the cited content array, check the seal and receipt, and record it in the exception list when a signature or receipt is missing |
| Cited content array | The number of items is consistent with the matched materials; being empty is also normal, and `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials and see whether the array is empty while the pipeline still runs through; when there is a match, check whether `quoteList` corresponds to the original text |

## Three common errors

- Symptom: the employer name, quantity, and date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: the two places use different reporting standards or no cross-check was performed during entry, so it is necessary to refer back to both original texts and compare field by field.
- Symptom: the employer certificate version is not synchronized, and an old receipt is still cited. Cause: after the material was updated, the knowledge base document was not replaced, so the cited snippet points to the old version, and it is necessary to check the source identifier and document version.
- Symptom: the material is missing a signature or receipt, and the exception record cannot be closed. Cause: a signature was missed in the circulation step or the receipt was not archived, and there is no signature field in the cited snippet, so manual review and correction are required.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, check whether the cited content array and citation markers can refer back to the original paragraph, and record the number of array items and the `quoteMaxToken` budget; the two are not compared for equality.

Acceptance for this feature: ask another question with no matching materials, and confirm that the cited content array is empty while the output pipeline still runs through; an empty array is a normal output and does not mean retrieval failed.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, then run a test with a question that has no matching materials to confirm that the array is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
