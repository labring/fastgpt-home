---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Handover
meta_description: Kindergarten Care: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Daily life management in kindergarten childcare involves materials such as daily life schedules, morning and noon health check records, and child health observation records. When these materials enter the knowledge base retrieval node, each plays a different role: the daily life schedule provides time nodes and activity sequences, the morning and noon health check records provide health status at entry and at noon, and the child health observation records provide clues about abnormalities and handling during the child's time at the kindergarten. Materials are updated daily and archived weekly, and fields include child name, class, date, observation item, handling method, childcare worker signature, and parent receipt. After the materials enter the retrieval node, they are returned as an array of cited content for subsequent steps to compare fields, verify dates and signatures, and draft issuable materials and handover records.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include time nodes, activity names, responsible persons, and dates; the names, quantities, and dates must be consistent with the morning and noon health check records and health observation records | In the citation array, trace each item back to the original paragraph, check the material names and dates hit in `responseData` (non-streaming module results returned with detailed output enabled), and see whether the schedule and records match |
| Morning and noon health check records | Fields include child name, class, morning and noon check results, handling method, childcare worker signature, and parent receipt | Open the citation markers to compare against the source documents, check whether signatures and receipts are complete, and whether missing items are blocked by subsequent steps |
| Child health observation records | Fields include observation item, occurrence time, handling process, follow-up result, and responsible person; the version and date must be synchronized with the day's schedule | In the conversation, open the citation markers, check whether each citation can be traced back to the original text, and then check whether the version and date are synchronized |
| Citation content output | The number of returned items is consistent with the materials hit; being empty is also normal, and the output chain continues to run through | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; when the citation limit is involved, check `quoteMaxToken` and `quoteList`, and record the number of array items separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the schedule and the morning and noon health check records. Cause: During drafting, fields were not compared one by one according to the template, and citation fragments were not traced back to the original text item by item.
- Phenomenon: The version of the health observation record is not synchronized, and the old and new versions appear in the citations at the same time. Cause: The update rhythm was not aligned with the archive date, and retrieval hit the old version of the material.
- Phenomenon: The morning and noon health check records lack a childcare worker signature or parent receipt and are returned during handover. Cause: Field completeness was not verified during the drafting stage, and responsible persons and dates were not confirmed item by item.

## How to verify the setup

Acceptance of this function: Ask a question with original-text support, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array items separately, without comparing it for equality with `quoteMaxToken`.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a question that has no matching materials, see whether the citation content output is empty while the chain continues, and check the number of citations and source identifiers in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
