---
title: Citations and Source Traceability for Peer Review Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Handover
meta_description: Peer Review: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers material drafting and responsibility handover for peer review organizations, involving three types of materials: review invitations, expert review comments, and author revision notes. Review invitation records record the invitee, review round, response deadline, and inviter; expert review comments record the review conclusion, revision suggestions, submission date, and expert signature; author revision notes record the point-by-point responses, revision locations, version number, and author signature. The material sources are the editorial office ledger, review system exports, and archived correspondence, with the update cadence advancing according to manuscript circulation milestones, synchronized once after each review round ends. When these three types of materials enter the knowledge base retrieval node, each plays its own role in field comparison and responsibility traceability: review invitations are used to verify the invitee and deadline, expert review comments are used to verify the conclusion and signature, and author revision notes are used to verify the version and completeness of responses; together the three support the completeness of fields, clarity of responsible parties, and consistency of version and date for signable drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Whether the invitee, review round, response deadline, inviter signature, and issue date are complete, and whether the name and date of the same record match between the invitation letter and the ledger | Open the citation marker to point back to the original invitation text, compare fields and dates item by item, and block it if the signature or receipt is missing |
| Expert review comments | Whether the review conclusion, revision suggestions, submission date, and expert signature are complete, and whether the number of comment items matches the number of responses in the revision notes | Use the citation array to point back to the original comment text item by item, check the item count and dates, and return it if the version is not synchronized |
| Author revision notes | Whether the point-by-point responses, revision locations, version number, and author signature are complete, and whether the version number and date correspond to the comment round | Open the citation markers in the conversation to compare against the source documents, record the array item count, and separately check the `quoteMaxToken` budget |
| Handover record | Whether the responsible party, receipt time, version number, and receipt confirmation are complete, and whether the name, quantity, and date in the two materials are consistent | Run one handover according to the template, use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to trace back to the citation sources, and block it if any item is missing |

## Three common errors

- Symptom: The name and date of the same record do not match between the invitation letter and the ledger. Cause: During drafting, the cited original text was not taken as the standard, and the two places were entered separately.
- Symptom: The expert review comments have been updated, but the author revision notes still cite the old version. Cause: The version was not synchronized, and the version number and date were not checked during handover.
- Symptom: The handover record lacks a signature or receipt, so the next step cannot sign for acceptance. Cause: The fields were not collected completely according to the template, and the responsible party and receipt time were left blank.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence and check whether the citation array and markers can point back to the original paragraphs; then ask a question with no matching materials and confirm that the array is empty while the chain still runs through, and separately record the array item count and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials and see whether the output is empty while the chain continues; then use a question with textual evidence to check whether the citation markers correspond to the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
