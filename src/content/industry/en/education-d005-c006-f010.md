---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Versions
meta_description: Kindergarten Quality: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on kindergarten operation behavior and quality self-assessment, addressing three types of materials—self-assessment reports, issue lists, and rectification plans—and examines cited sources and traceability issues in data version and change maintenance. Self-assessment reports carry overall judgments and conclusions, issue lists enumerate items to be improved one by one, and rectification plans correspond to measures, responsible persons, and deadlines; all three often contain name, quantity, date, and signature fields. When materials enter the knowledge base retrieval node, each is cited as an independent source, and original text fragments are returned in pairs with source identifiers. In terms of update cadence, report revisions, list additions and deletions, and plan adjustments all produce new versions, and old versions must be retained and traceable. The citation output is only responsible for providing hit fragments and sources; the version ledger and change records are completed by subsequent nodes or manually by comparing fields, writing ledgers, and generating reports based on them.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still completes. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the name, quantity, date, and signature fields in the report are consistent with the issue list | Open the citation superscript in the conversation, check the report paragraphs against the source document; check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Issue list | Whether the item names, quantities, and dates in the list match the rectification plan | Run a test with a question targeting a list item, check whether the cited fragment can point back to the original list text; record the array length, and do not compare it for equality with `quoteMaxToken` |
| Rectification plan | Whether the measures, responsible persons, deadlines, and signatures or receipts in the plan are complete | Open the search parameter panel and check the values item by item; for a question with no matching materials, confirm the array is empty while the chain continues |
| Associated knowledge base | The selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models, and confirm that source identifiers can distinguish different materials |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the self-assessment report and the issue list. Cause: The two materials were revised separately, the cited sources were not updated synchronously, and the old version is still hit by retrieval.
- Symptom: The rectification plan has been changed, but the cited fragment still points to the old version content. Cause: The version was not synchronized, the knowledge base was not replaced or the current version was not marked, and the old version is traceable but not distinguished.
- Symptom: The issue list lacks a signature or receipt, and the cited fragment cannot prove the process loop is closed. Cause: The signature field was not retained when the material entered the knowledge base, so traceability can only return to the main text and cannot see confirmation information.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain completes.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously.

- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and confirm that an empty array is normal output.
- Open the citation superscript in the conversation, and check each citation against the source document to see whether it can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
