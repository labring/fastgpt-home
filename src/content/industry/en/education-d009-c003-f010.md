---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Multilingual
meta_description: Child Health and Meals: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page's materials come from the daily operations of kindergarten health care and meal management: four types of records—ingredient names and specifications, sample retention times and batches, disinfection periods, and absence cause classification—as well as source documents such as menus, purchase orders, disinfection sheets, and absence registers. When these materials enter the citation output of a knowledge base retrieval node, the node outputs only an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0; the unified terminology glossary and comparison draft must be continued by subsequent AI nodes, code nodes, or manual work. The update cadence follows the kindergarten's ledger cycle; after new documents are archived, the terminology glossary and comparison draft are refreshed in sync. Field characteristics are mainly short text, time points, batch numbers, and category names; multilingual materials and terminology processing require the same term to be consistent throughout the entire text and translated names to be traceable back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "unified terminology glossary and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether the menu and purchase categories are consistent, and whether the translated names can be traced back to the original text | Sample three terms to check their wording throughout the entire text, and open the citation superscript in the conversation to compare against the source document |
| Sample retention times and batches | Whether the documents and sample retention batches match up | Look up the cited snippets by batch number, and check whether the time point and source identifier are in the same paragraph |
| Disinfection periods | Whether the disinfection records are missing any periods | Check paragraph by paragraph whether the cited snippets cover the periods; where a period is missing, record it as an empty array and keep the chain |
| Absence cause classification | Whether the classification terms are consistent throughout the entire text and whether the translated names can be traced back to the original text | Use the same term to compare wording across different documents, and check the source identifiers in `quoteList` and `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the documents and sample retention batches do not match up. Cause: the cited snippets are taken from different source documents, and the batch number is not traced back to the original text within the same paragraph; you must first check the materials hit in this round before making a judgment.
- Symptom: the menu and purchase categories are inconsistent. Cause: ingredient names and specifications are not unified in the terminology glossary, and when the translated name is traced back to the original text, it points to another category entry.
- Symptom: the disinfection records are missing periods. Cause: an empty citation array is mistaken for a retrieval failure, when in fact the materials were not hit; an empty array is a normal output, and the chain still continues.

## How to verify the setup

This feature's acceptance: ask a question that has original-text support, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

Business test: sample three terms to check whether their wording is consistent throughout the entire text, and check whether the translated names can be traced back to the original text; for status values, write only those that actually exist in this feature.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item
- Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the source identifiers in `quoteList` and `responseData`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
