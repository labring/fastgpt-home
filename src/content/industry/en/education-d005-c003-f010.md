---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Versions
meta_description: Child Health and Meals: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes

## What this category's data looks like

This page's material comes from the kindergarten health care and meal management scenario, covering four types of fields: ingredient names and specifications, sample retention time and batch, disinfection time period, and absence cause classification. Ingredient specifications are used to check whether the recipe and the procurement category are consistent; sample retention batch is used to check whether the documents and the sample retention records match up; disinfection time period is used to check whether the records are missing any time period; absence cause classification is used to check whether the classification criteria are stable. When the material enters the knowledge base retrieval node, each item participates in retrieval as a cited source, and after a hit is returned as an original text snippet with a source identifier. The update rhythm stays in sync with the health room ledger, recipe adjustments, disinfection scheduling, and absence registration; old versions are retained and traceable, and the current version is unique.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "version ledger and change records" are completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient name and specification material | The Check column is written to the category verification dimension: whether the recipe and the procurement category are consistent | In the node, check the selected collection and its vector model, open the citation corner mark to compare against the source document, and record the citation array length and the `quoteMaxToken` budget |
| Sample retention time and batch material | The Check column is written to the category verification dimension: whether the documents and the sample retention batch match up | Run a test with a question that has no matching material, see that the output is empty while the chain continues, then compare against the sample retention records to point back to the original text paragraph |
| Disinfection time period material | The Check column is written to the category verification dimension: whether the disinfection records are missing any time period | Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and record the `responseData` (non-streaming module results returned with detailed output enabled) return structure |
| Absence cause classification material | The Check column is written to the category verification dimension: whether the absence cause classification criteria are stable | Open the citation corner mark in the conversation, compare against the source document, check whether each citation can point back to the original text paragraph, and inspect the `quoteList` field item by item |

## Three common errors

- Symptom: the documents and the sample retention batch do not match up. Cause: the sample retention records and the day's documents are not associated by the same batch number, and the cited snippet only hits one of the materials while the other does not enter the retrieval results.
- Symptom: the recipe and the procurement category are inconsistent. Cause: the ingredient names and specifications are written differently in the recipe and the procurement order, so retrieval only hits one side, and the cited source identifier points to a single document.
- Symptom: the disinfection records are missing a time period. Cause: the disinfection scheduling table and the disinfection records are not updated in sync, retrieval hits the old version of the schedule, and the cited snippet does not match the current time period.

## How to verify the setup

This feature's acceptance: ask a question that has original text support, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the cited content budget; the two are not compared for equality.

Business test: change one piece of content, and see whether the version number and citations are updated in sync.

- Open the citation corner mark, compare against the source document item by item to check whether the cited snippets correspond to the original text paragraphs, and record the citation array length.
- Open the search parameter panel and check the values item by item, confirm that they are consistent with those set in the knowledge base retrieval section, and inspect the `quoteList` within `responseData` return structures.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
