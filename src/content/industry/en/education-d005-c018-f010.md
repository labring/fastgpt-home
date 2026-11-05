---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Versions
meta_description: Program Revision: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Maintain Document Versions and Changes

## What this category's data looks like

The category materials involved in undergraduate program revision include program plans, course syllabi, and credit structure tables. The program plan provides the major direction, total credits, and study requirements; the course syllabus carries the course objectives, content, and assessment methods; the credit structure table lists the credits, class hours, and proportions of each module. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets carry source identifiers to facilitate referring back to the original paragraphs. The field characteristics are concentrated in course name, course code, credits, class hours, semester offered, revision date, and signature column. The update rhythm is usually triggered by academic year or training cycle, with revised drafts, review drafts, and final drafts coexisting, and signatures and receipts scattered in scanned copies or attachments. A common problem is that the name, quantity, or date of the same record does not match across two materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a difference list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, course code, credits, revision date, and signature column are consistent between the main text and attachments | Open the citation marker to refer back to the original paragraph and compare fields item by item; check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the matched materials |
| Course syllabus | Course objectives, credits and class hours, and assessment methods match the course of the same name in the program plan | Use the same course name to search the two materials separately, verify the name, quantity, and date in the cited snippets; record the number of array items, and do not compare the number of items with `quoteMaxToken` for equality |
| Credit structure table | The credits, class hours, and proportion totals of each module are consistent with the total credits in the program plan, and signatures or receipts are complete | Search the structure table and expand `quoteList` to view the snippets, verify the totals and dates; when there is no match, confirm that the array is empty while the pipeline runs through |
| Knowledge base retrieval node | The selected collection is a knowledge base with the same vector model, and the search parameters are consistent with the values in the knowledge base retrieval section | Check the selected collection and vector model in the node, open the search parameter panel and verify item by item; record the tokens of the cited text and the number of array items separately |

## Three common errors

- Symptom: The name, credits, or revision date of the same course does not match across two materials. Cause: The cited snippets each refer back to different versions of the original text, and without first checking which material was hit in this round, it is attributed to length truncation.
- Symptom: The program plan has been updated, but the course syllabus and credit structure table are still the old version, and the citation marker points to the old paragraph. Cause: Versions are not synchronized, the old version is not marked invalid, and retrieval hits both old and new materials.
- Symptom: The signature column or receipt is missing, and the cited snippet only captures the main text table. Cause: Scanned copies and attachments were not included in the knowledge base, the citation source identifier only covers the main text, and the signature page is not retrieved.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and check whether the citation array and markers can refer back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the number of array items.
- Open the citation markers in the conversation and verify the name, quantity, date, and signature column against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
