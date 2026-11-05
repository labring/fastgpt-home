---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Review
meta_description: Kindergarten Play: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Trace Exceptions and Review Results

## What this category's data looks like

For exception tracing and manual review of kindergarten play activity organization, the materials come from observation records, area plans, material placement lists, activity objective tables, and reflection-to-next-week plans. The correspondence between observation records and area plans is the starting point for tracing; the placed material quantities are used to check whether placement meets activity needs; activity objective achievement is compared with observation records to determine whether objectives and observations are consistent; reflection-to-next-week plans check whether plans are updated according to reflections. When materials enter the knowledge base retrieval node, each assumes a source identification role: observation records serve as original records supporting exception items, area plans and material lists serve as plan-side evidence, activity objective tables serve as objective-side evidence, and reflection-to-next-week plans serve as improvement-side evidence. In terms of update cadence, observation records are updated per instance, area plans and material lists are updated weekly, activity objective tables are updated by theme, and reflection-to-next-week plans are updated weekly. Field characteristics include record time, area name, material name, placed quantity, objective description, observed facts, reflection points, and next-week adjustments. Together these materials support the generation of the exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "exception list and review conclusions" are subsequently completed by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation record | Corresponds to the area plan and can point back to the original record paragraph | Open the citation marker and check against the source document whether this observation falls within the corresponding area plan; record the citation array length and the `quoteMaxToken` budget, and register them separately |
| Material placement list | Placed quantity is consistent with the quantity of materials required by the activity objective | Check the material names and quantities in the list, and compare them item by item with the activity objective table; check whether the cited snippet in `responseData` (non-streaming module results returned with detailed output enabled) contains the quantity field |
| Activity objective table | Objective description matches the behavioral performance in the observation record | Compare the objective achievement description with the observed facts item by item, and confirm there is no mismatch between objective and observation; view the cited source identifier in `quoteList` |
| Reflection-to-next-week plan | The plan has been updated based on reflection and connects with the area plan | Check whether the reflection points have been transferred into the next week's plan, and inspect cases where the plan has not been updated; confirm that the chain still runs when the citation array is empty |

## Three common errors

- Phenomenon: the placed material quantity is inconsistent with the quantity required by the activity objective. Cause: the material list was not updated with the area plan, resulting in insufficient or redundant materials.
- Phenomenon: the activity objective achievement description does not match the behavioral performance in the observation record. Cause: the objective table is updated by theme, while observation records are recorded per instance, and the two are not aligned.
- Phenomenon: reflection points were not transferred into the next week's plan, and the plan was not updated. Cause: the reflection-to-next-week plan step lacks manual review sign-off, and the plan still uses the old version.

## How to verify the setup

Acceptance for this feature: ask a question with textual evidence, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs.

Business test: create an exception record and see whether it can be traced back to the source material.

- Check whether the selected knowledge base uses the same vector model, open the search parameter panel, and verify the values item by item.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and record the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
