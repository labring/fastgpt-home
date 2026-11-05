---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Review
meta_description: Skills Competitions: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of vocational college skills competition organization. The materials mainly consist of competition regulations, registration forms, and training plans, and also include notices, receipts, and version records. The regulations provide the event name, group, date, signature field, and version number; the registration form carries the contestant's name, ID document, instructor, competition event, and submission date; the training plan records the stage, class hours, venue, trainer, and confirmation signature. Materials enter the knowledge base in batches before, during, and after the competition. Regulations are updated as events are adjusted, registration forms are summarized by registration batch, and training plans are submitted by week. Field dates and signatures must be consistent with the original records. After entering this function, the regulations serve as the basis for judgment, the registration forms and training plans serve as the objects being checked, and the receipts and version records are used to confirm whether the materials are synchronized. Together, the three support the original record chain for exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "exception list and review conclusion" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the event name, group, date, and signature field are consistent with the registration form and training plan, and whether the version number is synchronized | Open the citation marker in the conversation, compare it with the original paragraph of the regulations, and record the number of citations and the `quoteList` source identifier |
| Registration form | Whether the contestant names, quantity, competition events, submission date, and receipt match the regulations and training plan | Run a test with a question containing a name and event, check whether the cited snippet can point back to the original text of the registration form, and view `responseData` (non-streaming module results returned with detailed output enabled) |
| Training plan | Whether the stage, class hours, venue, trainer, and confirmation signature are complete, and whether the date matches the competition schedule in the regulations | Check the values in the search parameter panel item by item, confirm the relationship between the cited text tokens and the `quoteMaxToken` budget, and record the array length separately |
| Receipts and version records | When signatures or receipts are missing or versions are not synchronized, whether the source material can be traced | Create an exception record, retrieve it, and check whether the citation array is empty. If it is empty, confirm that the chain continues and transfer to manual review |

## Three common errors

- Symptom: The same contestant's name or quantity does not match between the registration form and the training plan. Cause: The two materials were filled in by different personnel, and no field comparison or unified receipt confirmation was performed.
- Symptom: The regulations have been updated to a new version, but the registration form still cites the old event date. Cause: The version was not synchronized, and the materials did not carry version identifiers or update cadence when entering the knowledge base.
- Symptom: The review conclusion lacks a signature or receipt and cannot be traced to the source. Cause: The manual review step did not retain citations to the original records, and the cited snippets do not match the original text.

## How to verify the setup

Acceptance of this function: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs, and record the number of citations and the `quoteMaxToken` budget for separate verification.

Business test: create an exception record, see whether the source material can be traced, verify that the exception is supported by original records, and after the reviewer signs, hand it over to the responsible person for handling.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and check that the citation markers correspond to the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
