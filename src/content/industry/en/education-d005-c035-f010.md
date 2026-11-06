---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Versions
meta_description: Employee Skills: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this: Enterprise independent skilled talent evaluation involves three types of materials: the enterprise evaluation filing form, the evaluation specification, and the candidate roster. The filing form carries the evaluation entity, occupation (work type), and filing date; the evaluation specification defines the assessment method, weights, and passing standards; the roster records candidate identity, declared level, and batch. The three types of materials corroborate each other in fields, dates, and signatures, and any change in one will affect the others. When the materials enter the knowledge base retrieval node, the filing form and specification are cited as institutional basis, and the roster is cited as personnel basis, each retaining a source identifier for referring back to the original text. The update rhythm is triggered by filing changes, specification revisions, and batch adjustments, and the maintenance focus is that the current version is unique, old versions are traceable, and citations are synchronized.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "version ledger and change record" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | The fields include the evaluation entity, occupation (work type), filing date, and signature, and are consistent with the corresponding items in the evaluation specification and roster | Compare the occupation name and filing date in the filing form and specification item by item, check whether the signature and receipt are complete, and record the current version number |
| Evaluation specification | The assessment method, weights, and passing standards match the declared level and batch in the roster, and the version number is synchronized with the filing form | Take one specification and the roster of the same batch and check the level and date side by side; after changing one piece of content, see whether the version number and citations are updated synchronously |
| Candidate roster | Candidate names, quantities, declared levels, and batch dates are consistent in the roster, specification, and filing form; list separately any missing signature or receipt | Sample records by batch, check the names and quantities in the three materials, inspect signatures and receipts, and register inconsistent items |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; each citation refers back to the original paragraph | Open the citation marker in the conversation to compare with the source document, check the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and record the array item count separately |

## Three common errors

- Phenomenon: The name or quantity of the same candidate does not match in two materials. Cause: The roster and specification are maintained separately, the field definitions are not unified, and only one place is changed during updates.
- Phenomenon: The filing form has been replaced with a new version, but the specification and roster still point to the old version. Cause: The versions are not synchronized, the old version is not marked invalid, and citations still hit old fragments.
- Phenomenon: Materials lack signatures or receipts, and cited fragments do not match the original text. Cause: Scanned copies are incomplete, and the paragraph pointed to by the source identifier is inconsistent with the current version.

## How to verify the setup

Acceptance of this feature: ask a question with original-text basis and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; when the citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Check whether the associated knowledge base uses the same vector model, open the search parameter panel and check the values item by item, and confirm that the source identifiers in `quoteList` within `responseData` can refer back to the original text.
- Run a trial with a question that has no matching materials, confirm that the cited content array is empty while the output pipeline continues, and record the array item count and cited text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
