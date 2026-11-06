---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Evidence
meta_description: Kindergarten Play: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Find Supporting Evidence

## What this category's data looks like

This page focuses on business basis queries in kindergarten play activity organization. The materials come from the kindergarten's childcare and education archives: observation records, area activity plans, material placement lists, activity objective tables, and reflections and next week's plans. Observation records are updated weekly, area plans and material lists are adjusted according to thematic cycles, objective tables are revised with the semester plan, and reflections are immediately added after activities. When these materials enter the knowledge base retrieval node, each plays a different role: observation records and area plans are used to check whether objectives correspond to observations, material placement lists are used to check whether quantities meet activity needs, and reflections and next week's plans are used to determine whether plans have been updated. In terms of fields, each material carries a source identifier and original text snippet, making it easy to trace back to the specific paragraph. Retrieval output is presented as an array of cited content, whose length can be 0. Whichever material is hit is returned, and the number of array items is not treated as a list of material differences.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text snippet and a source identifier, and the length can be 0. "Basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the two correspond in terms of activity objectives and observed behaviors, and whether the plan is updated according to observation results | Open the citation superscript, compare with the source document, and check whether each citation can be traced back to the original paragraph; use `quoteList` to view the hit material |
| Material placement list | Whether the list quantity is consistent with the actual activity needs, and whether there is material shortage | Bring up the cited snippet in the conversation, compare the list items with the material requirements in the area plan, and record the number of array items |
| Activity objective table | Whether the objective statement matches the behavior descriptions in the observation records, and whether the objectives are updated with the semester plan | Open the search parameter panel and check the values item by item, confirm that the hit material version is the current one, and then check whether the cited snippet is consistent with the original text |
| Reflections and next week's plans | Whether the reflections have been transferred into next week's plan, and whether the plan is still an old version | Run a trial with a cross-material question, check the citation array and superscripts in `responseData` (non-streaming module results returned with detailed output enabled), and confirm that the plan items can be traced back to the original text |

## Three common errors

- Phenomenon: There is no citation superscript in the answer. Cause: No material was hit in this round or the citation output was not used by subsequent nodes. First check the hit material, then check trimming.
- Phenomenon: There is an answer but the citation array is empty. Cause: An empty array is a normal output and does not mean retrieval failed. Check whether the question is cross-material and has no matching original text.
- Phenomenon: The cited snippet does not match the original text. Cause: First check which material was hit in this round, then look at the `quoteMaxToken` budget, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the node, check the selected collections and their vector models, and confirm that the knowledge bases associated are using the same vector model.
- Open the search parameter panel and check the values item by item, record the number of array items, and separately check the tokens of the cited text and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
