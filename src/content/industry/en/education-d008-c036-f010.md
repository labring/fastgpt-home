---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Access
meta_description: Professional Exams: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Manage Authorized Access and External Services

## What this category's data looks like

For the review of professional and technical personnel vocational qualification examination registration, the materials mainly consist of registration forms, education certificates, and work experience certificates, and also include unit-stamped documents and receipts. The registration form contains the name, ID number, examination level, major, work unit, registration serial number, and personal signature; the education certificate contains the institution, major, study start and end dates, certificate number, and issue date; the work experience certificate contains the position, start and end dates, cumulative years, handler signature, and unit stamp. When these three types of materials enter the knowledge base retrieval node, they respectively serve as retrievable original text sources. After a hit, they are returned as citation snippets and source identifiers for subsequent comparison of field, date, and signature consistency, and based on this, the external entry points and authorization scope are defined. The update rhythm advances with registration batches and review nodes, and the version is based on the latest stamped document.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text snippet and a source identifier, and the length can be 0. The external entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, ID number, examination level, registration serial number, and signature are complete, and the date is consistent with the batch | In the citation superscript, refer back to the original registration form, and check the source identifier and snippet of that citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Education certificate | Institution, major, study start and end dates, certificate number, and issue date are consistent with those filled in the registration form | Compare the citation snippet with the original text, compare dates and numbers field by field, and record inconsistencies |
| Work experience certificate | Position, start and end dates, cumulative years, handler signature, and unit stamp are complete | Check the cited original text paragraph in `quoteList`, and confirm that the signature and receipt are not missing |
| Associated knowledge base | The selected knowledge base is one with the same vector model, and the number of citations matches the hit materials | In the node, check the selected collection and vector model, record the array length, and check `quoteMaxToken` separately as the content budget |

## Three common errors

- Symptom: The name, number, or date of the same record does not match between the registration form and the education certificate. Cause: The two materials were entered separately, and no cross-material field comparison was performed.
- Symptom: The work experience certificate is missing the handler signature or the unit receipt. Cause: The version was not synchronized, and an old stamped document was retrieved as a hit.
- Symptom: There is an answer but the citation array is empty, and there is no citation superscript in the answer. Cause: No material was hit in this round; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline runs through.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting

- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and record the array length.
- Open the citation superscripts against the source documents, check whether each citation can refer back to the original text paragraph, and check the search parameter values.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
