---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Review
meta_description: Continuing Education: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: course filing forms, study certificates, and credit-hour recognition forms. The course filing form records the course name, number, class hours, filing date, and handler signature, and is the starting point of the credit-hour source; the study certificate is issued by the teaching institution and contains the learner's name, course name, study start and end dates, completed credit hours, and the institution's receipt; the credit-hour recognition form is filled out by the employer or recognition institution and summarizes the course name, recognized credit hours, recognition date, and review signature. After these three types of materials enter the knowledge base retrieval node, each participates in hits as an independent citation source: the filing form supports the authenticity of the course, the study certificate supports the learning behavior, and the recognition form supports the final recognition conclusion. Materials are updated by batch, and it is common for versions to be out of sync, field definitions to differ, and signatures or receipts to be missing, causing the name, quantity, or date of the same record to fail to match across two materials. Exception tracing and manual review require pointing citation snippets back to specific material paragraphs, then comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text snippet and source identifier, and the length can be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number, class hours, filing date, and handler signature match the study certificate and credit-hour recognition form item by item | Check the course name and number in the citation snippets, compare the filing date and signature field, and use `quoteList` to view the original text of the hit snippet |
| Study certificate | Whether the learner's name, course name, study start and end dates, completed credit hours, and institution receipt match the filing form and recognition form | Open the citation marker to point back to the original paragraph, check the start and end dates and completed credit hours, and verify whether the receipt is complete |
| Credit-hour recognition form | Whether the recognized credit hours, recognition date, and review signature match the filing form and study certificate, and whether the versions are in sync | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array structure, compare the recognized credit hours and signature field one by one, and record the array length |
| Citation content output | The number of returned items matches the hit materials; being empty is also normal, and the output pipeline continues to work | Try a question with no matching materials to confirm the array is empty while the pipeline is not interrupted, record the number of items separately, and do not compare the number of items with `quoteMaxToken` for equality |

## Three common errors

- Symptom: the name, quantity, or date of the same course fails to match between the filing form and the study certificate. Cause: the two materials are filled in by different stages, field definitions are not unified, and after entering the retrieval node they each produce hits, so the discrepancy is exposed when the citation snippets are placed side by side.
- Symptom: the credit-hour recognition form has been updated, but the study certificate is still the old version, and the recognized credit hours do not match the completed credit hours. Cause: the versions are out of sync, the old material still participates in hits in the knowledge base, and the citation source identifier points to the old paragraph.
- Symptom: the study certificate lacks the institution receipt, the credit-hour recognition form lacks the review signature, and the exception record cannot be closed. Cause: the signature and receipt fields were not validated when the materials were archived, that field is empty in the citation snippet, and the reviewer cannot sign and confirm based on it.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm the array is empty while the pipeline works.

Business test: create an exception record and see whether the source material can be traced.

- Open the citation markers in the conversation, compare them against the source documents, check whether each citation can point back to the original paragraph, and record the number of items in the citation array.
- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and use `quoteList` and `responseData` to view the hit snippets and array structure.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
