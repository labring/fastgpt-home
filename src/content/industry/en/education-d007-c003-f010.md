---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Review
meta_description: Child Health and Meals: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on kindergarten health care and meal management materials, covering four verification dimensions: ingredient names and specifications, retention sample times and batches, disinfection periods, and absence cause classification. Sources are the health room retention sample register, procurement acceptance sheets, menu scheduling tables, disinfection execution records, and absence summary tables, updated daily or weekly, with fields mainly time, batch, category, and period. When materials enter this function, the retention sample register and procurement acceptance sheets take the role of batch and specification comparison, the menu scheduling table takes the role of category consistency comparison, the disinfection execution records take the role of period completeness comparison, and the absence summary table takes the role of cause classification comparison. Exception tracing and manual review require that every exception can be traced back to the original record, the review conclusion must be signed, and then handed to the person in charge for handling.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The exception list and review conclusion are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Retention sample register materials | Whether the retention sample time and batch are consistent with the procurement acceptance sheet, and whether the ingredient names and specifications match | Retrieve the retention sample register and acceptance sheet for that batch, compare time, batch, category, and specification item by item, and note inconsistent entries |
| Menu scheduling table materials | Whether the categories listed in the menu are consistent with the procured categories, and whether the absence cause classification is consistent with the summary table's criteria | Take the menu and procured category list weekly for comparison, then check the absence cause classification field in the absence summary table |
| Disinfection execution record materials | Whether the disinfection periods are continuous, whether any periods are missing, and whether the recorder has signed | Expand the day's records by period, mark blank periods, and trace back to the original paper or electronic records |
| Retrieval node configuration | Whether the associated knowledge base uses the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameter panel and check item by item, confirm that `quoteMaxToken` is the citation content budget, and record the number of citations separately by array length |

## Three common errors

- Symptom: Documents and retention sample batches do not match, and the corresponding original record cannot be found during tracing. Cause: The batch number was copied incorrectly during registration, or the acceptance sheet and retention sample register were not updated in sync.
- Symptom: The menu and procured categories are inconsistent, and the review conclusion lacks a basis. Cause: The procurement list was not synchronized after the scheduling table was adjusted, or the category name criteria were not unified.
- Symptom: Disinfection records are missing periods, and the exception list cannot be closed. Cause: Period records were omitted or not supplemented during shift handover, resulting in incomplete original materials.

## How to verify the setup

This function's acceptance: ask a question with original text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. You can open the citation superscripts in the conversation, compare against the source documents, and check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are consistent with the original paragraphs.

Business test: create an exception record, see whether it can be traced to the source material, and confirm that the exception is supported by original records and handed to the person in charge for handling after the reviewer signs.

- Run a test with a question that has no matching materials, see that the citation array is empty while the output pipeline continues, and record the array length and the `quoteMaxToken` budget values separately.
- Open the citation superscripts and compare them item by item against the source documents, confirm that each citation can trace back to the original paragraph, then check whether the selected knowledge base uses the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
