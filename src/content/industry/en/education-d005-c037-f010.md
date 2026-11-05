---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Versions
meta_description: Training Subsidies: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Maintain Document Versions and Changes

## What this category's data looks like

The materials for vocational training subsidy applications mainly consist of training class filing records, attendance records, and completion assessment forms, which together form the application chain. The class filing record states the institution, type of work, number of people, and start and end dates; the attendance record is signed person by person on a daily basis, reflecting actual attendance; the completion assessment form gives scores and assessment conclusions, and requires the assessor's signature. When the materials enter the knowledge base retrieval node, each is associated as an independent source, and after a hit is returned as a cited snippet for subsequent field comparison. Common fields include name, ID number, number of people, date, signature, and receipt. The update rhythm is affected by policy wording, class adjustments, and supplementary entries. The name, quantity, and date of the same record in two materials are easily mismatched. If versions are not synchronized or signatures or receipts are missing, contradictions will appear between cited snippets.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "version ledger and change record" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | The institution name, type of work, number of people, start and end dates, and filing signature are consistent across versions, and the old version is traceable | In the node, check the selected collection and vector model, open the citation marker to compare with the original filing text, and record the array length and the `quoteMaxToken` budget |
| Attendance record | Daily names, dates, signatures, and receipts are complete, and the name, quantity, and date of the same record in two materials can be matched | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then trace each item back to the original attendance paragraph |
| Completion assessment form | Scores, assessment conclusions, assessor signature, and date are consistent, and the version number and citations are updated in sync | Open the search parameter panel and check the values item by item; after changing one piece of content, see whether the cited snippet changes with the version |
| Citation output chain | The number of returned items matches the hit materials, and being empty is also normal | Check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and confirm that each citation can be traced back to the original text |

## Three common errors

- Phenomenon: the name and number of people for the same record in the class filing record and attendance record do not match. Cause: the two materials are maintained separately, versions are not synchronized, and the cited snippets point to different versions respectively.
- Phenomenon: the completion assessment form lacks the assessor's signature or receipt. Cause: during supplementary entry, only the main text was changed and the signature field was not added; although the cited snippet can be traced back, the fields are incomplete.
- Phenomenon: the answer has content but the citation array is empty, or the cited snippet does not match the original text. Cause: no materials were hit in this round, or the trimming was checked before the hit, reversing the attribution order.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of items in the citation array, and check the tokens of the citation text separately, without making an equality comparison with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
