---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Multilingual
meta_description: Kindergarten Care: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data looks like
Kindergarten childcare daily life management involves three core types of materials: daily life schedules, morning and afternoon check records, and child health observation records. The daily life schedule gives time periods, activity segments, responsible positions, and locations, and is the skeleton of the day; morning and afternoon check records record temperature, oral cavity, skin, and mental state by date, and leave a signature from health care personnel; child health observation records register drinking water, meals, naps, bowel movements, and emotions one by one for each child, with a parent receipt or teacher signature attached. When the three types of materials enter this function, the schedule serves as the terminology and time period baseline, the morning and afternoon check records provide samples of date and signature fields, and the observation records provide individual child expressions and translated name comparisons. The update rhythm is mostly adjusting the schedule each semester and filling in record forms daily. After version iteration, old drafts may still remain in the database, and field naming and date formats easily diverge, requiring a unified terminology table and comparison draft to constrain the writing throughout.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The unified terminology table and comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the writing of time period names, number of activity segments, dates, and position signatures is consistent across the three types of materials | In the node, check the selected collection and its vector model, open the citation corner mark to compare with the source document |
| Morning and afternoon check records | Whether the name, quantity, and date of the same record match between the schedule and the observation records | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and record the number of array items |
| Child health observation records | Whether individual child expressions, translated name back-references, parent receipts, and teacher signatures are complete | Open the search parameter panel and check item by item; when the citation upper limit is involved, check the tokens of the cited text |
| Unified terminology table and comparison draft | Whether the writing of the same term is consistent throughout and the translated name can back-reference the original text | Sample three terms to check whether the writing is consistent throughout, and check the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same morning and afternoon check record do not match between the schedule and the observation records. Cause: Multiple materials are maintained separately and do not back-reference the original paragraphs according to the unified terminology table.
- Phenomenon: The schedule has been revised, but the old version is still retrieved and hit, and the cited fragments are inconsistent with the current draft. Cause: Versions are not synchronized, old drafts are not marked as invalid, and versions are not distinguished during retrieval.
- Phenomenon: Observation records lack parent receipts or teacher signatures, and cited fragments cannot back-reference complete fields. Cause: Signatures and receipts were not stored together with the records, and the traceability chain breaks at the field.

## How to verify the setup

Acceptance of this function: ask a question with original text evidence, and check whether the citation array and corner marks can back-reference the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: sample three terms to check whether the writing is consistent throughout.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they belong to the same vector model.
- Open the citation corner mark to compare with the source document, and check item by item whether the cited fragments can back-reference the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
