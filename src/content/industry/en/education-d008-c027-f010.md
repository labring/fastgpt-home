---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Access
meta_description: Graduate Destinations: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials: employment agreements, graduation destination registration forms, and employer certificates. An employment agreement contains the employer name, position, signing date, and signatures of both parties; a graduation destination registration form contains the destination type, employer name, reporting date, and departmental confirmation; an employer certificate contains the offered position, onboarding time, and employer receipt. When these three types of materials enter authorized access and external services, they respectively play the roles of signing basis, registration criteria, and supporting receipt. Field characteristics center on names, quantities, dates, and signatures, and the update rhythm rolls forward with signing batches, registration milestones, and receipt collection. External services are open to parents or higher authorities, and the visible scope is jointly determined by the visitor's identity and material ownership.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text snippet and source identifier, and the length can be 0. The externally available entry points and authorization scope are subsequently completed by AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the employer name, position, signing date, and signatures of both parties are complete, and whether they are consistent with the registration form criteria | Open the citation marker in the retrieval results, compare it against the original agreement paragraph, and record the fields and dates |
| Graduation destination registration form | Whether the destination type, employer name, reporting date, and departmental confirmation match the agreement | Access once with a restricted identity, check whether the visible scope contains only owned materials, and inspect the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Employer certificate | Whether the offered position, onboarding time, and employer receipt are missing signatures or receipts, and whether versions are synchronized | Trace each item back to the original text, and check whether the source identifier and snippet in `quoteList` are consistent |
| Authorized access entry point | Whether the visitor's identity matches the visible scope, and whether unauthorized access is invisible | Use a restricted identity to test a question with no matching materials, and confirm that the array is empty while the pipeline still runs |

## Three common errors

- Phenomenon: For the same record, the employer name, number of positions, and signing date do not match between the agreement and the registration form. Cause: The two materials are entered separately, the criteria are not aligned, and versions are not synchronized.
- Phenomenon: The employer certificate lacks a signature or receipt, but the registration form has already been marked as confirmed. Cause: Receipt collection and registration milestones are not linked, and material versions are not synchronized.
- Phenomenon: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: This material was not hit in this round, or another material was hit; this should not be directly attributed to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline still runs, and record the number of citations separately.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized access is invisible.

- Open the citation markers, compare each item against the source document, check whether the cited snippet is consistent with the original paragraph, and inspect the source identifier in `quoteList`.
- Run a test with a question that has no matching materials, confirm that the output array is empty while the pipeline continues, and check the citation array length in `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
