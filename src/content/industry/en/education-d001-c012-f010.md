---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Find Supporting Evidence
slug: /en/industry/education-d001-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Evidence
meta_description: Teaching Reviews: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Find Supporting Evidence

## What this category's data looks like

In the district and county teaching and research activity and classroom observation and evaluation scenario, common materials include teaching and research activity notices, classroom observation records, and classroom evaluation minutes, which together constitute the business basis. A notice usually contains the activity theme, time, location, participants, and signature/seal; a classroom observation record contains the instructor, class, subject, observation dimensions, date, and observer signature; classroom evaluation minutes contain review points, improvement suggestions, host signature, and receipt. Materials are mostly updated by semester or month, and the current signed/sealed version prevails. When entering the knowledge base retrieval node, the notice is used to confirm the activity arrangement and participant scope, the classroom observation record is used to reconstruct classroom facts and observation fields, and the classroom evaluation minutes are used to support review conclusions and rectification direction. The three have different roles, yet it often happens that the same record's name, quantity, and date do not match, or versions are not synchronized, or signatures and receipts are missing, causing basis entries to be unable to point back to the original text.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. Basis entries that can point back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching and research activity notice | Fields include activity theme, time, location, participants, and signature/seal; the date and signature must be consistent with the current version | Open the original notice, check the theme, date, participants, and signature/seal, and confirm that it can be matched to the same activity as the classroom observation record and classroom evaluation minutes |
| Classroom observation record | Fields include instructor, class, subject, observation dimensions, date, and observer signature; the same record's name, quantity, and date in two materials must be consistent | Compare against the notice and classroom evaluation minutes, check the instructor, class, date, and signature item by item, and record the location of discrepancies when inconsistencies are found |
| Classroom evaluation minutes | Fields include review points, improvement suggestions, host signature, and receipt; the version must be current, and missing signature or receipt is regarded as incomplete | Open the original minutes, check the signature and receipt, and confirm that the review points can point back to the observation dimensions in the classroom observation record |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal; the number of cited items is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality | Run a trial with a question that has no matching materials, and see whether the output is empty while the pipeline continues; then ask a question with original-text basis, and check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` can point back to the original text |

## Three common errors

- Phenomenon: the same classroom observation record's name, quantity, and date do not match between the notice and the classroom evaluation minutes. Cause: multiple materials are maintained separately, and unified checking is not based on the current signed/sealed version.
- Phenomenon: the classroom evaluation minutes version is not synchronized, and old review points are treated as the current basis. Cause: update rhythms are inconsistent, and versions and effective dates are not marked.
- Phenomenon: the notice lacks a signature or the classroom evaluation minutes lack a receipt, and basis entries cannot point back to the original text. Cause: signatures and receipts are not checked as completeness requirements when materials are archived.

## How to verify the setup

This feature's acceptance: ask a question with original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a basis question across materials, and see whether the answer gives traceable sources.

- Turn on citation superscripts, compare against the source documents, and check item by item whether the cited fragments are consistent with the original paragraphs.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the output pipeline continues, and separately record the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
