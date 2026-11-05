---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Access
meta_description: Exam Administration: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Manage Authorized Access and External Services

## What this category's data looks like

Exam organization and violation handling rely on three types of materials: the exam administration manual specifies procedures and permissions, the examination room record sheet records on-site circumstances, and the violation fact record carries the candidate's confirmation and signature. The materials come from the exam administration team, the invigilation team, and the review post, and are updated by session or batch, with versions synchronized along process nodes. Fields cover candidate name, admission ticket number, examination room number, subject, time, violation circumstances, quantity, date, signature, and receipt. When entering the knowledge base retrieval node, the exam administration manual serves as the rule source, the examination room record sheet serves as the process source, and the violation fact record serves as the fact source; together the three support the visibility scope and citation traceability of the external entry point.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length may be 0. The external-facing entry points and authorization scope are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Check whether the date, version number, and signature field of the procedure clauses are consistent with the current batch | Open the citation marker, compare it against the original paragraph in the manual, and verify the source identifier in `quoteList` |
| Examination room record sheet | Check whether the candidate name, admission ticket number, examination room number, subject, and quantity align item by item with the violation fact record | Access once with a restricted identity and see whether the visible scope covers only the materials of this session |
| Violation fact record | Check whether the violation circumstances, date, signature, and receipt are complete and consistent with the same record name in the examination room record sheet | Open the citation marker in the conversation, compare it against the source document, and record the number of array items and the `quoteMaxToken` budget |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and verify `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the examination room record sheet and the violation fact record. Cause: The two materials are entered separately, and no field-level comparison was performed.
- Symptom: The version of the exam administration manual is not synchronized, and the old procedure is still cited. Cause: The knowledge base was not updated with the batch, and the cited source identifier points to the old paragraph.
- Symptom: The violation fact record lacks a signature or receipt, but the external entry point is still visible. Cause: The authorization scope was not narrowed according to material completeness, and unauthorized invisibility was not implemented.

## How to verify the setup

Acceptance of this feature: ask a question with original text support and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and record the number of citations and the `quoteMaxToken` budget separately.

- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.
- In the node, check the selected collections and their vector models, confirming that the selected knowledge bases use the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
