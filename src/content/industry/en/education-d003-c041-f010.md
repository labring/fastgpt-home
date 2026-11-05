---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Intake
meta_description: Compliance Training: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses corporate compliance and safety training scenarios; the materials include three categories: compliance training courseware, safety operating procedures, and exam records. The courseware carries policy clauses and training points and is the main source of the basis for answers during Q&A intake; the procedures record operating steps and safety thresholds and are used to compare on-site execution with textual requirements; the exam records contain personnel, scores, dates, and signature fields and are the key evidence for determining whether training is closed-loop. Materials are usually updated monthly or by project batch, versions iterate frequently, and the name, quantity, and date of the same record may be inconsistent across different materials; missing signatures or acknowledgments are also common. When entering the Q&A intake and missing-item follow-up function, the courseware and procedures serve as citation sources for knowledge base retrieval, and the exam records serve as the object for field comparison and completing missing items. The system first accepts the question, identifies missing items and follows up, then answers based on the cited materials, and finally the intake record and the completed missing items are forwarded to the handler.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The "intake record and completed missing items" are subsequently completed by a downstream AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | Whether the courseware name, clause number, publication date, and signature confirmation fields are complete | In the node, check the selected knowledge base collection and vector model, open the citation marker to compare against the original courseware paragraphs, and record the number of citations and the `quoteMaxToken` budget |
| Safety operating procedures | Whether the procedure version number, number of operating steps, effective date, and acknowledgment signature match the ledger | Run a trial with a question that has no matching material to confirm the output is empty while the pipeline continues; then for a question with hits, check whether the cited fragments correspond one by one to the original procedure text |
| Exam records | Whether the personnel name, exam date, score, and signature or acknowledgment fields match the training roster | Open the search parameter panel and check the values item by item; check whether the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) matches the number of hit materials, and do not compare the count with `quoteMaxToken` for equality |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the citation output allows being empty | In the conversation, open the citation marker to trace back to the source document, check the original text fragment and source identifier in `quoteList`, and confirm that the pipeline still runs through when the array is empty |

## Three common errors

- Symptom: the name and date of the same training record do not match between the courseware and the exam records. Cause: the two materials were updated in different batches, no field-level comparison was performed, and missing items were not identified and followed up.
- Symptom: the safety operating procedure version is not synchronized, and the cited fragment points to an old version clause. Cause: the old version was not removed from the knowledge base, retrieval hit the old material, and the citation is inconsistent with the current requirements.
- Symptom: the exam record lacks a signature or acknowledgment, yet the answer directly gives a conclusion. Cause: missing-item follow-up was not triggered, and the system answered without first asking about the missing fields, so the material basis is incomplete.

## How to verify the setup

This function's acceptance: ask a question with textual basis and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material and confirm the array is empty while the pipeline runs through. At the same time, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: ask a question missing key information and see whether it follows up before answering; confirm that missing items are identified and followed up, the answer has a material basis, and the intake record and completed missing items are forwarded to the handler.

- In the knowledge base retrieval node, check the selected collection and vector model, open the search parameter panel and check the values item by item, and confirm they are consistent with the settings in the knowledge base retrieval section.
- Run a trial with a question that has no matching material to confirm the citation array is empty while the pipeline continues; then for a question with hits, open the citation marker and check against the source document whether the original text fragments in `quoteList` and `responseData` trace back accurately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
