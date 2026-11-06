---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Access
meta_description: Graduation Eligibility: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the category of student status changes and graduation qualification review, covering three types of materials: leave-of-absence/resumption applications, major transfer applications, and graduation review checklists. A leave-of-absence/resumption application carries the reason for the status change, start and end dates, and approval signatures; a major transfer application records the original major, target major, assessment conclusion, and receiving opinion; a graduation review checklist aggregates course names, credit amounts, grade dates, and departmental signatures. When these three types of materials enter the authorized access and external services function, they respectively serve as the retrieval hit source, the basis for field comparison, and the working draft for determining the externally visible scope. Materials are updated by semester batch, and upon completion of approval, receipts and signatures are archived in sync. In terms of field characteristics, the names, quantities, and dates of the same record across different materials often require cross-checking, and the version is based on the archived batch. When external services are opened to parents or higher-level authorities, the visible scope is jointly determined by the visitor's identity and the material's ownership, and unauthorized content is not visible.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The "externally accessible entry points and authorization scope" are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption application | Whether the reason for the status change, start and end dates, and approval signatures are complete, and whether the same record's name and dates are consistent across the two materials | Open the citation marker to point back to the original paragraph, check the signatures and receipts, and record the source identifier in `quoteList` |
| Major transfer application | Whether the fields of original major, target major, assessment conclusion, and receiving opinion are aligned, and whether the version is in sync | Compare the fields item by item against the archived batch, confirm there are no missing signatures or receipts, and check the number of entries in the citation array of `responseData` (non-streaming module results returned with detailed output enabled) |
| Graduation review checklist | Whether the course names, credit amounts, grade dates, and departmental signatures match the application materials | Access once with a restricted identity, see whether the visible scope matches the setting, and check that `quoteMaxToken` is the citation content budget |
| Associated knowledge base | Whether the selected knowledge bases are those of the same vector model | In the node, check the selected collections and their vector models |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the leave-of-absence/resumption application and the graduation review checklist. Cause: The two materials are entered separately, without cross-comparison and unification.
- Symptom: The version of the major transfer application is not in sync, and the conclusion of an old batch still appears at the external entry point. Cause: After the archived batch is updated, the citation source is not refreshed, and retrieval hits the old material.
- Symptom: The graduation review checklist lacks a signature or receipt, yet it is still retrieved and output as a citation. Cause: The signature and receipt are not archived together with the material, and the hit determination does not cover completeness.

## How to verify the setup

This function's acceptance: ask a question that has an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; when the citation upper limit is involved, check the tokens of the cited text, and record the array entry count separately.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and unauthorized content is not visible.

- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.
- In the conversation, open the citation markers, compare against the source documents, and check whether the cited fragments correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
