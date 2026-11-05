---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Handover
meta_description: Graduation Eligibility: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Student status changes and graduation eligibility review material drafting and responsibility handover involve three types of materials: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. A leave-of-absence/resumption-of-study application includes the change type, effective term, course articulation statement, and signature field; a major transfer application includes the names of the transfer-in and transfer-out majors, assessment conclusion, credit recognition, and date; a graduation review checklist includes course names, credit amounts, grade dates, and review conclusion. The materials come from academic affairs system exports, departmental submissions, and historical archives, and the update cadence follows each term's change window and graduation review batch. When entering the knowledge base retrieval node, the three types of materials each serve as cited source documents, providing the original-text basis for field comparison and responsibility handover, and do not directly generate drafts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text snippet and a source identifier, and the length may be 0. The "issuable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption-of-study application | Whether the change type, effective term, course articulation statement, and signature field are complete, and whether the dates are consistent with the same-named record in the major transfer application | Open the citation marker to trace back to the original-text paragraph, and check the cited snippet and source document in `responseData` (non-streaming module results returned with detailed output enabled); record the array length separately, and do not compare it for equality with `quoteMaxToken` |
| Major transfer application | Whether the transfer-in and transfer-out major names, assessment conclusion, credit recognition, date, and signature are complete, and whether the number of course names matches that in the graduation review checklist | Compare the cited snippet with the original text item by item, and check the source identifier in `quoteList`; when versions are not synchronized, take the latest archived document as authoritative |
| Graduation review checklist | Whether the course names, credit amounts, grade dates, review conclusion, and receipt are complete, and whether they conflict with the effective term in the leave-of-absence/resumption-of-study application | Run a test query with no matching materials, and see whether the citation array is empty while the chain still runs through |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the leave-of-absence/resumption-of-study application and the major transfer application. Cause: The two materials each cite different version sources, and the hit materials were not checked before comparing fields.
- Symptom: The graduation review checklist has been updated, but the major transfer application still cites the old version. Cause: Versions are not synchronized, and the original-text paragraph traced back to by the cited snippet is inconsistent with the current archived document.
- Symptom: The material draft has complete fields but lacks a signature or receipt. Cause: The handover record did not list the signature field and receipt as mandatory check items, and the responsible person is only discovered at the next step.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, check whether the cited content array and citation markers can trace back to the original-text paragraph, and confirm that every citation can be traced back; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length separately, without comparing it for equality with `quoteMaxToken`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
