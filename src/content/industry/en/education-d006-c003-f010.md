---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Progress
meta_description: Child Health and Meals: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics

## What this category's data looks like

In the kindergarten health care and meal management scenario, materials come from the daily documents of the health room and the canteen: the ingredient acceptance form records names and specifications, the sample retention register records retention times and batches, the disinfection record form records disinfection periods, the absence register records cause-of-absence categorization, and the menu table records the meal arrangements for the week. When these materials enter the citation output of the knowledge base retrieval node, each plays the role of being traceable back to the original text: the acceptance form and the menu are used to check whether the purchased categories are consistent, the sample retention table and the acceptance form are used to check whether the batches match, the disinfection table is used to check whether the periods are continuous, and the absence table is used to check the categorization criteria for causes of absence. The update rhythm is weekly collection and monthly aggregation, and the field characteristics are mainly dates, batch numbers, periods, and category names, making it easy for subsequent nodes to compare by field and write ledgers.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "progress table and statistical criteria description" is then completed by a subsequent AI node, code node, or manually, and is used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient acceptance form and menu table | Whether ingredient names and specifications, and the menu and purchased categories, are consistent | Take one week of acceptance forms and the menu for that week and compare item by item, marking inconsistencies in the progress table criteria description |
| Sample retention register and acceptance form | Whether the retention time and batch can be traced back to the same batch | Link the two tables by batch number, check whether the cited snippets correspond to the original text paragraphs, and register the number of records and the totals separately |
| Disinfection record form | Whether disinfection periods are missing and whether periods and dates are continuous | List the period checklist by date, write an exception note where periods are missing, and do not treat an empty array as a retrieval failure |
| Absence register | Whether the categorization criteria for causes of absence are written in the header | Write the categorization criteria in the header, use one week of records to check the totals, and check the values of the `quoteMaxToken`, `responseData` (non-streaming module results returned with detailed output enabled), and `quoteList` fields |

## Three common errors

- Symptom: the batches in the sample retention register and the acceptance form do not match. Cause: documents are registered by arrival date, while sample retention is registered by meal, the two numbering sets have no mapping, and the cited snippets each trace back to different paragraphs.
- Symptom: the categories written in the menu are inconsistent with the purchased categories. Cause: the menu is scheduled weekly, while purchasing is adjusted according to actual arrivals, substitutions are not written back to the menu, and a discrepancy appears between the statistical totals and the number of records.
- Symptom: the disinfection record is missing periods. Cause: handover periods were not supplemented, the cited array has fewer entries for that day, the chain still runs through, and it is easy to misjudge this as a retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, and check whether the citation array and the superscript can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: use one week of records to check the totals, see whether the criteria and exceptions are clearly written, record the number of citations separately by array length, and use `quoteMaxToken` only to check the citation content budget.

- Open the citation superscript in the conversation, compare it against the source document to check whether each citation can trace back to the original text paragraph, and check whether the selected knowledge base uses the same vector model.
- Run a test with a question that has no matching material, confirm that the output is empty while the chain continues, and then check item by item whether the values in the search parameter panel are consistent with the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
