---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Handover
meta_description: Kindergarten Play: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of drafting materials and handing over responsibility in kindergarten play activity organization, focusing on categories of materials such as observation records, area plans, material placement lists, activity objectives, and reflections transferred into next week's plan. Observation records and area plans must correspond one-to-one, the quantity of materials placed must be traceable to a specific area and week, the achievement of activity objectives must be supported by observation excerpts, and reflection content must be transferable into next week's plan with an updated version. When these materials enter the knowledge base retrieval node, each assumes a source identification role: observation records and area plans serve as cited original text excerpts, the material placement list provides quantity fields, and activity objectives and reflections provide determination fields. The update cadence advances by week, and before each handover the version and date must be checked for consistency. After materials are drafted, they enter the handover record, and only when the fields are complete and the responsible person is clear can they be issued.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text excerpt and a source identifier, and the length may be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the two correspond one-to-one, and whether observation excerpts can point back to objective items in the area plan | Open the citation superscript, compare each citation against the source document to check whether it can point back to the original paragraph, and register the array length and the `quoteMaxToken` budget separately |
| Material placement quantity | Whether the quantity is consistent with the area plan and week, and whether shortages are marked in the handover record | Check the quantity fields of the placement list and the area plan item by item, and confirm that the cited excerpts in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text |
| Activity objective achievement and reflection transfer to next week's plan | Whether the objectives match the observations, and whether the reflection is transferred into next week's plan with an updated version date | Check whether the objective items match the observation excerpts, verify whether the reflection content appears in next week's plan, and whether the version and date are consistent |
| Search parameters and knowledge base collection | Whether the selected knowledge base is for the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameters panel and check item by item, and view the selected collection and vector model in `quoteList` |

## Three common errors

- Symptom: In the handover record, the material placement quantity does not match the area plan, resulting in insufficient materials. Cause: During drafting, the placement list was not compared item by item with the area plan, and the missing item was not stopped before handover.
- Symptom: The activity objectives do not match the observation records, and no corresponding observation excerpt can be found for the objective items. Cause: The objectives were written first and the observations added later, and the two were not aligned within the same version.
- Symptom: The reflection content was not transferred into next week's plan, and the plan was not updated. Cause: During handover, only field completeness was checked, not the correspondence between the reflection and next week's plan.

## How to verify the setup

This feature's acceptance: ask a question with original text support, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array item count and the `quoteMaxToken` budget without comparing them for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are stopped.

- In the conversation, open the citation superscript, compare each citation against the source document to check whether it can point back to the original paragraph, and record the array length separately.
- Open the search parameters panel and check item by item, confirming that the selected knowledge base is for the same vector model and that the search parameter values are consistent with the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
