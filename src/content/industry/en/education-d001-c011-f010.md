---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Evidence
meta_description: School Exams: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The two-way specification table carries the distribution of assessment points, the proportion of question types, cognitive levels, and the question setter's signature date; the exam paper carries the question text, scores, exam time, and the signatures for question setting and question review; the grading rubric carries answer key points, step-by-step scoring, grading notes, and the review receipt. Materials are updated by semester or exam session, and for the same exam session a revised version and the current version may coexist. When the three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and the citation output is returned according to the matched material fragments, for subsequent use in comparing fields, writing ledgers, and generating reports. Cross-material basis questions often involve the correspondence of the same assessment point name, the number of question numbers, and the exam date across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The "basis entries that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields include assessment point name, question type, score, cognitive level, question setter and date; the version must be the current version; signatures are complete | Open the specification table and check the fields and signatures item by item, and confirm that the version date is consistent with the current exam session |
| Exam paper | Fields include question number, question stem, score, exam time, question-setting and question-review signatures; the quantity corresponds to the specification table | Check the question numbers and score quantities against the specification table, and check whether the exam paper signatures and dates are complete |
| Grading rubric | Fields include answer key points, step-by-step scoring, grading notes, review signature or receipt; corresponds to the exam paper question numbers | Check the rubric against the exam paper question numbers and scores item by question, and confirm that the review signature or receipt exists |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal; each entry can be traced back to the original text paragraph | Ask a cross-material basis question and check the number of citation entries and the superscript trace-back; then ask a question with no matching material and see that the array is empty while the chain still runs through |

## Three common errors

- Symptom: the name or quantity of the same assessment point does not match between the specification table and the exam paper. Cause: the revisions of the two materials are not synchronized, or the fields were not unified according to the current version during entry.
- Symptom: the question numbers and scores in the grading rubric do not match those in the exam paper. Cause: after the exam paper was revised, the rubric was not updated in sync, and the versions were not synchronized, causing entries to be misaligned.
- Symptom: the specification table or grading rubric lacks signatures or lacks receipts. Cause: the review process was not completed before archiving, and the materials lack approval fields when entering retrieval.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis and check whether the citation array and superscript can be traced back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain still runs through. When a citation limit is involved, check the tokens of the cited text; the number of array entries is recorded separately, the number of citation entries is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; you can view the citation fragments and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the source belongs to the institution’s materials, that the version is the current version, and that the entries match the original text.

- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and run a trial with a question that has no matching material to see that the output is empty while the chain continues.
- Open the citation superscript in the conversation, check against the source documents whether each citation can be traced back to the original text paragraph, and record the number of array entries and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
