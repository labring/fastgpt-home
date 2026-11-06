---
title: Citations and Source Traceability for School Teacher Training Credits: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Access
meta_description: Teacher Credits: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on three types of materials in the credit management of primary and secondary school teacher training: training notices, credit recognition forms, and participant lists. Training notices provide the training name, start and end dates, and organizer, and are the primary basis for determining the visible scope during authorized access; credit recognition forms carry teacher names, subjects, credit hours, and recognition conclusions, and are the core for verifying fields and signatures during traceability; participant lists record participants, units, and sign-in receipts, and often show inconsistencies with recognition forms in names, quantities, and dates. The materials come from training organizers, school administrators, and higher-level competent departments, are updated by batch and semester, and versions need to be synchronized with signatures or receipts retained. After the three types of materials enter knowledge base retrieval, each participates in output as a citation source: notices are used to confirm training sessions and times, recognition forms are used to verify credit fields, and lists are used to compare personnel and quantities. During external services, the citation snippets and source identifiers seen by parents or higher-level authorities must match the visitor's identity and visible scope, and unauthorized content must not be visible.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text snippet and source identifier, and the length can be 0. The externally accessible entry points and authorization scope are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the training name, start and end dates, and organizer are consistent between the notice and the recognition form, and whether signatures or receipts are complete | Open the original notice, compare it against the recognition form and list, and verify fields, dates, and signatures item by item; access once with a restricted identity to confirm that the visible scope matches the identity |
| Credit recognition form | Whether the teacher name, subject, credit hours, and recognition conclusion match in names, quantities, and dates across the two materials, and whether versions are synchronized | Open the citation marker to point back to the original paragraph, verify the citation snippet and source document in `responseData` (non-streaming module results returned with detailed output enabled), and record the number of array entries |
| Participant list | Whether participants, units, and sign-in receipts are consistent with the recognition form, and whether missing signatures or receipts are marked | Run a test with a question that has no matching materials, see that the citation array is empty while the chain continues, and record in `quoteList` that the output is empty |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal; `quoteMaxToken` is only a content budget and is not compared for equality with the number of array entries | Open the citation marker in the conversation and point back item by item against the source document; open the search parameter panel and verify the values |

## Three common errors

- Phenomenon: The same teacher's name or credit hour quantity does not match between the recognition form and the participant list. Cause: The two materials are filled in by different stages, and field-level comparison and version synchronization were not performed.
- Phenomenon: The start and end dates of the training notice are inconsistent with the dates recorded in the recognition form, and the citation snippet cannot point back to the same session. Cause: After the notice was updated, the recognition form was not synchronized, and the unsynchronized version caused traceability misalignment.
- Phenomenon: The participant list lacks signatures or receipts, and the citation source is incomplete during external services. Cause: Signatures and receipts were not verified when the materials were archived, and although the citation array has entries, the original basis is insufficient.

## How to verify the setup

Open the citation markers and compare them item by item against the source documents, verify the original text snippets and source identifiers, and record the number of array entries and the value of `quoteMaxToken`.

Access once with a restricted identity, verify whether the visitor's identity matches the visible scope, and confirm that unauthorized content is not visible.

- This function's acceptance: ask a question with an original text basis, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, the number of citation entries in `responseData` is the array length, and `quoteMaxToken` is recorded separately.
- Business test: access once with a restricted identity, see whether the visible scope matches the setting, and unauthorized content is not visible.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
