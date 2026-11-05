---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics
slug: /en/industry/education-d006-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Progress
meta_description: Research Misconduct: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics

## What this category's data looks like

This category covers the investigation and handling of academic misconduct reports. The materials include report materials, investigation reports, and expert appraisal opinions, all three of which contain fields, dates, and signatures. Report materials provide the source of leads and the claims; investigation reports carry the verification process and conclusions; expert appraisal opinions supplement professional judgment. When entering the knowledge base retrieval node, the three types of materials are retrieved in the form of original paragraphs, and their respective roles are: report materials correspond to lead entries, investigation reports correspond to verification records, and expert appraisal opinions correspond to appraisal entries. The update cadence is weekly or monthly aggregation; weekly reports are used for progress records, and monthly reports are used for statistical verification. The field characteristics require that the name, quantity, and date of the same record be consistent across the three materials, that versions be synchronized, and that signatures or receipts be complete. When citing sources and tracing them, it is necessary to point back to the original paragraphs; the number of citations is recorded separately, and the tokens of the cited text are checked separately against the budget.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed next by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields, dates, and signatures are complete; the name of the same record is consistent with the investigation report | Open the citation superscript, compare against the original paragraphs of the report materials, check the fields, dates, and signatures, and record the number of citations |
| Investigation report | Fields, dates, and signatures are complete; the quantity matches the expert appraisal opinions | Open the citation superscript in the conversation, point back to the original text of the investigation report, check the quantity and dates, and check whether the versions are synchronized |
| Expert appraisal opinions | Fields, dates, and signatures are complete; the name is consistent with the report materials | Compare against the original paragraphs of the expert appraisal opinions, check the name and signature receipt, and check whether the cited fragments match the original text |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; the cited content is output as an array, and the length may be 0 | Check the selected collection and vector model, run a test with a question that has no matching materials, see that the array is empty while the pipeline runs through, and check `quoteMaxToken` and `responseData` (non-streaming module results returned with detailed output enabled), `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials were entered separately and the fields were not checked against the same scope.
- Symptom: The versions of the investigation report and the expert appraisal opinions are not synchronized, and the cited fragments do not match the original text. Cause: After the materials were updated, they were not synchronized to the knowledge base, and retrieval still hit the old paragraphs.
- Symptom: The report materials or expert appraisal opinions lack signatures or receipts. Cause: During aggregation, only the body text was collected, and the signature page and receipt were not checked, resulting in incomplete fields.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check `quoteMaxToken`, `responseData`, `quoteList`.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly written, whether the number of records matches the statistical count, and whether the scope is written in the header.

- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and record the number of citations and the tokens of the cited text.
- Open the citation superscript in the conversation, compare against the source documents, check whether each citation can point back to the original paragraph, and check the fields, dates, and signatures.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
