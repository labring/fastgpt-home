---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Access
meta_description: Training Admissions: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services

## What this category's data looks like

In the enrollment consultation conversion scenario for training institutions, there are mainly three types of materials that enter the authorized access and external services function. Enrollment brochures: contain course names, class hours, start dates, fee items, and signatures/seals, and are the baseline materials for the scope visible to parents; consultation records: contain consultation dates, receptionists, intention levels, and receipt signatures, and are used to determine visitor identity and visible scope; trial class schedules: contain trial class times, instructors, classrooms, and confirmation signatures, and are used for schedule synchronization after the external entry point is opened. The three types of materials play different roles in the function: enrollment brochures and trial class schedules constitute externally visible content, while consultation records constitute restricted visible content. In terms of update cadence, brochures are updated by class term, consultation records are updated daily, and trial class schedules are updated weekly. In terms of field characteristics, the four types of fields—names, quantities, dates, and signatures—are most prone to inconsistency between two materials. When versions are not synchronized or receipts are missing, the visible scope of the external entry point will not match the settings.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The externally available entry point and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course names, class hours, start dates, fee items, and signatures/seals are consistent with the consultation records | Compare the brochure and consultation records field by field, and check whether signatures/seals and receipts are complete; in the node, verify the selected knowledge base and vector model, and view the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Consultation record | Whether the consultation dates, receptionists, intention levels, and receipt signatures are consistent with the trial class schedules | Compare dates and signatures one by one, and check whether versions are synchronized; run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues |
| Trial class schedule | Whether the trial class times, instructors, classrooms, and confirmation signatures are consistent with the brochure class terms | Open the search parameter panel and check the values item by item, and open the citation markers in the conversation to trace back to the original text; record the number of array items, and separately check the `quoteMaxToken` budget |
| Citation content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Open the citation markers in the conversation and compare them with the source documents; check whether each citation in `quoteList` can be traced back to the original paragraph |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same consultation record do not match between the brochure and the trial class schedule. Cause: The two materials are updated separately, without field comparison and version synchronization.
- Phenomenon: The visible scope of the external entry point does not match the settings, and restricted identities can see materials beyond the scope. Cause: The authorization scope is not synchronized with the material versions, and receipts or signatures are missing.
- Phenomenon: There are no citation markers in the answer, or the cited snippets do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance for this function: ask a question with original-text support, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: access once with a restricted identity, and see whether the visible scope matches the settings.

- In the node, verify the selected knowledge base collections and their vector models, and view the number of items and source identifiers in the citation array in `responseData`.
- Open the search parameter panel and check the values item by item, record the number of array items, and separately check the `quoteMaxToken` budget; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
