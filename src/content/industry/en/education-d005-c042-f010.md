---
title: Citations and Source Traceability for Corporate Sales and Product Training: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Versions
meta_description: Sales Training: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Maintain Document Versions and Changes

## What this category's data looks like

Enterprise sales product training involves three types of materials: product manuals, sales response materials, and channel training schedules. Product manuals carry functional parameters and specifications, sales response materials carry scenario responses and objection handling, and channel training schedules carry scheduling and participant targets. When these three enter the knowledge base retrieval node, they are all treated as citable knowledge base materials, and the citation output returns the original text snippets and source identifiers. In terms of field characteristics, product manuals focus on model, version number, effective date, preparation and review signatures; sales response materials focus on item number, corresponding product version, revision date, and confirmation signature; channel training schedules focus on course name, start date, instructor, participating channels, and receipt status. In terms of update cadence, product manuals are updated with version iterations, sales response materials are revised in sync with the manual version, and schedules are published by batch. Common field inconsistencies are concentrated in the same record having mismatched names, quantities, and dates across two materials, versions not being synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text snippet and source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | The model, version number, effective date, preparation and review signatures in the manual should be consistent with the version ledger | In the node, check the selected knowledge base collection and vector model; run a test with a question, open the citation marker, and compare against the original manual paragraphs |
| Sales response materials | The item number, corresponding product version, revision date, and confirmation signature should correspond to the current version of the manual | Check whether the original text snippet returned by the citation output can point back to the sales response material document; check whether its version number is synchronized with the manual version number |
| Channel training schedule | The course name, start date, instructor, participating channels, and receipt status should be consistent with the published batch | Check the dates in the citation snippet against the original schedule; check whether the receipt field is missing |
| Citation content output | The number of citation entries is consistent with the matched materials; being empty is also normal, and the pipeline continues to run through | Run a test with a question that matches no materials, and see whether the output is empty while the pipeline continues; record the number of array entries, and separately check the `quoteMaxToken` budget and the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The same product model has mismatched names and quantities in the manual and the response materials. Cause: The two materials were revised separately, and field comparison was not performed using the current version as the sole baseline.
- Symptom: The response materials have been updated, but the schedule still cites the old version content. Cause: The versions were not synchronized, and the version number and citation source were not synchronized when updating the knowledge base or external documents.
- Symptom: Training records lack signatures or receipts. Cause: After the schedule was published, participant confirmations were not collected, and the ledger lacks signature and receipt fields.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and citation markers can point back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the pipeline runs through.

Business test: change one piece of content, and see whether the version number and citations are updated in sync.

- Open the search parameter panel and check each value item by item to ensure it is consistent with the knowledge base retrieval section
- In the conversation, open the citation markers and compare each citation against the source document to check whether it can point back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
