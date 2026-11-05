---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Intake
meta_description: Kindergarten Play: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A acceptance and missing-item follow-up in the kindergarten game activity organization scenario. The materials come from observation records, area activity plans, material placement lists, and activity reflection forms, and the update cadence rolls forward by week and activity round. Observation records correspond to area plans and are used to judge whether activity goals are consistent with on-site behavior; the material placement quantity list is used to check whether placement satisfies the area headcount and play needs in the plan; reflections turning into next week's plan are used to confirm whether adjustment items enter the next round of arrangements. When these materials enter the knowledge base retrieval node, each plays the role of a traceable source: observation records provide behavior fragments, area plans provide goals and area arrangements, material lists provide quantity evidence, and reflection forms provide improvement clues. Acceptance records and the completed question items are then compared by field, written into ledgers, and used to generate reports by subsequent AI nodes, code nodes, or humans.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. "Acceptance records and the completed question items" are then completed by subsequent AI nodes, code nodes, or humans. The cited content is output as an array; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records correspond to area plans | Whether activity goals match the observed behavior, and whether differences can be pointed out when goals and observations do not match | Open the citation superscript in the conversation, compare against the source document, check whether each citation can point back to the original paragraph, and record the number of citations, i.e. the array length |
| Material placement quantity | Whether the placement quantity satisfies the headcount and play needs in the area plan, and whether insufficient materials can be identified | Run a trial with a question that only asks about material quantity, check that the cited fragments correspond to the original text, and separately record the array length, without comparing it for equality with `quoteMaxToken` |
| Reflections turning into next week's plan | Whether the adjustment items in the reflection enter the next round of the plan, and whether follow-up questions can be asked when the plan is not updated | Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, then check whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty or hits materials |
| Cited content output | The number of returned entries is consistent with the materials hit, and being empty is also normal | Run a trial with a question that matches no materials, see that the output is empty while the chain continues, and confirm in `quoteList` that the retrieval step has been executed |

## Three common errors

- Symptom: there is no citation superscript in the answer. Cause: the citation array is empty or the citations are not displayed with the answer; first check whether this round hit materials, then check trimming.
- Symptom: insufficient material placement quantity is not followed up. Cause: the material list is not updated together with the area plan, and missing-item identification depends on the field correspondence between the plan and the list.
- Symptom: goals and observations do not match, or the plan is not updated, yet it is still treated as accepted. Cause: reflections turning into next week's plan do not enter the retrieval scope, and missing-item follow-up lacks a traceable source.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the number of citations, i.e. the array length, in `quoteList` within `responseData`; `quoteMaxToken` is only the citation content budget and is not compared for equality with the number of entries.

Business test: ask a question missing key information, see whether it first asks follow-up questions before answering, and whether the follow-up items correspond to missing items in observation records, area plans, material placement quantity, or reflections turning into next week's plan.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and record the citation array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
