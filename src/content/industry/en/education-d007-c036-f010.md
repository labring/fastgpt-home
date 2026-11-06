---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Review
meta_description: Professional Exams: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Trace Exceptions and Review Results

## What this category's data looks like

For professional and technical personnel vocational qualification examination registration review, materials usually include three types: registration form, education certificate, and work experience certificate. The registration form contains name, ID number, examination specialty, unit opinion, and signature; the education certificate contains graduating institution, specialty, certificate number, and date of issuance; the work experience certificate contains start and end dates, position, unit seal, and handler signature. The three types of materials enter the knowledge base by batch. Registration forms and education certificates are often archived by candidate, while work experience certificates are mostly uploaded by unit batch, with an update cadence synchronized with the registration cycle. After entering the knowledge base retrieval node, each of the three types of materials serves as a retrievable source: the registration form is used to verify identity and registration information, the education certificate is used to verify specialty and graduation time, and the work experience certificate is used to verify years of practice and start and end dates. When citations are output, each fragment points back to the corresponding material paragraph.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The "exception list and review conclusion" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Fields, dates, and signature must correspond item by item with the education certificate and work experience certificate | Verify name, ID number, examination specialty, unit opinion, and signature; compare whether the date of issuance is consistent; check whether the cited fragment in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original paragraph of the registration form |
| Education certificate | Graduating institution, specialty, certificate number, and date of issuance must be consistent with the registration form | Verify the specialty name and graduation time; check whether the certificate number is missing; confirm that the cited fragment matches the original text; record the array length and the `quoteMaxToken` budget |
| Work experience certificate | Start and end dates, position, unit seal, and handler signature must be complete and consistent with the registration form | Verify the start and end dates and position name; check whether the seal and signature are missing; check whether the source identifier in `quoteList` can locate the certificate paragraph |
| Exception list and review conclusion | Exceptions are supported by original records, and the reviewer signs | Create an exception record, trace back from the citation array to the source material, confirm that the number of citations matches the hit material; empty is also considered normal |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and education certificate, and the quantity or date does not match. Cause: The two materials were filled in by different handlers, and field comparison was not performed before entering retrieval.
- Phenomenon: The start and end dates on the work experience certificate are inconsistent with the years filled in on the registration form, and the versions are not synchronized. Cause: After the unit batch update, the old version of the certificate remains in the knowledge base, and retrieval hits the old fragment.
- Phenomenon: The registration form lacks the unit opinion signature or the work experience certificate lacks the seal receipt, so the review conclusion cannot be signed. Cause: The signature and receipt fields were not validated when the materials were uploaded, and the cited fragments cannot support the conclusion.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget; do not compare the two for equality.

Business test: create an exception record, see whether it can be traced to the source material, confirm that the exception is supported by original records, and after the reviewer signs, hand it to the responsible person for handling.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, open the search parameter panel, and verify the values item by item.
- Run a trial with a query that has no matching material, see that the output is empty while the pipeline continues, and open the citation footnote markers in the conversation to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
