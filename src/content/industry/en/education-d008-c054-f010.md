---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Access
meta_description: Self-Study Exams: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services

## What this category's data looks like

In the self-taught examination registration records and graduation review business, the materials are mainly registration records, course qualification certificates, and graduation application forms. Registration records record the candidate's basic information, examination registration number, major name, and course scores; course qualification certificates indicate the course code, qualification date, and the seal of the examining institution; graduation application forms carry the candidate's signature, the unit's opinion, and the review receipt. When these three types of materials enter the authorized access and external service function, they each assume the roles of identity anchor, course credential, and process credential. The material sources are exports from the provincial examination office system, archives of the examining institution, and scanned originals submitted by candidates. The update rhythm advances with examination periods and graduation review batches, and the field characteristics are concentrated in name, ID number, course name, quantity, date, and signature fields. When external services are opened to parents or superiors, the visible scope must match the visitor's identity, and unauthorized content must not be visible.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "externally available entry points and authorization scope" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The fields of name, examination registration number, major name, and course scores must match the course qualification certificates item by item; the date and signature fields are complete | Retrieve the registration records and course qualification certificates, compare the name, quantity, and date of the same record, and check the seal and receipt |
| Course qualification certificates | The course code, qualification date, and seal must correspond to the course list in the graduation application form; the version must be synchronized | Open the course qualification certificates and graduation application form, check the course name, quantity, date, and signature item by item, and mark missing items |
| Graduation application form | The candidate's signature, unit's opinion, and review receipt must be complete; it must be consistent with the graduation conclusion date in the registration records | Check the signature and receipt of the graduation application form, compare with the graduation conclusion date in the registration records, and record inconsistencies |
| Authorization scope output | The visitor's identity matches the visible scope, and unauthorized content is not visible; the citation array length can be 0 | Access once with a restricted identity, check the number of citations and visible fields in `responseData` (non-streaming module results returned with detailed output enabled), and inspect `quoteList` and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The course name, quantity, or date for the same candidate does not match between the registration records and the course qualification certificates. Cause: The two sets of materials are entered in different stages, and field-level comparison and version synchronization have not been done.
- Symptom: The graduation application form lacks the candidate's signature or the unit's receipt, but the review still continues. Cause: When materials are circulated, the completeness of the signature field and receipt is not verified, and missing items are not intercepted.
- Symptom: In external services, a restricted identity sees unauthorized content. Cause: The visible scope is not matched item by item according to the visitor's identity, and the authorization boundary is not bound to material fields.

## How to verify the setup

This function's acceptance: ask a question with source evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting, with unauthorized content not visible.

- Turn on citation superscripts, compare against the source documents, check whether each citation can point back to the original paragraph, and record the number of citations in `quoteList` within `responseData`.
- Try running with a question that has no matching materials, see that the output is empty while the pipeline continues, and separately record the array length and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
