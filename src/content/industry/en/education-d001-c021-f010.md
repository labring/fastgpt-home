---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence
slug: /en/industry/education-d001-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Evidence
meta_description: Graduation Eligibility: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence

## What this category's data looks like

Student status changes and graduation qualification review involve three types of materials: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. Leave-of-absence/resumption-of-study applications record changes in student status and contain application fields, dates, and signatures; major transfer applications record major adjustments and contain the original major, target major, dates, and signatures; graduation review checklists list courses, credits, and graduation requirements and contain review fields, dates, and signatures. The update cadence of the materials varies with semesters and approval milestones, and versions need to be kept in sync. When entering the knowledge base retrieval node, the three types of materials are vector-searched as documents in the associated knowledge base, each providing original text snippets and source identifiers, which are used to refer back to the basis entries in the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Referring back to the basis entries in the original text is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption-of-study application | Fields, dates, and signatures need to match those in the major transfer application and graduation review checklist | Check the student ID, name, dates, and signature in the leave-of-absence/resumption-of-study application, and compare them item by item with the major transfer application and graduation review checklist |
| Major transfer application | Fields, dates, and signatures need to match those in the leave-of-absence/resumption-of-study application and graduation review checklist | Check the original major, target major, dates, and signature in the major transfer application, and compare them item by item with the leave-of-absence/resumption-of-study application and graduation review checklist |
| Graduation review checklist | Fields, dates, and signatures need to match those in the leave-of-absence/resumption-of-study application and major transfer application | Check the courses, credits, review date, and signature in the graduation review checklist, and compare them item by item with the leave-of-absence/resumption-of-study application and major transfer application |
| Cited content array | The number of returned items is consistent with the materials hit, and being empty is also normal | Run a trial with a question that has no matching materials, and see whether the output is empty while the pipeline continues; check the citation text budget of `responseData` (non-streaming module results returned with detailed output enabled), `quoteList`, and `quoteMaxToken` |

## Three common errors

- Symptom: The name or date for the same student ID does not match across two materials. Cause: The leave-of-absence/resumption-of-study application and the major transfer application are each entered separately, without cross-material field comparison.
- Symptom: The version of the graduation review checklist is not synced, and it still cites the old courses and credits. Cause: After the materials were updated, they were not re-entered into the associated knowledge base, so the version was not synced.
- Symptom: The leave-of-absence/resumption-of-study application lacks a signature or receipt, and the cited snippet cannot refer back to the complete original text. Cause: The scanned copy omits the signature page, or the receipt was not archived with the application.

## How to verify the setup

This feature's acceptance: ask a question that has a basis in the original text, and check whether the citation array and footnote markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question, and see whether the answer gives a traceable source.

- In the node, check the selected associated knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a trial with a question that has no matching materials, and see whether the cited content output is empty while the pipeline continues; then open the search parameter panel and check the values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
