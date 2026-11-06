---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Handover
meta_description: Child Health and Meals: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario, focusing on the stages of material drafting and responsibility handover. Common materials include quantified recipes, purchase orders, food ingredient acceptance records, sample retention registrations, disinfection records, absence cause registrations, and handover sign-off sheets. These materials each play a role in the process: recipes and purchase orders define category specifications, acceptance and sample retention registrations lock down batches and times, disinfection records mark time periods, and absence cause classification reflects health monitoring. Field characteristics center on food ingredient names and specifications, sample retention times and batches, disinfection time periods, and absence cause classification. The material update cadence typically advances daily or per meal; recipes and purchase categories must be synchronized, sample retention and acceptance batches must correspond, and disinfection records must cover every time period. When materials enter this feature, they are retrieved and cited as original text fragments in the knowledge base, used for subsequent comparison, ledger writing, and report generation, ensuring fields are complete, responsible parties are clear, and versions and dates are consistent.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Food ingredient names and specifications | Whether the documents and sample retention batches match, and whether the recipes and purchase categories are consistent | Check the food ingredient name, specification, and batch fields in the cited fragments, compare against the purchase order and sample retention registration, and confirm there are no missing items |
| Sample retention times and batches | Whether the sample retention registration time and batch are consistent with the acceptance documents | Open the citation marker to trace back to the original text, verify the sample retention time, batch, and acceptance records, and record the number of array entries |
| Disinfection time periods | Whether the disinfection records cover every time period, and whether any time period is missing | Check the disinfection time period field in the cited fragments, compare against the disinfection record template, and confirm the time periods are continuous |
| Absence cause classification | Whether the absence cause classification is consistent with the registration | Check the absence cause classification field in the cited fragments, compare against the absence registration, and confirm the classification is clear |

## Three common errors

- Symptom: the documents and sample retention batches do not match. Cause: the acceptance records and sample retention registration were drafted separately, the batch fields were not synchronized and checked, and the cited fragments do not trace back to the same original text.
- Symptom: the recipes and purchase categories are inconsistent. Cause: after the recipes were updated, the purchase order was not synchronized, the cited content does not cover the latest categories, and field comparison has missing items.
- Symptom: the disinfection records are missing time periods. Cause: the disinfection time periods were not registered period by period, the cited fragments only cover part of the time periods, and missing items were not intercepted during handover.

## How to verify the setup

Feature acceptance: ask a question that has an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If a citation upper limit is involved, check the tokens of the cited text, and record the number of array entries separately.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are intercepted.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; run a test with a question that has no matching materials, see that the output is empty while the chain continues, and check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
