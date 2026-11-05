---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics
slug: /en/industry/education-d006-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Progress
meta_description: Training Admissions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials: enrollment brochures, consultation records, and trial class arrangements. Enrollment brochures provide course names, class types, start dates, and fee criteria, and serve as the baseline source for the progress table and the statistical criteria description; consultation records carry intention levels, follow-up dates, communication results, and signed receipts, and are the main basis for progress records; trial class arrangements record trial times, instructors, attendance, and confirmation signatures, and are used to verify conversion milestones. When the three types of materials enter the knowledge base retrieval node, each acts as an independent source, providing its own original text snippets and source identifiers. In terms of update cadence, brochures are updated by batch, consultation records accumulate daily, and trial arrangements are scheduled weekly; when versions are not synchronized, the names, quantities, and dates of the same record easily fail to match. Field characteristics cluster around three types: dates, quantities, and signatures; a missing signature or receipt prevents a record from entering the statistical criteria.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "progress table and statistical criteria description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the class type name, start date, fee criteria, and brochure version number are consistent with the consultation records, and whether the signature fields are complete | Retrieve the original brochure snippet and source identifier, and compare field by field against the names and dates in the consultation records |
| Consultation record | Whether the intention level, follow-up date, communication result, and receipt signature are complete, and whether the quantities of the same record match across the two materials | Open the citation marker in the conversation to trace back to the original paragraph, and verify the number of citation items against the number of matched material items |
| Trial class arrangement | Whether the trial time, instructor, attendance, and confirmation signature are consistent with the consultation records and brochure dates | Use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and record the array length |
| Cited content output | The number of returned items matches the matched materials; empty is also normal, and the cited snippets can trace back to the original text | Run a test with a question that has no matching materials, check that the output is empty while the pipeline continues, and verify `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the name, quantity, and date of the same student do not match between the consultation records and the trial class arrangements. Cause: the two materials are updated separately and versions are not synchronized by the same batch, and the field criteria are not written into the table header.
- Symptom: the cited snippets do not match the original text, and there is no citation marker in the answer. Cause: first check whether this round hit a match and which material was matched, then look at trimming, and do not directly attribute it to length trimming.
- Symptom: the statistical totals do not match the record counts, and signatures or receipts are missing. Cause: exceptions are not clearly stated in the table header, records without signatures are included or omitted, and the criteria are not synchronized with the version.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline completes. The number of citation items is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When a citation limit is involved, verify the tokens of the cited text, and record the array item count separately.

Business test: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and verify the citation output in `quoteList` within `responseData`.

- In the node, verify the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and verify each item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
