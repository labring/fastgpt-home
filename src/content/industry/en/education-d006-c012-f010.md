---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Track Progress and Check Statistics
slug: /en/industry/education-d006-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Progress
meta_description: Teaching Reviews: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on materials for district and county teaching research activities and classroom observation and evaluation, including three types: teaching research activity notices, classroom observation records, and classroom evaluation minutes. Notices provide the activity name, date, location, and participants; classroom observation records carry the fields, time, and signatures of classroom observation; classroom evaluation minutes record the key points of discussion, conclusions, and acknowledgments. The three types of materials enter the knowledge base retrieval node weekly or monthly, each with a different role: notices serve as the basis for whether an activity was carried out, classroom observation records serve as process traces, and classroom evaluation minutes serve as the source of conclusions and signatures. The update cadence is weekly or monthly, and common fields include activity name, date, quantity, signature, and acknowledgment. The same record may have mismatched names, quantities, or dates across different materials, versions may be out of sync, or signatures or acknowledgments may be missing. Therefore, after entering the retrieval node, they are cited in the form of original text fragments and source identifiers, for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The progress table and statistical scope description must be handled next by a subsequent AI node, code node, or manually. The cited content is output as an array, and the length can be 0. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the fields, date, and signature are consistent with the classroom observation records and classroom evaluation minutes | Check the activity name, date, and quantity in the notice against the classroom observation records and classroom evaluation minutes item by item to see whether signatures or acknowledgments are missing, and record the number of citations |
| Classroom observation record | Whether the name, quantity, and date of the same record match in the notice and classroom evaluation minutes | Open the citation marker to trace back to the original paragraph, verify the fields and date, check whether the versions are in sync, and confirm that the citation array is consistent with the matched materials |
| Classroom evaluation minutes | Whether the signatures and acknowledgments are complete, and whether the scope is written in the header | Compare the signatures and acknowledgments in the classroom evaluation minutes, check whether the statistical scope is written in the header, use one week of records to verify the totals, and see whether exceptions are clearly stated |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials to see whether the output is empty while the chain continues; when the citation limit is involved, check the tokens of the cited text, record the number of array items separately, `quoteMaxToken` is the citation content budget, and `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are used to view the output structure |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the notice and the classroom observation record. Cause: The two materials are filled in separately and not checked against the same scope. After entering the citation array, the source identifiers differ, so it is necessary to trace back to the original text and compare item by item.
- Phenomenon: The version of the classroom evaluation minutes is not in sync, and both the old and new versions are cited at the same time. Cause: The update cadence is inconsistent, and the version is not marked when the material enters the knowledge base retrieval node. The cited fragment does not match the original text, so it is necessary to first check which material was matched in this round.
- Phenomenon: The classroom observation record or classroom evaluation minutes lack signatures or acknowledgments, and the statistical totals do not match the number of records. Cause: Signatures and acknowledgments were not archived in sync with the materials, and the scope and exceptions were not written in the header, so it is impossible to determine which records should be included in the totals during verification.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base selected is a knowledge base with the same vector model, and record the number of citations and the tokens of the cited text; do not compare the two for equality.
- Open the citation markers in the conversation, compare them with the source documents, check whether the cited fragments correspond to the original text, confirm the output structure in `quoteList` within `responseData`, and treat an empty citation array as normal output.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
