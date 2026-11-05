---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Versions
meta_description: Skills Competitions: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Maintain Document Versions and Changes

## What this category's data looks like

This category's data revolves around three types of materials: competition regulations, registration forms, and training plans. Competition regulations contain the event name, group, time and location, scoring criteria, and signature/seal fields; registration forms contain the names of contestants and instructors, ID numbers, group, contact information, and signatures; training plans contain phase dates, training content, instructor signatures, and acknowledgments. The same record often shows mismatched names, quantities, or dates across the two materials, with versions not synchronized and missing signatures or acknowledgments. When materials enter the knowledge base retrieval node, the regulations serve as the basis for judgment, the registration form serves as the source for verifying personnel and groups, and the training plan serves as the source for verifying process and dates; together, the three support citation traceability and change tracking. The update rhythm follows the competition cycle, with concentrated revisions before the competition and archiving of old versions after the competition.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text snippet and a source identifier, and the length can be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether fields, dates, and signatures are consistent with the current version | Check the event name, group, time and location, scoring criteria, and signature/seal fields, confirm that the current version is unique and that old versions are traceable |
| Registration form | Whether the names, quantities, and dates of the same record match between the regulations and the registration form | Compare the names of contestants and instructors, ID numbers, group, and contact information, and check whether signatures or acknowledgments are complete |
| Training plan | Whether phase dates, training content, and instructor signatures are synchronized | Compare against the time nodes in the regulations, check the training phase dates and signature fields, and confirm that citations are synchronized |
| Knowledge base retrieval node | Citation content is output as an array, and the length can be 0 | View the citation array and `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled), verify that `quoteMaxToken` is the citation content budget, and record the number of array entries separately |

## Three common errors

- Symptom: The same contestant's name is written differently in the regulations and the registration form, and the group or quantity does not match. Cause: The two materials are maintained separately, without field comparison and version synchronization.
- Symptom: The training plan dates are inconsistent with the time nodes in the regulations, and the old version is still cited. Cause: Versions are not synchronized, the current version is not unique, and the old version is not marked as archived.
- Symptom: The registration form lacks signatures or acknowledgments, and the training plan lacks instructor signatures. Cause: The material circulation process does not collect signed documents, and the citation source cannot point back to the complete original text.

## How to verify the setup

Acceptance of this feature: ask a question with an original text basis, and check whether the citation array and footnote markers can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Open the search parameter panel and check item by item whether the associated knowledge bases use the same vector model, and verify that the `quoteMaxToken` value is consistent with the knowledge base retrieval section.
- Open the citation footnote markers in the conversation, compare against the source documents, and verify whether the citation snippets in `quoteList` within `responseData` can point back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
