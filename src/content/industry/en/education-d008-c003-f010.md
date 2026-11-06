---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Access
meta_description: Child Health and Meals: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario, and the materials come from the daily ledgers of the health room and logistics: ingredient names and specifications, retention sample times and batches, disinfection periods, and absence cause categorization. When these materials enter the authorized access and external services feature, each plays a different role: ingredient names and specifications are used to compare whether the recipe and procurement categories are consistent; retention sample times and batches are used to check whether the documents and retention sample records match up; disinfection periods are used to check whether the disinfection records are missing any periods; absence cause categorization is used to determine whether the externally visible scope covers the fields required by parents or higher authorities. The materials are updated daily or weekly, and the fields are mainly structured entries, with some text notes as well. For external services, these materials are organized into citable source fragments for subsequent nodes to compare fields, write ledgers, or generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length can be 0. "Externally available entry points and authorization scope" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models, and confirm they are consistent with the values set in the knowledge base retrieval section |
| Cited content output | The number of returned items matches the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain still runs through |
| Ingredient names and specifications | The recipe and procurement categories are consistent, and the specifications can correspond to the documents | Compare the ingredient names and specifications on the recipe entries with those on the procurement documents one by one |
| Retention sample times and batches | The documents and retention sample batches match up, and the times are traceable | Extract one retention sample record and trace back the batch and time fields on the corresponding document |

## Three common errors

- Symptom: the documents and retention sample batches do not match up. Cause: retention sample records and procurement documents are registered separately, and the batch numbers are not checked in the same place.
- Symptom: the recipe and procurement categories are inconsistent. Cause: recipes are scheduled weekly, procurement is adjusted daily, and category names and specifications are not written back.
- Symptom: disinfection records are missing periods. Cause: disinfection periods are filled in by shift, omissions occur during handover, and the externally visible scope still shows as complete.

## How to verify the setup

Feature acceptance: ask a question with textual evidence, check whether the citation array and the superscripts can point back to the original text, and inspect the number of citation items in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifiers in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting and unauthorized fields are not visible; the number of citation items is the array length, and `quoteMaxToken` is the citation content budget, so the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

- Open the search parameter panel and check the values item by item, confirming they are consistent with the values set in the knowledge base retrieval section
- Open the citation superscripts in the conversation, compare them with the source documents, and confirm that each citation can point back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
