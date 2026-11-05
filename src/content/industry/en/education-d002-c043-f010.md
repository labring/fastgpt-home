---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Checks
meta_description: Training Admissions: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, there are three common types of materials that enter the material verification and discrepancy localization stage: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures are usually versioned documents released externally, containing course names, class type counts, number of class hours, start dates, fee specifications, and signature fields; consultation records are ledger entries formed after consultants communicate with visitors, containing visitor names, intended courses, communication dates, follow-up status, and acknowledgments; trial class schedules are academic affairs scheduling tables, containing trial class dates, time slots, instructors, quota counts, and sign-in signatures. The three types of materials update at different rhythms: brochures are revised by enrollment batch, consultation records are added immediately after each communication, and trial class schedules are arranged weekly and adjusted on a temporary basis. In terms of field characteristics, the three types of fields—names, quantities, and dates—are most prone to the same record not matching across two materials; unsynchronized versions will cause conflicts between old brochures and new schedules, and missing signatures or acknowledgments make records impossible to close the loop. After materials enter the knowledge base retrieval node, each serves as a citable source fragment, providing the original text basis for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether course names, class type counts, start dates, and signature fields are consistent with consultation records and trial class schedules | Locate the brochure fragment in the citation array, compare field by field against the ledger, and mark discrepancies in names, quantities, and dates |
| Consultation record | Whether visitor names, intended courses, communication dates, follow-up status, and acknowledgments are consistent with brochures and schedules | Open the citation marker to trace back to the original paragraph, and verify the source identifier of that citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Trial class schedule | Whether trial class dates, time slots, instructors, quota counts, and sign-in signatures are consistent with brochures and consultation records | Use one real record to compare the scheduling table with the ledger, identify inconsistent fields, and record the version number |
| Search parameters | The values are consistent with those set in the knowledge base retrieval section, and `quoteMaxToken` is the citation content budget | Open the search parameters panel and check item by item, separately recording the number of citations and the `quoteMaxToken` value |

## Three common errors

- Symptom: The course name for the same visitor does not match between the brochure and the consultation record. Cause: After the brochure was revised, the old version was still hit by retrieval, and the two materials were not synchronized.
- Symptom: The quota count in the trial class schedule is inconsistent with the count registered in the consultation record. Cause: After temporary scheduling adjustments, the ledger was not written back, and the two versions were not synchronized.
- Symptom: The consultation record lacks a signature or acknowledgment, and the citation fragment cannot close the loop. Cause: The signature field was not completed when the material was archived, and retrieval only hit incomplete entries.

## How to verify the setup

This feature acceptance: ask a question with an original text basis, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the number of citations and the `quoteMaxToken` value.

Business test: use one real record to find fields inconsistent with the ledger, submit them to the reviewer for confirmation, and write them back.

- In the conversation, open the citation markers, check against the source documents whether each citation can trace back to the original paragraph, and inspect the source identifier in `quoteList`.
- Run a test with a question that has no matching materials, observe that the output is empty while the pipeline continues, and confirm that a citation array length of 0 is a normal output.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
