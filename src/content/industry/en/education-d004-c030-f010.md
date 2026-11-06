---
title: Citations and Source Traceability for Vocational School Student Internships: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Handover
meta_description: Student Internships: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Vocational school student internship management involves three core types of materials: internship agreements, internship plans, and internship logs. The internship agreement specifies the rights and responsibilities of the three parties—the school, the internship unit, and the student—and includes the position, term, remuneration, insurance, and signature page; the internship plan is jointly drafted by the school and the unit and includes rotation arrangements, mentors, assessment methods, and dates; the internship log is recorded daily by the student and includes the position, tasks, duration, and mentor signature. When these three types of materials enter the knowledge base retrieval node, the agreement and plan serve as the baseline texts for responsibility handover, while the log serves as process evidence, and each is cited in the form of original text fragments. The material update rhythm is: agreements are archived after being signed in batches, plans are revised in sync with rotation adjustments, and logs are summarized weekly. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. If the same record has inconsistent names, misaligned dates, or unsynchronized versions between the agreement and the plan, missing items appear at handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the three-party names, position, term, remuneration, insurance, and signature page are complete, and whether the dates and signatures are consistent | Retrieve the original text fragment of the agreement, compare the fields and signature page item by item, and check the cited source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Internship plan | Whether the rotation arrangements, mentors, assessment methods, and dates are consistent with the agreement, and whether the versions are synchronized | Open the citation marker to trace back to the original plan text, and check the source document and version date in `quoteList` |
| Internship log | Whether the position, tasks, duration, and mentor signature correspond day by day, and whether the quantities and dates match the plan | Summarize the cited log fragments weekly, and compare them against the rotation dates and mentor signatures in the plan |
| Cited content output | Whether the number of returned items matches the materials hit; empty is also normal; whether the cited fragments can trace back to the original paragraphs | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The position name, number of people, and start and end dates of the same internship record do not match between the agreement and the plan. Cause: The two materials were drafted separately, without field-level comparison and version synchronization.
- Symptom: The log has records, but the agreement or plan lacks signatures or receipts, and it is returned at handover. Cause: The signature page was not updated with the version, and the receipt was not archived.
- Symptom: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, compare each citation against the source document to see whether it can trace back to the original paragraph, and separately record the number of array items and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
