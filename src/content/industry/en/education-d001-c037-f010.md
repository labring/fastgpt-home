---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Evidence
meta_description: Training Subsidies: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Find Supporting Evidence

## What this category's data looks like

This page addresses the vocational training subsidy application scenario. The materials are mainly of three types: training class opening filings, attendance records, and completion assessment forms. The sources are paper and electronic documents archived by the school-running park, and the update cadence is synchronized with class completion and the subsidy application cycle. When the three types of materials enter the knowledge base retrieval node, their roles differ: the class opening filing provides basic fields such as institution, trade, class, and planned number of participants; the attendance record provides students' daily attendance and signed receipts; the completion assessment form provides assessment conclusions, scores, and assessor signatures. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record often appears with inconsistent name spellings, headcount bases, and date order across different materials, and this can also occur when versions are not synchronized or signed receipts are missing. The citation output is only responsible for providing the original text snippet and source identifier; field comparison and ledger organization are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are completed next by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class opening filing | Fields such as institution, trade, class, and planned number of participants can be located item by item in the original filing, and the date and signature fields are complete | Open the original filing, check the field names, quantity basis, and dates, and confirm that signatures or receipts exist; record the number of cited items and the value of `quoteMaxToken` |
| Attendance record | Students' daily attendance and signed receipts can be traced back item by item in the attendance sheet, and the date sequence matches the class cycle | Check names, dates, and signatures day by day against the attendance sheet; when the same record has inconsistent names or quantities between the filing and attendance record, mark it for verification |
| Completion assessment form | Assessment conclusions, scores, and assessor signatures can be traced back in the assessment form, and the assessment date is not earlier than the class opening date | Check the assessment form fields and signatures, and compare the assessment date with the last date in the attendance record; when the citation output is empty, check the hit status in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Cited content output | The number of returned items matches the materials hit, and an empty result is also a normal output | Run a test with a question that matches no materials, and see whether the array is empty while the chain continues; then check whether each citation can be traced back to the original paragraph |

## Three common errors

- Symptom: the same student's name is written differently in the filing and attendance record. Cause: the name basis was not unified at entry, the two materials were each written separately, and the cited snippet still does not match after being traced back.
- Symptom: the planned number of participants and the actual attendance number in the attendance record are inconsistent in the completion assessment form. Cause: personnel additions or removals during the class were not synchronized to update the filing and assessment form, so the versions are not synchronized.
- Symptom: the completion assessment form lacks an assessor signature or the attendance record lacks a receipt. Cause: signature fields were not completed when the materials were archived, and the citation output will still return that snippet, requiring manual supplementary verification.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the cited content array and citation markers can be traced back to the original paragraph; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of items and the value of `quoteMaxToken`.

Business test: ask a cross-material basis question, and see whether the answer gives traceable sources, and whether the sources match the fields, dates, and signatures in the class opening filing, attendance record, and completion assessment form.

- Open the citation markers against the source documents, check the original text snippets and source identifiers item by item, and confirm that the citations correspond to the original text.
- Check that the values in the search parameter panel are consistent with the knowledge base retrieval section, and confirm that the selected knowledge base uses the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
