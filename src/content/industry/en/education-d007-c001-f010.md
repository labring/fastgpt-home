---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Review
meta_description: Kindergarten Care: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the kindergarten childcare daily life management scenario; the materials include the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated weekly or daily, with fields including activity name, start and end times, and responsible person's signature; the morning and afternoon check records are filled in daily, with fields including child's name, morning check time, body temperature, afternoon check time, abnormal description, and health worker's signature; the child health observation records are updated as needed or daily, with fields including observation date, child's name, symptom description, handling method, and observer's signature. When these materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and is used for subsequent comparison of whether the names, quantities, and dates of the same record are consistent across the two materials, and whether the signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The "exception list and review conclusion" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the activity name, start and end times, and responsible person's signature are consistent with the corresponding fields in the morning and afternoon check records and health observation records | Check the original text snippets one by one in the citation array, use `quoteList` to expand the source identifier, and confirm the schedule date and signature column |
| Morning and afternoon check records | Whether the child's name, morning and afternoon check times, body temperature, abnormal description, and health worker's signature match the health observation records | Open the citation superscript to trace back to the original paragraph, record the number of array items, and separately view the citation text tokens corresponding to `quoteMaxToken` |
| Child health observation records | Whether the observation date, child's name, symptom description, handling method, and observer's signature are synchronized with the same version of the schedule and morning and afternoon check records | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure, confirm that each citation can be traced back to the original text, and mark for review when a signature or receipt is missing |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the length of the cited content array matches the hit materials, and the flow proceeds even when empty | Run a test with a question that has no matching materials, see that the array is empty while the chain continues, then check the search parameter panel item by item |

## Three common errors

- Symptom: the same child's name is written differently in the morning and afternoon check records and the health observation records. Cause: the two materials are entered separately without name normalization, and the citation snippets each trace back to their own original text, so manual confirmation is required during comparison.
- Symptom: the daily life schedule has been updated, but the morning and afternoon check records still cite the old version's activity times. Cause: versions are not synchronized, multiple versions of the material exist simultaneously in the knowledge base, and the citation array returns different source identifiers.
- Symptom: the health observation records lack the observer's signature or receipt, and the exception list cannot be closed. Cause: signatures were not added when the materials were archived, the citation snippets only present the existing original text, and missing signatures require manual review and supplementary entry.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain continues.

Business test: create an exception record, see whether it can be traced to the source material, and record the number of citations and `quoteMaxToken` separately, without making an equality comparison.

- Open the citation superscripts in the conversation, compare against the source documents, and confirm item by item that the citation snippets match the original paragraphs.
- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and run a test with a no-match question to verify the empty-array chain.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
