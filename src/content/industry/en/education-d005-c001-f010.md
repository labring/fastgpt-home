---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Versions
meta_description: Kindergarten Care: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers three core types of materials: daily life schedules, morning and afternoon check records, and child health observation records. The daily life schedule defines routine and activity time points, the morning and afternoon check records register temperature and abnormalities day by day, and the health observation records track individual cases and require a parent-signed receipt. These materials are filled in daily by class teachers and health care staff, and after review by the grade group and the health room they enter the knowledge base or external documents. Field characteristics include: date, time period, child name, observation item, handling opinion, signature field. The same record often shows inconsistencies in name, quantity, and date across different materials, and versions not being synchronized or receipts being missing can also occur. When the three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source; the schedule provides the time framework, the morning and afternoon check records provide the current day's status, and the observation records provide the case chain, distinguished by source identifier when cited.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The "version ledger and change record" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include date, time period, activity name, and signature field, and the date and time period match those in the morning and afternoon check records | Open the citation marker, check the date and time period fields against the source document, and record the array length |
| Morning and afternoon check records | Fields include child name, temperature, abnormality description, and health care staff signature, and the name and date are consistent with those in the health observation records | Search using the same child name, and check whether the name and date in the cited fragment point back to the original paragraph |
| Child health observation records | Fields include observation item, handling opinion, parent receipt, and signature, and the old version is traceable while the current version is unique | Change the content of one observation item, see whether the version number and citation update synchronously, and check the source identifier in `quoteList` |
| Cited content output | The number of returned entries matches the materials hit; being empty is also normal, and `quoteMaxToken` only constrains the citation text budget | Run a test with a question that matches no materials, see that the array is empty while the chain continues, and record the array entry count separately |

## Three common errors

- Symptom: the date of the same record does not match between the schedule and the morning and afternoon check records. Cause: the two materials are maintained separately, versions are not synchronized, and the source identifier is not checked when citing.
- Symptom: the health observation record lacks a parent signature or receipt, and the old version is still retrieved. Cause: the change record does not mark the current version, the old version is not taken down, and citation synchronization lags.
- Symptom: the answer has content but the citation array is empty, or the cited fragment does not match the original text. Cause: not first checking whether this round hit anything and which materials were hit, and directly attributing it to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain runs through.

Business test: change one piece of content, and see whether the version number and citation update synchronously.

- In the node, check whether the selected knowledge base collections and their vector models are the same, open the search parameter panel and check the `quoteMaxToken` value item by item.
- In the conversation, open the citation marker, check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` against the source document, record the array entry count, and check the tokens of the citation text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
