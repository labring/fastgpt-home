---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Versions
meta_description: Graduate Admissions: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this
In the graduate admissions re-examination and admission scenario, the materials are mainly re-examination plans, candidate score sheets, and adjustment lists. The sources are official documents issued by departments and system export records. The update rhythm is concentrated in the admissions season, with multiple revisions as batches, subjects, and quotas are adjusted. The three types of materials play different roles when they enter the knowledge base retrieval node: the re-examination plan provides the process, timing, and eligibility criteria; the candidate score sheet carries scores, rankings, and identity fields; the adjustment list records batches, preferences, and confirmation status. In terms of field characteristics, the same candidate may have inconsistent name spellings, ID lengths, and date formats in the score sheet and adjustment list; signature and receipt fields are easily missing in scanned copies; and version numbers and effective dates often appear only at the beginning of the main text. These differences make citation sources and traceability a prerequisite step for comparing fields and writing a version ledger. The retrieval node is only responsible for handing over the hit original text fragments and source identifiers; subsequent nodes or humans then use them to judge whether the current version is unique, whether the old version is traceable, and whether citations are synchronized.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "version ledger and change record" is completed by subsequent AI nodes, code nodes, or humans. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model; mixing models across selections makes citation sources hard to align | In the node, check the selected collections and their vector models, and confirm which knowledge base the re-examination plan, candidate score sheet, and adjustment list each come from |
| Citation content output | The number of returned items matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length in `responseData` (non-streaming module results returned with detailed output enabled) |
| Citation-to-original correspondence | Each citation can point back to the original paragraph, including date, quantity, and signature fields | Open the citation markers in the conversation, and compare the fields and dates of the re-examination plan, score sheet, and adjustment list against the source documents |
| Search parameters | Consistent with the values set in the knowledge base retrieval section | Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, record the array item count separately, and do not compare the item count with `quoteMaxToken` for equality |

## Three common errors

- Symptom: The same candidate's name spelling and ID length do not match between the score sheet and the adjustment list. Cause: The two materials were exported by different links and were not backfilled according to a unified field standard.
- Symptom: The re-examination plan changed the time or quota, but the old version is still being cited. Cause: The version was not synchronized, the old document in the knowledge base was not removed, and the citation source did not indicate the effective date.
- Symptom: The adjustment list lacks a signature or receipt, and the cited fragment cannot prove that the process was completed. Cause: The scanned copy only captures the main table body, the signature page was not entered into the knowledge base, and the traceability chain breaks on the material side.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and inspect the return structure of `quoteList` and `responseData`.

Business test: change one piece of content, see whether the version number and citations are updated synchronously, and confirm that the current version is unique, the old version is traceable, and citations are synchronized.

- Open the citation markers and point back to the original text one by one, record the source identifier and paragraph of each citation, and check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and adjustment list.
- Run a test once with a question that has no matching materials, confirm that the array is empty while the chain runs through, and separately record the array item count and the value of `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
