---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Versions
meta_description: Training Admissions: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Maintain Document Versions and Changes

## What this category's data looks like

This category's data involves three types of materials: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures carry the course name, number of class hours, start date, and refund terms, and are usually finalized by academic affairs before entering the knowledge base; consultation records come from communication between consultants and students, contain the intended course, contact information, and follow-up date, and require a signature or receipt confirmation; trial class schedules record the time, classroom, instructor, and check-in status. The three types of materials have different update rhythms: brochures are revised by semester, consultation records are added one by one, and trial class schedules are adjusted weekly. Field characteristics center on four items: name, quantity, date, and signature, and the same record not matching across two materials is a common problem. When entering the knowledge base retrieval node, the brochure serves as the authoritative source, consultation records serve as process evidence, and trial class schedules serve as the scheduling basis, each being cited as an original text fragment.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, number of class hours, start date, and refund terms are consistent with the current version, and whether the signature field is complete | Retrieve the original brochure text, check the fields and dates item by item, confirm that the signature or receipt exists, and record the version number |
| Consultation record | Whether the intended course name, follow-up date, and consultant signature match the brochure and trial class schedule | Extract one consultation record, compare the name, quantity, and date with the brochure and trial class schedule, and check the signature |
| Trial class schedule | Whether the trial time, classroom, instructor, and check-in status connect with the brochure start date, and whether changes leave a trace | Check the trial schedule against the brochure date, review the change records, and confirm that the old version is traceable and citations are synchronized |
| Knowledge base retrieval node | The cited content is output as an array, the length can be 0, and each item can point back to the original paragraph | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, use `quoteList` to expand the source identifier, and check the `quoteMaxToken` budget |

## Three common errors

- Phenomenon: the same course name is written differently in the brochure and consultation record, and the quantity and date also do not match. Cause: the two materials are maintained separately, and fields were not unified according to the current version before entering the knowledge base.
- Phenomenon: after the brochure is revised, the old version is still cited, and an expired start date appears in the answer. Cause: the version was not synchronized, the old version was not marked as traceable, and citations were not refreshed with the update.
- Phenomenon: consultation records lack a signature or receipt, and trial class schedules have no check-in status. Cause: process evidence was not fully collected, fields were incomplete when the materials entered the knowledge base, and cited fragments cannot point back for confirmation.

## How to verify the setup

Acceptance of this feature: ask a question with an original text basis, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues; then open the citation footnote markers and compare them with the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
