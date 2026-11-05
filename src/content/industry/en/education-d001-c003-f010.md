---
title: Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Find Supporting Evidence
slug: /en/industry/education-d001-c003-f010
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Citations | Evidence
meta_description: Child Health and Meals: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Healthcare and Meal Management: Find Supporting Evidence

## What this category's data looks like

This category's data covers three-party records kept by the health room, the canteen, and the classes: morning and afternoon health checks and categorized records of absence causes, quantified recipes and purchase orders, food ingredient acceptance documents, sample retention registrations, and disinfection time schedules. Materials are updated daily, weekly, and monthly, and fields include ingredient name and specification, sample retention time and batch, disinfection time period, categorized absence cause, meal service, and class. After entering this feature, the knowledge base retrieval node splits and associates the materials, recalls original text fragments using the same vector model, and each entry in the citation array carries an original text fragment and a source identifier, for subsequent nodes to compare fields, write ledgers, and generate replies to parents or basis entries for plans.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The "basis entries that can be traced back to the original text" are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model, so that cross-material basis questions can be compared in the same recall space | Check the selected collections and their vector models in the node, and confirm that all four types of materials—ingredients, sample retention, disinfection, and absence—are in the same collection |
| Cited content output | The number of returned entries matches the hit materials; empty is also normal, and the output pipeline continues to run through | Run a test with a question that has no matching materials, and see that the array is empty while the pipeline continues; also record the number of array entries and the `quoteMaxToken` budget, and do not compare the two for equality |
| Citation-to-original-text correspondence | Each citation can be traced back to the original text paragraph, with ingredient name and specification, sample retention time and batch, disinfection time period, and categorized absence cause matching item by item | Open the citation markers in the conversation and compare against the source documents; then check whether the fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are consistent with the original text |
| Search parameters | They are consistent with the values set in the knowledge base retrieval section, and the tokens of the cited text are within budget | Open the search parameters panel and check item by item; when the citation limit is involved, check the tokens of the cited text, and record the number of array entries separately |

## Three common errors

- Symptom: there are no citation markers in the answer. Cause: the citation array is empty or the cited fragments were not filled back into the reply; first check whether there was a hit in this round and which material was hit.
- Symptom: the document and the sample retention batch do not match. Cause: the acceptance document and the sample retention registration belong to different materials, the recalled fragments are not aligned by the batch field, and the citation cannot be traced back to the same original text.
- Symptom: the recipe and the purchased categories are inconsistent, and the disinfection record is missing a time period. Cause: the materials are updated at different rhythms, the old version is still recalled, and the cited fragments do not match the current original text.

## How to verify the setup

Acceptance for this feature: ask a question that has an original-text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question, and see whether the answer gives a traceable source.

- Open the citation markers, compare item by item against the source documents, and confirm that ingredient name and specification, sample retention time and batch, disinfection time period, and categorized absence cause can be traced back to the original text paragraph.
- Run a test with a question that has no matching materials, record the number of array entries, and separately check whether the tokens of the cited text are within the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
