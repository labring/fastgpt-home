---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Versions
meta_description: Exam Administration: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Maintain Document Versions and Changes

## What this category's data looks like

This category's data falls into three types: exam handbooks, examination room record sheets, and disciplinary fact records. The exam handbook defines procedures, authority, and document formats, and is the source of version changes; the examination room record sheet carries the time, examination room, candidate, and invigilator signatures, and is the process evidence; the disciplinary fact record carries the behavior description, evidence list, party, and witness signatures, and is the basis for handling. When the three enter the knowledge base retrieval node, the exam handbook is often used as a rule citation, while the examination room record sheet and the disciplinary fact record are used as fact citations, each with its own source identifier. In terms of update cadence, the handbook is re-versioned as regulations are revised, while record sheets are generated per session and archived with the receipt; field characteristics concentrate on four types: name, quantity, date, and signature. When the same record does not match across two materials, the cited snippet and source identifier are the starting point for comparison.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The version ledger and change records must be handled subsequently by AI nodes, code nodes, or manual work. The citation array is only responsible for presenting the matched original text and source; it is not responsible for determining which material is newer or which material is missing a signature.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam handbook | Whether the version number, effective date, revised clauses, and signature field are complete | In the node, check the selected collection and vector model, open the citation marker to trace back to the handbook paragraph, and record the version number and effective date |
| Examination room record sheet | Whether the examination room name, candidate count, date, invigilator signature, and receipt are consistent | Run a trial with one question and see whether the name, quantity, and date in the snippet returned by the citation array can be matched item by item against the original record sheet |
| Disciplinary fact record | Whether the behavior description, evidence count, date, party signature, and witness signature are complete | Check the cited snippet against the source document; if a signature or receipt is missing, return to the original to supplement it, then rerun retrieval |
| Cited content output | The number of returned entries matches the matched materials; being empty is also normal | Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length |

## Three common errors

- Symptom: The name, quantity, and date of the same disciplinary record do not match between the examination room record sheet and the disciplinary fact record. Cause: The two materials were entered separately, without field comparison based on the same version.
- Symptom: The exam handbook has already been re-versioned, but the knowledge base still returns clauses from the old version. Cause: The version was not synchronized; the old version is traceable but not marked as the current version, and the cited snippet points to the old paragraph.
- Symptom: The cited snippet does not match the original text, or the answer has content while the citation array is empty. Cause: First check whether this round matched and which material was matched, then look at trimming; an empty array is a normal output.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citation update in sync; check the tokens of the cited text against the `quoteMaxToken` budget, record the array entry count separately, and do not compare the two for equality; when necessary, inspect `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- In the node, check the selected knowledge bases and their vector models, open the search parameter panel, and check the values item by item
- Run a trial with a question that has no matching materials, confirm that the output is empty while the chain continues, and record the array length

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
