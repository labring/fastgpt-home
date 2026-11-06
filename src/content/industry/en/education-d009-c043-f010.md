---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Multilingual
meta_description: Training Admissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of enrollment consultation conversion at training institutions, with materials drawn from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, class hours, and fee definitions, and serve as the baseline source for the terminology list; consultation records carry the name, quantity, date, and receipt fields of the same record, and are used to compare whether the brochure's wording is consistent; trial class schedules provide dates, sessions, and signature fields, and are used to verify versions and sign-offs. In terms of update cadence, brochures are revised by enrollment season, consultation records are appended with each communication, and trial class schedules are scheduled weekly. When the three enter the knowledge base retrieval node, they respectively assume the roles of baseline, comparison, and verification. The citation output is only responsible for returning the hit original text fragments and source identifiers as a group, and subsequent nodes use this to perform terminology comparison and field comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology list and comparison draft" is completed subsequently by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, class hours, and fee definitions are consistent with the baseline wording in the terminology list, and whether the date and version number can be traced back to the original text paragraph | Open the citation superscript to compare against the source document, and check the name and date wording item by item |
| Consultation record | Whether the name, quantity, and date of the same record match the brochure and trial class schedule, and whether the receipt and signature fields are complete | Sample three terms to check their wording throughout the document, then compare the quantities and dates in the two materials |
| Trial class schedule | Whether the session dates, signature fields, and brochure definitions are synchronized, and whether the version is consistent with the current enrollment season | Check the values in the search parameter panel and confirm that the associated knowledge base uses the same vector model |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal; each citation can be traced back to the original text paragraph | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the brochure and the consultation record. Cause: The two materials are maintained separately and were not calibrated against the same terminology list before being ingested into the knowledge base.
- Symptom: The trial class schedule has been rescheduled, but the brochure still lists the old session. Cause: The versions were not synchronized, and the old material was not removed from the associated knowledge base.
- Symptom: The consultation record lacks a signature or receipt, and the cited fragment does not match the original text. Cause: First check whether this round hit and which material was hit, then look at trimming, rather than directly attributing it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original text evidence, and check whether the citation array and superscripts can be traced back to the original text paragraph; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: sample three terms to check whether their wording is consistent throughout the document, confirm that the translated names can be traced back to the original text, and then check the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the array length and the tokens of the cited text.
- Open the citation superscripts in the conversation, compare against the source document to check whether each citation can be traced back to the original text paragraph, and when empty, confirm that the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
