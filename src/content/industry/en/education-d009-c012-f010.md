---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Multilingual
meta_description: Teaching Reviews: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses district and county teaching research activities and lesson observation and evaluation scenarios. Materials include teaching research activity notices, lesson observation records, lesson evaluation minutes, and multilingual materials and terminology comparison drafts. Notices provide the activity theme, time, location, participation scope, and receipt requirements; lesson observation records carry classroom observations, segment annotations, and observation items; lesson evaluation minutes summarize review opinions, improvement suggestions, and signature fields. Multilingual materials and terminology handling require the same term to remain consistent throughout the entire text, and translated names to be traceable back to the original paragraphs. When materials enter the knowledge base retrieval node, each assumes its own source role: notices are used to verify the activity name, date, and participation scope; lesson observation records are used to verify observation items and quantities; lesson evaluation minutes are used to verify review conclusions and signature receipts. In terms of update cadence, notices are published before the activity, lesson observation records and lesson evaluation minutes are archived afterward, and terminology comparison drafts are revised in sync with the multilingual materials. Field characteristics center on activity name, date, quantity, signature, and receipt. Unsynchronized versions or missing signature receipts will cause the same record to fail to match across two materials.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The unified terminology glossary and comparison draft must be handled subsequently by AI nodes, code nodes, or manual work. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the activity name, date, participation scope, and receipt requirements are consistent with the lesson observation records and lesson evaluation minutes | In the node, check the selected collections and their vector models, and run a trial with a question that has no matching materials to see whether the output is empty while the chain continues |
| Lesson observation record | Whether the classroom observation items, segment annotations, and quantities correspond to the notice and lesson evaluation minutes, and whether the signature fields are complete | In the conversation, open the citation markers and compare them against the source documents to verify whether each citation can be traced back to the original paragraph |
| Lesson evaluation minutes | Whether the review conclusions, improvement suggestions, signatures, and receipts match the notice and lesson observation records, and whether the versions are synchronized | Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section |
| Unified terminology glossary and comparison draft | Whether the same term is written consistently throughout the entire text, and whether translated names can be traced back to the original text | Sample three terms to check whether their writing is consistent throughout the entire text, verify the tokens of the cited text, and record the array length separately |

## Three common errors

- Phenomenon: The activity name and date of the same record do not match between the notice and the lesson evaluation minutes. Cause: The two materials are updated separately, versions are not synchronized, and citation sources are not traced back to the original text item by item.
- Phenomenon: The number of observation items in the lesson observation records and lesson evaluation minutes is inconsistent. Cause: The materials have different archiving cadences, cited fragments do not match the original text, and the materials hit in the current round were not checked first.
- Phenomenon: The lesson evaluation minutes lack signatures or receipts, and the externally published draft cannot be traced back. Cause: The signature fields were not synchronized with the version, and an empty citation array was mistakenly judged as a retrieval failure.

## How to verify the setup

This feature acceptance: ask a question with original text evidence, and verify whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`; verify the tokens of the cited text separately with `quoteMaxToken`.

Business test: sample three terms to check whether their writing is consistent throughout the entire text, verify whether translated names can be traced back to the original text, and confirm that the same term is written consistently in the notice, lesson observation records, and lesson evaluation minutes.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a trial with a question that has no matching materials to see whether the cited content output is empty while the chain continues, and open the citation markers to compare them against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
