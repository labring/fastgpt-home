---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Access
meta_description: Pastoral Education: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the category of school moral education and homeroom teacher work. The materials include three types: thematic class meeting plans, student comprehensive quality records, and home visit records. Thematic class meeting plans record activity objectives, procedures, dates, and homeroom teacher signatures; they are process-based moral education evidence. Student comprehensive quality records summarize moral conduct, activity participation, rewards and punishments, and parent confirmation by semester; they are outcome-based archives. Home visit records state the visit time, subject, key communication points, and signatures or receipts from both parties; they are evidence of home-school collaboration. The three types of materials are often organized by different teachers at different times, so field names, quantities, and dates are prone to version differences, and missing signatures or receipts are also common. When the materials enter the authorized access and external service function, each plays the role of a searchable source: class meeting plans provide activity traceability, quality records provide growth comparison, and home visit records provide communication verification. All are presented externally as cited excerpts and source identifiers for subsequent nodes or manual comparison of fields, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node. It outputs an array of cited content, each item containing the original excerpt and source identifier, and the length can be 0. The "externally accessible entry points and authorization scope" are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Check whether the activity name, meeting date, number of participants, and homeroom teacher signature are consistent with the same record | Open the citation marker to point back to the original paragraph of the plan, and compare the name, date, quantity, and signature field item by item |
| Student comprehensive quality record | Check whether the semester, moral conduct comments, number of reward and punishment entries, and parent confirmation signature are consistent with the ledger | Retrieve the cited excerpt and the original archive, and check the field names, dates, and signatures or receipts |
| Home visit record | Check whether the visit time, subject, key communication points, and signatures or receipts from both parties are complete | Access once with a restricted identity to see whether the visible scope contains only authorized materials |
| Cited content output | The number of returned items matches the hit materials; empty is also normal; the number of citations is the array length | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name and date of the same class meeting do not match between the plan and the quality record. Cause: The two materials were organized by different teachers at different times, versions were not synchronized, and one location was taken from each during citation.
- Phenomenon: A home visit record lacks a parent signature or receipt, but it can still be retrieved by the external service. Cause: The signature field was not checked when the material was stored, the authorization scope was released for the document as a whole, and no field-level restriction was set.
- Phenomenon: There is an answer but the citation array is empty, or the cited excerpt does not match the original text. Cause: No materials were hit in this round, or hit items and trimming were judged together; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check `responseData`, `quoteList`, and the `quoteMaxToken` budget.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting and unauthorized materials are not visible.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, record the array length, and separately check whether the tokens of the cited text are within the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
