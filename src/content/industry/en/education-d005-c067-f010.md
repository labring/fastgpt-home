---
title: Citations and Source Traceability for Peer Review Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Versions
meta_description: Peer Review: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Maintain Document Versions and Changes

## What this category's data looks like

Peer review organizations often encounter version misalignment in fields, dates, and signatures across three types of materials: review invitations, expert review comments, and author revision notes. Review invitation records record the invitation round, expert name, invitation date, and response status; expert review comments record the comment number, review date, and signature; author revision notes record the revision items, corresponding comment number, submission date, and author signature. When these materials enter the knowledge base retrieval node, each participates in recall as an original text fragment in its own right and does not assume ledger responsibilities. The update cadence follows the advancement of review rounds; each round produces a new version, and old versions must be traceable. Common inconsistencies center on the same record's name, quantity, or date not matching across two materials, versions not being synchronized, or missing signatures or responses.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation materials | Whether the invitation round, expert name, invitation date, response status, and signature are complete, and whether they match the corresponding record's name and date in the expert review comments | Open the citation badge in the conversation, compare against the original passage of the review invitation, and verify the fields and dates item by item |
| Expert review comment materials | Whether the comment number, review date, and signature are complete, and whether the same record's name, quantity, and date can be matched in the author revision notes | Locate the original comment text in the retrieval results and compare the number and date item by item against the author revision notes |
| Author revision note materials | Whether the revision items and corresponding comment number, submission date, and author signature are complete, and whether the current version is unique and old versions are traceable | After changing one piece of content, retrieve again and check whether the cited fragment synchronously points to the new version |
| Cited content output | The number of returned items matches the materials hit; empty is also normal; the tokens of the cited text and the number of array items are recorded separately | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues |

## Three common errors

- Symptom: The same record's name and date do not match between the review invitation and the expert review comments. Cause: The two materials are updated separately, without field-level comparison and version synchronization.
- Symptom: The comment number cited in the author revision notes is inconsistent with the expert review comments. Cause: Old versions of comments are still being recalled, and the current version has not been made unique.
- Symptom: The review invitation lacks a response, and the expert review comments lack a signature. Cause: When the materials enter the retrieval node, only the body fragment is retained, and the signature and response fields are not verified along with the citation.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, check whether the cited content array and citation badge can point back to the original passage, and record the number of array items and the tokens of the cited text; then ask a question with no matching materials, and confirm that the array is empty while the chain completes.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously, and whether the old version is still traceable.

- In the node, verify the selected collections and their vector models, open the search parameter panel and verify the values item by item, and confirm consistency with the knowledge base retrieval section.
- Run a test with a question that has no matching materials, and see whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and check whether each citation in `quoteList` can point back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
