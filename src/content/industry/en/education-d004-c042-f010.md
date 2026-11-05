---
title: Citations and Source Traceability for Corporate Sales and Product Training: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Handover
meta_description: Sales Training: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For drafting materials and handover of responsibility in enterprise sales product training, there are three core types of materials: product manuals (features, parameters, versions), sales response guidelines (scenario responses, scripts), and channel training schedules (courses, instructors, dates). When these materials enter the knowledge base retrieval node, each serves as a citable original source: product manuals provide field and version basis, response guidelines provide guideline fragments, and schedules provide time and responsibility information. The update cadence typically changes with product versions, channel policies, and course scheduling. Field characteristics include material name, number, quantity, date, version number, responsible person, and signature or receipt column. During drafting and handover, the name, quantity, and date of the same record must be consistent across multiple materials, versions must be synchronized, and signatures and receipts must not be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether the name, quantity, date, version number, and signature column are complete and consistent with the response guidelines | Check whether the vector models of the selected knowledge bases are the same, check whether the number of items in the citation array corresponds to the matched materials, and open the citation marker to trace back to the original paragraph |
| Sales response guidelines | Whether the name, quantity, and date of the same record match in the two materials | Run a test with a question that has no matching materials, confirm that the citation array is empty while the pipeline still runs through, and record the array length and the tokens budget for the cited text |
| Channel training schedule | Whether the version is synchronized and whether the signature or receipt is missing | Open the search parameter panel and check the values item by item, and check whether the cited content in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the original text |
| Handover record | Whether the responsible person is clear and whether the version and date are consistent | Draft one according to the template and complete one handover, see whether missing items are blocked, and check the citation source identifier in `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the product manual and the sales response guidelines. Cause: The two materials were drafted separately and were not checked against the same field template.
- Symptom: The version of the channel training schedule is not synchronized, and the handover record still cites the old version. Cause: The update cadence is not synchronized, and the version number was not confirmed before retrieval.
- Symptom: The handover record lacks a signature or receipt, and the next step cannot be signed for. Cause: The template fields were not enforced, and the responsible person column was not validated during drafting.

## How to verify the setup

Acceptance for this feature: ask a question that has an original text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check whether the selected knowledge bases use the same vector model, and inspect the search parameter values item by item.
- Record the citation array length and the `quoteMaxToken` budget, and do not compare the number of items with the budget for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
