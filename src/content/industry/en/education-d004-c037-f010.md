---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Handover
meta_description: Training Subsidies: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the vocational training subsidy application scenario, the materials are centered on training class opening filings, attendance records, and completion assessment forms, supplemented by subsidy application forms and handover records. The class opening filing contains the institution name, class number, course and start/end dates, and student roster; attendance records leave a per-person trace by day, containing name, identity identifier, attendance time period, and personal signature; the completion assessment form contains the assessment method, score, assessment date, and assessor signature. When these materials enter the knowledge base retrieval node, each plays a different role: the class opening filing is used to verify the class and personnel scope, the attendance records are used to verify attendance and date continuity, and the completion assessment form is used to verify the completion conclusion and the signature chain. The update rhythm usually advances by class; filing occurs before and after class opening, daily attendance, and after completion assessment respectively, and the same class may produce multiple versions. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. If any field is inconsistent between two materials, it will affect the signability of the subsidy application material draft and the handover receipt.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. Even if no content is found, the output chain will still run through. The signable material draft and handover record are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class opening filing | Whether the institution name, class number, course name, start/end dates, student roster, and filing signature are complete, and whether they are consistent with the attendance records and completion assessment form in terms of class and personnel scope | In the node, verify the selected collections and their vector models; open the search parameter panel and check item by item; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, and use `quoteList` to expand each citation back to the original paragraph |
| Attendance records | Whether name, identity identifier, attendance date, and personal signature correspond day by day, whether the name, quantity, and date of the same record match across the two materials, and whether the versions are synchronized | Open the citation superscript in the conversation and compare against the source document; extract two materials for the same class and compare dates and headcount; use `quoteList` to check whether the hit fragment falls on the corresponding date row |
| Completion assessment form | Whether the assessment method, score, assessment date, assessor signature, and receipt are complete, and whether the completion conclusion connects with the class opening filing and attendance records | Draft one according to the template and complete one handover to see whether missing items are blocked; try running a question with no matching materials to see whether the output is empty while the chain continues |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal; the number of citations is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality | Record the array item count and separately record the tokens of the citation text; verify whether each citation can point back to the original paragraph, then proceed to the next step of receipt |

## Three common errors

- Phenomenon: The same student name or headcount does not match between the class opening filing and attendance records. Cause: The two materials are filed separately, the name spelling and statistical criteria are not unified, and no item-by-item comparison was made before drafting.
- Phenomenon: The date on the completion assessment form is inconsistent with the last day of the attendance records, and the versions are not synchronized. Cause: After the assessment, a record was added or the version was replaced, the old version is still hit by retrieval, and the version number and date were not checked during handover.
- Phenomenon: The material draft lacks the assessor signature or handover receipt. Cause: The signature step and the retrieval step are separated; the citation array only provides original text fragments and does not handle the completeness judgment of signatures and receipts.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Use `responseData` to see the array length, and use `quoteList` to see each citation fragment.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked; check the fields, dates, and signatures of the class opening filing, attendance records, and completion assessment form, confirm that responsibilities are clear and versions and dates are consistent, then hand off to the next step for receipt.

- In the node, verify the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Try running a question with no matching materials to see whether the citation array is empty while the chain continues, and record the array item count and the tokens of the citation text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
