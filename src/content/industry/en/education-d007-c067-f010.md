---
title: Citations and Source Traceability for Peer Review Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Review
meta_description: Peer Review: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Trace Exceptions and Review Results

## What this category's data looks like

In the exception tracing and manual review scenario for peer review organizations, the core materials include three types: review invitations, expert review comments, and author revision notes. Review invitations carry the invitation time, reviewer identity, and receipt status, and are used to confirm whether the review relationship is established; expert review comments record the review conclusion, date, and signature, and are the basis for determining academic judgment; author revision notes respond to the comments item by item and mark the revision locations, and are used to check whether the revisions were implemented. When these three types of materials enter the knowledge base retrieval node, each is cited and output in the form of an original text snippet, respectively taking on the roles of relationship confirmation, conclusion determination, and revision verification. The material update rhythm usually advances with review rounds, with a new version produced each round; the field characteristics are concentrated in four categories: name, quantity, date, and signature, and version synchronization and signature receipts are the starting point for tracing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The exception list and review conclusion are completed subsequently by AI nodes, code nodes, or humans. The citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Check the reviewer name, invitation date, and receipt signature in the invitation record, and confirm they match the corresponding fields in the expert review comments | Open the source identifiers one by one in the citation array, compare them against the date and signature fields in the original review invitation, and record discrepancies in name, quantity, and date |
| Expert review comments | Check whether the review conclusion, comment date, and signature are complete, and confirm they correspond one-to-one with the response items in the author revision notes | Use the citation superscripts to refer back to the original paragraphs, check whether the name, quantity, and date of the same record match across the two materials, and separately flag missing signatures or receipts |
| Author revision notes | Check the number of revision items, revision date, and author signature, and confirm they match the number of items in the expert review comments | Compare the item numbers of the revision notes and the review comments in the citation output, and list items whose versions are not synchronized in the exception list |
| Knowledge base retrieval node | Check whether the associated knowledge base uses the same vector model, and whether the number of cited content output entries matches the hit materials; an empty result is also normal | Open the search parameter panel and check the values item by item, inspect the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and for `quoteMaxToken` only check the tokens budget of the cited text |

## Three common errors

- Symptom: the name and date of the same record do not match between the review invitation and the expert review comments. Cause: the two materials were generated in different rounds, no field-level comparison was performed, and the cited snippets are output independently.
- Symptom: the number of items in the author revision notes is inconsistent with the expert review comments. Cause: the versions are not synchronized, the revision notes were written based on an older version of the comments, and the citation array does not cover the latest version.
- Symptom: the review comments lack a signature or receipt. Cause: the signature and receipt fields were not included in the citation source identifiers, so the signing status cannot be confirmed from the original text snippets during review.

## How to verify the setup

This feature's acceptance: ask a question with original text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline still runs through, and at the same time inspect `responseData`, `quoteList`, and `quoteMaxToken` to record the tokens budget of the cited text.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that the exception is supported by original records and, after the reviewer signs, is handed to the person in charge for handling.

- Open the search parameter panel and check the values item by item, confirm the associated knowledge base uses the same vector model, and run a trial with a question that has no matching materials to see whether the output is empty while the pipeline continues.
- Open the citation superscripts in the conversation, compare each citation against the source document to check whether it can refer back to the original paragraph, and record the array length and the cited text tokens; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
