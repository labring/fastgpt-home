---
title: Citations and Source Traceability for International Student Admissions and Enrollment Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c049-f010
page_type: 行业问题页
application_area: education
meta_title: International Students | Citations | Intake
meta_description: International Students: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for International Student Admissions and Enrollment Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the international student admissions and enrollment management category. Materials include admissions brochures, admission letters, and visa application forms. The admissions brochure provides the program, duration of study, application requirements, and deadlines, and is the starting point for eligibility assessment; the admission letter carries the name, student ID, program, registration date, and signature, and is the basis for establishing enrollment status; the visa application form records the passport number, entry date, signature, and receipt, and is the credential linking entry and registration. Materials enter in batches by admissions batch, admission round, and visa progress, and the update cadence is synchronized with the batches. Field characteristics center on name spelling, quantities, dates, and signatures. The same record may have mismatched names, quantities, or dates across different materials, with versions not synchronized or missing signatures or receipts. When entering Q&A intake and missing-item follow-up, the three types of materials each serve as retrieval sources, providing original text snippets and source identifiers for answers.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The intake record and the completed follow-up questions are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Admissions brochure | Whether fields, dates, and signatures are consistent with the admission letter | In the node, check the selected collection and vector model, open the citation superscript, and compare against the original paragraphs of the brochure |
| Admission letter | Whether the name, student ID, program, registration date, and signature are complete | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues |
| Visa application form | Whether the passport number, entry date, signature, and receipt match the admission letter | Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately |
| Q&A intake and missing-item follow-up | Whether missing items are identified and followed up, and whether answers are grounded in materials | Ask a question that lacks key information, see whether it follows up before answering, and record `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the brochure and the admission letter. Cause: The two batches of materials were entered separately and fields were not compared against the same record.
- Symptom: The visa application form version is not synchronized, and the old version is still retrieved. Cause: The update cadence is out of step with the batches, and the old version was not withdrawn from the knowledge base.
- Symptom: The answer has content but the citation array is empty, or the cited snippet does not match the original text. Cause: No materials were matched in this round, or the superscript does not point back to the original paragraph.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and record `quoteMaxToken` and the number of citations, without comparing the two for equality.

Business test: ask a question that lacks key information, and see whether it follows up before answering.

- In the node, check the selected collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
