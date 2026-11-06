---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Versions
meta_description: Teaching Reviews: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Maintain Document Versions and Changes

## What this category's data looks like

In district and county teaching and research activity and classroom observation and evaluation scenarios, three types of materials—teaching and research activity notices, classroom observation records, and evaluation meeting minutes—jointly enter the knowledge base retrieval node. Notices carry the activity theme, time, location, and participation scope; classroom observation records carry classroom observations, segment times, and observation items; evaluation meeting minutes carry review opinions, improvement suggestions, and signed receipts. The fields of the three types of materials overlap, and it is common for the name, quantity, and date of the same record to fail to match across two materials, for versions not to be synchronized, and for signatures or receipts to be missing. The update rhythm advances with the activity cycle: notices are issued first, records are generated during class, minutes are added after the meeting, and after revision they need to flow back into the knowledge base and be synchronized with external documents. When the materials enter this function, notices and minutes participate in retrieval as citation sources, while classroom observation records serve as the basis for field comparison; each enters the citation array as an original text fragment with a source identifier, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text fragment and a source identifier, and the length can be 0. The version ledger and change records are completed afterward by subsequent AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching and research activity notice | Fields include activity name, date, location, participation scope, and signature column; the name, quantity, and date must be consistent with the classroom observation records and evaluation meeting minutes | In the node, check the selected knowledge base collection and vector model, open the citation corner mark to point back to the original notice paragraph, and compare the date and signature item by item |
| Classroom observation record | Fields include classroom observations, segment times, observation items, and recorder; the name, quantity, and date of the same record must align with the notice and minutes | Run a trial with a question that has no matching material, and see whether the citation array is empty while the chain continues; then use a question with original text support to check whether the citation fragments in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text |
| Evaluation meeting minutes | Fields include review opinions, improvement suggestions, signature, and receipt; when the version is not synchronized or the signature is missing, it must not be cited as the current version | Open the search parameter panel and check the values item by item; against the source document, check whether the citation fragments in `quoteList` can point back to the original minutes text |
| Citation content output | The number of returned items is consistent with the matched materials, and being empty is also normal; citations correspond to the original text, and an empty array is not treated as retrieval failure | In the conversation, open the citation corner mark and compare it with the source document; record the array item count and separately check the tokens of the citation text |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record fail to match between the notice and the minutes. Cause: the two materials were revised separately, did not flow back to the same version, and the citation fragments each point to old text.
- Phenomenon: there is no citation corner mark in the answer, or there is an answer but the citation array is empty. Cause: no material was matched in this round, or the citation does not match the original text and is misjudged as retrieval failure.
- Phenomenon: the evaluation meeting minutes lack a signature or receipt but are still cited as the current version. Cause: the version is not synchronized, the old version is traceable but not marked, and the citation does not point back to the signature column.

## How to verify the setup

Acceptance of this function: ask a question with original text support and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of citations and the tokens of the citation text, and do not compare the number of items with `quoteMaxToken` for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
