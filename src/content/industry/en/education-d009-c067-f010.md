---
title: Citations and Source Traceability for Peer Review Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c067-f010
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Citations | Multilingual
meta_description: Peer Review: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Peer Review Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data looks like this: For multilingual materials and terminology handling in peer review organizations, the materials include review invitations, expert review comments, author revision notes, as well as multilingual terminology lists and comparison drafts. When a review invitation enters this function, it serves as a source of terminology and records; expert review comments provide the basis for terminology usage and translated names; author revision notes carry the revision records that refer back to the original text; the terminology list and comparison draft are the finished product to be checked. The update rhythm advances with review rounds, and each round produces new records and translated names. Field characteristics center on record names, quantities, dates, and signatures. In multilingual scenarios, it is also necessary to check whether the same term is written consistently across languages and whether the translated name can refer back to the original text. After the materials enter this function, their roles differ: invitations and comments are used for retrieval and citation, revision notes are used to compare fields, and the terminology list is used to check the writing throughout the entire document.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Unifying the terminology list and comparison draft is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Check the reviewer names, manuscript quantities, issue dates, and signed receipts in the invitation, and match them item by item with the expert review comments | Open the citation marker, compare against the source document, and verify names, quantities, dates, and signatures one by one |
| Expert review comments | Check the terminology wording and translated names in the comments, and confirm that the same term is written consistently in the review invitation and revision notes | Open the citation marker in the conversation, compare against the source document, and spot-check the full-document wording of three terms |
| Author revision notes | Check the record names, quantities, dates, and signatures in the revision notes, and confirm that they match the review invitation and expert review comments | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |
| Multilingual terminology list and comparison draft | Check that the same term is written consistently across languages, that the translated name can refer back to the original text, and that the version is synchronized with the review round | Open the search parameter panel and verify item by item, recording the number of citations and the tokens of the cited text |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials were entered separately and were not compared item by item against the same record.
- Symptom: The versions of the multilingual terminology list and comparison draft are not synchronized, and old translated names still appear in the revision notes. Cause: After the terminology list was updated, it was not written back to the comparison draft, and the round versions were not aligned.
- Symptom: The review invitation or revision notes lack a signature or receipt, and the cited snippet does not match the original text. Cause: The materials entered retrieval before signing was completed, and the citation source identifier is incomplete.

## How to verify the setup

Acceptance for this function: ask a question with original-text support, and check whether the cited content array and citation marker can refer back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs; record the number of citations and the tokens of the cited text. `quoteMaxToken` is the citation content budget, and the number of citations is recorded separately.

Business test: sample three terms and check whether their wording is consistent throughout the document, verify that the translated names can refer back to the original text, and check whether the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are complete.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
