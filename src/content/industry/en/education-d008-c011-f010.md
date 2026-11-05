---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Access
meta_description: School Exams: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

Exam question setting and grading materials for primary and secondary schools include the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table records knowledge points, question types, scores, difficulty, and the question setter's signature; the exam paper contains question numbers, question stems, options, answers, and the exam date; the grading rubric contains scoring points, score bands, the grader's signature, and the receipt. When these three types of materials enter authorized access and external services, the specification table serves as the basis for question setting and determines the exam paper structure, the exam paper serves as the answer carrier and determines the grading rubric entries, and the grading rubric serves as the scoring basis and refers back to the exam paper question numbers. Materials are updated by exam batch, and versions within the same batch must be synchronized. Field characteristics fall into four categories: name, quantity, date, and signature. Common mismatches are concentrated in the name, quantity, and date of the same record across two materials, as well as unsynchronized versions and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The externally available entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields include knowledge points, question types, scores, difficulty, the question setter's signature, and date, and match the exam paper's question numbers, scores, and exam date | In the node, verify the selected collection and its vector model, then open the citation markers and compare them against the original specification table paragraphs |
| Exam paper | Fields include question numbers, question stems, answers, exam date, and the question setter's signature, and match the grading rubric entries, score bands, and grader's signature | Run a test with a question that has no matching materials, check that the citation array is empty while the chain continues, then verify the search parameters item by item |
| Grading rubric | Fields include scoring points, score bands, the grader's signature, and the receipt, and match the exam paper's question numbers, scores, and exam date | Open the search parameter panel and verify item by item, and record the tokens of the cited text and the number of array entries |

## Three common errors

- Symptom: the score for the same question does not match between the specification table and the exam paper. Cause: the two materials were updated separately, versions were not synchronized, and the question setter's signature or receipt is missing.
- Symptom: the grading rubric has more entries than the exam paper has question numbers. Cause: the quantity of the same record does not match across the two materials, and the update cadence is not synchronized.
- Symptom: there are no citation markers in the answer. Cause: no materials were hit in this round, or the materials hit do not match the question, so the hit entries must be checked first before looking at trimming.

## How to verify the setup

This feature's acceptance check: ask a question that has original text support, and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. When verifying, record the number of citations and the tokens of the cited text; `quoteMaxToken` is only a content budget, and the number of array entries is recorded separately, with no equality comparison between the two.

Business test: access once with a restricted identity, check whether the visible scope matches the setting and that unauthorized content is not visible; at the same time, verify whether the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields are consistent with the setting.

- Open the citation markers, compare against the source documents, and verify item by item whether the cited fragments match the original paragraphs.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
