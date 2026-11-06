---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Intake
meta_description: Child Health and Meals: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario. Material types include procurement documents, menus, retention sample registrations, disinfection records, and absence cause registrations. Procurement documents contain ingredient names and specifications, batches, and suppliers; menus are organized by week and label meal times and ingredients; retention sample registrations record retention time and batch; disinfection records are registered by time period; absence registrations are categorized by cause. When these materials enter the Q&A acceptance and missing-item follow-up function, they respectively take on field comparison and traceability roles: procurement documents and menus are used to check category consistency, retention sample registrations and procurement batches are used to check batch correspondence, disinfection records are used to check time period completeness, and absence registrations are used to check cause categorization. The material update cadence is daily or per meal, and the field characteristics are structured fragments such as batch numbers, time periods, specifications, and cause codes.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. The "acceptance records and completed follow-up questions" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement documents and menus | Whether ingredient names and specifications, and menus and procurement categories, are consistent | In the node, check the selected knowledge base collections and vector models; open the search parameter panel and check each item; run a test with a question that mentions only the meal time and not the ingredients, and see whether it first asks about specifications and category |
| Retention sample registrations and procurement batches | Whether retention time and batch correspond to the documents | In the conversation, open the citation markers and compare each citation against the source document to see whether it can point back to the original paragraph; run a test with a question that mentions only the retention date and not the batch, and see whether it asks about the batch |
| Disinfection records | Whether the disinfection time periods are complete | Check that the number of citation content outputs matches the materials hit; empty is also normal; run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |
| Absence cause registrations | Whether the absence cause categorization is consistent with the registration | Check the citation fragments in the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields, and confirm that each citation can point back to the original text; run a test with a question that mentions only the class and not the cause, and see whether it asks about the categorization |

## Three common errors

- Symptom: there are no citation markers in the answer. Cause: the citation output is not presented with the answer, or the citation fragments do not match the original text. First check whether this round hit anything and which material was hit, then look at trimming.
- Symptom: the document and retention sample batches do not match. Cause: the procurement document batch and the retention sample registration batch were not compared item by item, and the citation fragments do not cover the batch field, so you need to point back to the original text for verification.
- Symptom: the menu and procurement categories are inconsistent. Cause: ingredient names and specifications are not reflected in the citations, or the disinfection records are missing time periods, resulting in a lack of basis for field comparison.

## How to verify the setup

This function's acceptance: ask a question that has an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; when the citation upper limit is involved, check the tokens of the citation text, and record the array count separately.

Business test: ask a question that is missing key information, and see whether it first asks a follow-up before answering.

- In the node, check the selected collections and their vector models; open the search parameter panel and check each value item by item.
- Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; in the conversation, open the citation markers and compare each citation against the source document to see whether it can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
