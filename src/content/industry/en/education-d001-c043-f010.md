---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence
slug: /en/industry/education-d001-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Evidence
meta_description: Training Admissions: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, materials mainly come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, start dates, fee calibers, and seal information; consultation records carry parents' demands, communication times, receptionists, and receipt status; trial class schedules record trial times, teachers, classrooms, and confirmation signatures. These materials update at different rhythms: brochures are revised by enrollment season, consultation records are appended with each communication, and trial schedules are adjusted by weekly scheduling. When entering the knowledge base retrieval node, the three categories of materials each serve as citable sources: brochures are used to verify course and date calibers, consultation records are used to verify communication facts and signatures, and trial schedules are used to verify scheduling and confirmation receipts. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. When comparing across materials, it is easy to encounter the same record written with different names, inconsistent quantities, mismatched dates, unsynchronized versions, or missing signature receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The evidence entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, start date, fee caliber, and seal match the consultation records and trial schedules | Open the citation superscript, compare against the original brochure paragraph, and record the name, date, and signature fields; check whether the number of entries in the citation array matches the hit materials |
| Consultation record | Whether the communication time, receptionist, parents' demands, and receipt signature are consistent with the brochure version and trial schedule | View `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` in the conversation, trace each entry back to the original consultation record, and record the date and signature status |
| Trial class schedule | Whether the trial time, teacher, classroom, and confirmation signature match the brochure and consultation records | Run a test question with no matching materials to confirm the citation array is empty while the chain continues; then compare against the original trial schedule to verify the fields |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Record the number of array entries, separately check the tokens of the citation text, and do not perform an equality comparison; open the search parameter panel and check each item |

## Three common errors

- Symptom: the name, quantity, and date of the same course do not match between the brochure and the consultation record. Cause: the two materials are filled in by different stages, and no cross-material field comparison was performed.
- Symptom: the trial schedule has been adjusted, but the brochure is still the old version. Cause: versions are not synchronized, update rhythms differ, and the old version is still hit by retrieval.
- Symptom: the consultation record or trial schedule lacks a signature or receipt. Cause: the process was archived before completion, and the cited snippet cannot be traced back to the complete original text.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials and confirm the array is empty while the chain runs through.

Business test: ask a cross-material evidence question and see whether the answer provides a traceable source.

- Open the search parameter panel, check each value item by item to be consistent with the knowledge base retrieval section, and confirm that the selected knowledge base uses the same vector model.
- Open the citation superscript in the conversation, trace each entry back to the original text against the source document, record the number of array entries, and separately check the tokens of the citation text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
