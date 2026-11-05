---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Checks
meta_description: Kindergarten Play: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Compare Documents and Locate Differences

## What this category's data looks like

In the kindergarten play activity organization scenario, materials are mainly of four types: observation records, area activity plans, material placement lists, and weekly reflections with next week's plans. Observation records are generated entry by entry per activity session, containing child behavior snippets, area names, and material usage; area plans are updated weekly, listing goals and preset materials for each area; material placement lists record names, quantities, and dates; reflections and next week's plans are summarized at the end of the week, carrying forward this week's issues. When these four types of materials enter the knowledge base retrieval node, each is indexed as an independent document; observation records are used to verify the correspondence with area plans, placement lists are used to verify material quantities and dates, and reflection texts are used to verify goal achievement and plan updates. The update rhythm is same-day for observation records, weekly for plans, and on-change for lists; field characteristics center on names, quantities, dates, goal descriptions, and area tags, facilitating field-by-field comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The discrepancy list must be completed subsequently by an AI node, a code node, or manually; the citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the area name and activity goal of the same activity correspond across the two materials | Open the citation superscript to trace back to the original passage, compare the area tag and goal description item by item, and record inconsistent fields |
| Material placement quantity | Whether the name, quantity, and date of the same material are consistent between the placement list and the observation record | Verify the three items of name, quantity, and date in the cited snippet, write inconsistent items into the discrepancy list, and hand it to the reviewer |
| Activity goal achievement | Whether the behavior snippets in the observation record can support the goals listed in the area plan | Locate the goal sentence and the behavior sentence in the cited content, judge whether the goal matches the observation, and mark mismatched items |
| Reflection to next week's plan | Whether the issues mentioned in this week's reflection have entered next week's plan | Retrieve the two materials of the reflection and next week's plan, verify whether the issue items are carried forward, and record if not updated |

## Three common errors

- Phenomenon: the material placement list shows sufficient quantity, but the observation record states insufficient materials. Cause: the two materials have different update rhythms, and the list has not changed with actual placement; the original text must be traced back to verify the date.
- Phenomenon: the goals written in the area plan do not match the behavior snippets in the observation record. Cause: the goal description is disconnected from the actual activity; the goal and behavior must be compared sentence by sentence in the cited snippet.
- Phenomenon: the issues raised in this week's reflection cannot be found as corresponding entries in next week's plan. Cause: the plan was not updated or the reflection was not written back; the carry-forward relationship between the entries of the two materials must be verified.

## How to verify the setup

Acceptance of this feature: first ask a question with original-text evidence, verify whether the cited content array and superscripts can trace back to the original passage, and check that the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and that the execution record is visible in `quoteList`.

Business test: use one real record to find fields inconsistent with the ledger, verify the three items of name, quantity, and date, and hand the discrepancy items to the reviewer for confirmation and write-back.

- In the node, verify whether the selected knowledge base uses the same vector model, open the search parameter panel and verify the values item by item; when the citation limit is involved, verify the tokens of the cited text, record the array entry count separately, and do not compare `quoteMaxToken` with the entry count for equality.
- In the conversation, open the citation superscript, trace back to the original passage item by item against the source document, confirm that every citation can be traced back, then try running a question with no matching materials, and confirm that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
