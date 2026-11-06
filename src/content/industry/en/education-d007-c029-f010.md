---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Review
meta_description: Vocational Curricula: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of formulating talent cultivation plans for vocational colleges, involving three types of materials: talent cultivation plans, curriculum standards, and job competency analysis tables, as well as the output of anomaly lists and review conclusions. Talent cultivation plans carry the program name, program length, cultivation objectives, and curriculum system; curriculum standards carry the course name, credits, class hours, and assessment methods; job competency analysis tables carry job titles, competency items, and corresponding courses. The three types of materials are usually updated by academic year or program development cycle, and fields are cross-referenced frequently: the same course name, credit count, and signature date must be consistent between the plan and the standard, and competency items must correspond to courses. After the materials enter the knowledge base retrieval node, each participates in retrieval as a citation source, and hit snippets are returned as a citation content array for subsequent nodes to compare fields and form an anomaly ledger.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a citation content array, each entry containing the original text snippet and source identifier, and its length can be 0. The anomaly list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself does not perform difference determination or signature confirmation.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | The program name, program length, course name, credit count, and signature date must be consistent with the curriculum standards and job competency analysis table; the version number and effective date must be synchronized | In the citation snippets, compare the name, count, and date of the same course in the two materials, and check whether the signature field and receipt are complete; check whether the citation source identifier in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original text paragraph |
| Curriculum standard | The course name, credits, class hours, and assessment method are consistent with the corresponding records in the talent cultivation plan; when the version is not synchronized, differences must be marked | Open the citation markers one by one and verify the fields against the source document; use `quoteList` to view the correspondence between the citation snippet and the original text, and record inconsistent items |
| Job competency analysis table | The job title, competency items, and corresponding courses must be consistent with the curriculum system in the talent cultivation plan; dates and signatures must be complete | Verify the mapping between competency items and courses, and check for missing signatures or receipts; note that `quoteMaxToken` serves as the citation content budget, the tokens of the citation text are checked separately, and the number of array entries is recorded separately |

## Three common errors

- Phenomenon: The name, credit count, or date of the same course do not match between the talent cultivation plan and the curriculum standard. Cause: The two materials were updated separately without cross-checking, and the citation snippets only reflect their respective original texts.
- Phenomenon: The curriculum standard version is not synchronized, and old class hours are still hit by retrieval. Cause: The old version of the document in the knowledge base has not been removed, so both old and new snippets are hit during retrieval, and the citation source identifiers point to different versions.
- Phenomenon: The job competency analysis table lacks a signature or receipt, and the anomaly record cannot be traced back to the original record. Cause: The signature page was not completed when the material was archived, the signature field in the citation snippet is empty, and the reviewer cannot confirm by signature based on it.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, check whether the citation content array and citation markers can point back to the original text paragraph, and confirm that the source identifier in `responseData` is consistent with the document; then ask a question with no matching material, and confirm that the array is empty while the output pipeline runs through.

Business test: create an anomaly record, see whether it can be traced to the source material, verify that the anomaly is supported by the original record and the reviewer's signature, and then hand it over to the person in charge for handling.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching material, and see whether the output is empty while the pipeline continues; then compare the citation snippets with the source document to check whether they correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
