---
title: Citations and Source Traceability for Peer Review Organization: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Access
meta_description: Peer Review: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Manage Authorized Access and External Services

## What this category's data looks like

Materials for authorized access and external services of peer review organizations usually fall into three categories: review invitations, expert review comments, and author revision notes. A review invitation contains the manuscript number, invitation date, and reviewer signature or receipt; expert review comments contain comment items, submission date, and expert signature; author revision notes contain point-by-point responses, revised manuscript version number, and author signature. After these three categories of materials enter the knowledge base retrieval node, each is cited as an independent source for subsequent nodes to compare fields, write ledgers, and generate reports. The update rhythm follows the manuscript process: sending the invitation, returning comments, and uploading the revised manuscript each trigger one material ingestion. The field characteristic is that the same record may appear in two categories of materials with inconsistent names, quantities, or dates, or with unsynchronized versions or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Externally available entry points and authorization scope" are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through, and an empty array is a normal output.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the invitation date, manuscript number, and reviewer signature or receipt are consistent with the corresponding record in the expert review comments | In the node, check the selected knowledge base collections and their vector models, then open the citation marker to compare against the original invitation text |
| Expert review comments | Whether the comment items, submission date, and expert signature correspond one-to-one with the response items in the author revision notes | Run a test with a question that has no matching materials, see that the citation array is empty while the chain continues, then compare dates and signatures item by item |
| Author revision notes | Whether the revised manuscript version number, response items, and author signature are synchronized with the version of the review comments, and whether receipts are complete | Open the search parameter panel and check the values item by item, and record the tokens of the cited text separately from the number of array items |
| Knowledge base retrieval node | The cited content is output as an array, the length can be 0, and each citation can point back to the original paragraph | Check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`, and compare against the original document |

## Three common errors

- Symptom: the dates for the same manuscript number do not match between the review invitation and the expert review comments. Cause: the two materials were ingested separately, versions were not synchronized, and field comparison was not performed for the same record.
- Symptom: the number of response items in the author revision notes is fewer than the number of items in the review comments. Cause: the revision notes lack signatures or receipts, items were merged or missed during entry, and the quantity and names do not match.
- Symptom: there is no citation marker in the answer, or the cited fragment does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, and record the number of array items separately.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, that unauthorized content is not visible, and that the parts opened to parents or superiors match the authorization scope.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and run a test with a question that has no matching materials to see that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
