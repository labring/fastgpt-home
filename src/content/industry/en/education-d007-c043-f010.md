---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Review
meta_description: Training Admissions: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Trace Exceptions and Review Results

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, the materials that enter the exception tracing and manual review function mainly fall into three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide the course name, class type, class hours, fee basis, and version date, and serve as the baseline material for comparing consultation commitments. Consultation records carry the communication time, consultant, intended course, key points of the reply, and receipt signature, and are the core evidence for determining whether the conversion process is traceable. Trial class schedules record the trial date, instructor, attendance list, and confirmation signature, and are used to check whether the name, quantity, and date of the same record are consistent between the brochure and the consultation record. Materials are updated in batches; after a brochure is revised, the old version may still be retrieved and matched, and consultation records and trial schedules often lack signatures or receipts. When materials enter this function, each serves as a citable original source, providing the raw basis for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output pipeline still completes. The exception list and review conclusions are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, class hours, fee basis, and version date are consistent with the consultation record | Open the citation marker to trace back to the original brochure paragraph, verify the fields, dates, and signatures, and record the number of citations |
| Consultation record | Whether the consultation time, intended course, key points of the reply, and receipt signature are complete and traceable | Check each cited snippet against the source document, and verify whether the name, quantity, and date of the same record match |
| Trial class schedule | Whether the trial date, instructor, attendance list, and confirmation signature are consistent with the brochure and consultation record | Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, then verify the citations for materials that do match |
| Knowledge base retrieval node | Whether the selected knowledge base uses the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameter panel and check each item, and view the citation array and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the same course name is written differently in the brochure and the consultation record. Cause: after the brochure is revised, the old version is still retrieved and matched, the version is not synchronized, and the field comparison baseline is inconsistent.
- Symptom: the trial attendance count does not match between the schedule and the consultation record. Cause: the two materials are updated at different paces, one side is supplemented while the other is not synchronized, and the quantity and date deviate.
- Symptom: the consultation record lacks a receipt signature, and the review conclusion has no original record to support it. Cause: the signature step is not closed-loop; although the cited snippet can trace back to the original paragraph, key fields are missing, making signature confirmation impossible.

## How to verify the setup

Acceptance of this function: ask a question that has original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline completes. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When the citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

Business test: create an exception record and see whether it can be traced back to the source material.

- In the conversation, open the citation markers, check each cited snippet against the source document for consistency with the original text, and record the array item count.
- Open the search parameter panel and check each value item by item, view the `quoteList` within `responseData` fields, and confirm that the citation array is consistent with the matched materials.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
