---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Progress
meta_description: Kindergarten Play: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistics verification in kindergarten play activity organization; the materials come from observation records, area plans, material placement lists, activity objective cards, and reflection-to-next-week plan sheets. Observation records provide fragments of children's behavior, area plans provide week numbers and area arrangements, material placement lists record quantities and locations, activity objective cards give achievement targets, and reflection-to-next-week plan sheets carry forward adjustments. The update rhythm is daily recording, weekly aggregation, and monthly verification. Field characteristics include date, area, material name, placement quantity, objective item, observation summary, exception notes, and statistical criteria. When materials enter the knowledge base retrieval node, the node outputs only an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0; the progress table and statistical criteria description are completed afterward by subsequent AI nodes, code nodes, or manual work.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The progress table and statistical criteria description are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | The Check column states the category verification dimension: whether the area, time period, and activity name in the observation records correspond to the area plans; the appearance of an unplanned area or a time period mismatch is an inconsistency | Open the citation superscripts, trace each item back to the original paragraph, and verify the area and time period fields; view the hit material identifier in `quoteList` |
| Material placement list | The Check column states the category verification dimension: whether the material names and placement quantities in the list match the usage and remaining quantities in the observation records; the appearance of material shortage or a quantity gap is an inconsistency | Aggregate the list quantities by week and compare them with the usage counts in the observation records; record the length of the citation array and separately check whether the `quoteMaxToken` budget is sufficient to hold the citation text |
| Activity objective cards | The Check column states the category verification dimension: whether the objective items have corresponding behavioral evidence in the observation records; a mismatch between objectives and observations or a lack of evidence is an inconsistency | Trace each objective back to the observation summary and verify whether the objective item and the behavior fragment are in the same area and time period; verify the citation array and superscripts in `responseData` (non-streaming module results returned with detailed output enabled) |
| Reflection-to-next-week plan sheet | The Check column states the category verification dimension: whether the reflection items are carried into the next week's plan; a plan that is not updated or reflections that are not carried forward is an inconsistency | Compare this week's reflections with the next week's plan fields and verify whether the plan contains adjustment items and exception notes |

## Three common errors

- Phenomenon: the quantities in the material placement list do not match the usage in the observation records, resulting in material shortage. Cause: the list is not updated daily, and temporary borrowing in the observation records is not backfilled, causing the statistical count to be too small.
- Phenomenon: the objective items on the activity objective cards do not match the behavior in the observation records, and objectives are disconnected from observations. Cause: objective cards are preset by week, while observation records are generated daily, and objective items and behavior fragments are not verified midweek.
- Phenomenon: the reflection-to-next-week plan sheet is not updated, and the plan still follows last week's arrangements. Cause: reflection items are not carried into the plan fields, and weekly or monthly report aggregation directly cites the old plan, with the criteria not written into the header.

## How to verify the setup

This feature's acceptance: ask a question with original-text evidence and verify whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain still runs. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, verify the tokens of the citation text, and record the array item count separately.

Business test: use one week of records to verify the totals and see whether the criteria and exceptions are clearly stated.

- Open the citation superscripts in the conversation, compare them item by item with the source documents, and verify whether the cited fragments match the original paragraphs; view the hit material identifier in `quoteList` and confirm that the citation array length matches the number of hits.
- Run a trial with a question that has no matching materials, confirm that the output is an empty array while the chain continues; view the citation array in `responseData`, record the item count separately, and do not compare the item count with `quoteMaxToken` for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
