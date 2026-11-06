---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Checks
meta_description: Kindergarten Care: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Compare Documents and Locate Differences

## What this category's data looks like

This category involves three core types of materials: daily life schedules, morning and afternoon check records, and child health observation records. Daily life schedules are updated weekly or monthly by the childcare and education department, with fields including activity name, start and end times, and responsible person's signature; morning and afternoon check records are filled in twice daily by the lead teacher, with fields including child's name, body temperature, abnormality description, and parent receipt; child health observation records are registered as needed by the health care worker, with fields including observation date, symptoms, handling measures, and review signature. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent source; after a retrieval hit, the original text fragments and source identifiers are returned as a cited content array for subsequent field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Activity name, start and end times, and responsible person's signature are consistent across the three materials | Extract the schedule and morning and afternoon check records for the same date, compare names and dates field by field, and check the signature column |
| Morning and afternoon check records | Child's name, body temperature, date, and parent receipt match the observation records | Use one real record to locate fields inconsistent with the ledger, and record the number of citations and the `quoteMaxToken` budget |
| Child health observation records | Observation date, symptoms, handling measures, and review signature are synchronized with the schedule version | Open the citation marker to point back to the original paragraph, and check the source identifier and `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The same child's name is written differently in the morning and afternoon check records and the health observation records. Cause: The two entries do not use unified wording; after a retrieval hit, the cited fragments are independent of each other and require manual field comparison.
- Phenomenon: The daily life schedule has been updated, but the morning and afternoon check records are still filled in according to the old version. Cause: The versions are not synchronized; the citation array returns the original text hit by each source and does not automatically align versions.
- Phenomenon: The parent receipt or review signature column is empty. Cause: Signatures or receipts are missing during material circulation; the cited fragments can point back to the original text, but the discrepancy must be determined by subsequent nodes or manually.

## How to verify the setup

This feature's acceptance: ask a question with original text evidence, and check whether the cited content array and citation markers can point back to the original paragraph; then ask a question with no matching materials, confirm that the array is empty while the chain still runs, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one real record to find fields inconsistent with the ledger, submit them to the reviewer for confirmation, and write back.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model
- Open the search parameter panel and check each value item by item against the knowledge base retrieval section; run a test with a question that has no matching materials, and see that the output is empty while the chain continues

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
