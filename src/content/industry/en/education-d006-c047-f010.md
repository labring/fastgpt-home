---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Track Progress and Check Statistics
slug: /en/industry/education-d006-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Progress
meta_description: Study Abroad Safety: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Track Progress and Check Statistics

## What this category's data looks like

In the pre-departure training and overseas safety reminders category, materials include pre-departure training courseware, safety reminder checklists, and accommodation contact forms. The courseware records training sessions, sign-ins, and assessments; the checklist records safety items, responsible persons, and update dates; the contact form records accommodation addresses, contacts, and confirmation signatures. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source: the courseware provides training progress, the checklist provides the safety reminder criteria, and the contact form provides accommodation verification fields. The update cadence is summarized weekly or monthly, and the field characteristics center on names, quantities, dates, signatures, and receipts. For the same record, the name, quantity, and date in the courseware and the checklist must be consistent; versions must be synchronized; signatures or receipts must not be missing. The cited content is output as an array, used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "progress table and statistical criteria description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Whether the name, quantity, date, signature, and receipt are consistent with the safety reminder checklist | Open the citation superscript to trace back to the original paragraph, and verify the sessions and sign-in counts in the courseware against the checklist records; check the number of citations by the array length, and `quoteMaxToken` only looks at the citation text budget |
| Safety reminder checklist | Whether the version date and responsible person's signature are synchronized, and whether the item names match the courseware | Compare the source document to verify the version number and update date, check items missing signatures or receipts, and record exceptions |
| Accommodation contact form | Whether the accommodation address, contact, and confirmation date are consistent with the checklist and courseware records | Trace back to the original text item by item, and verify the name, quantity, and date of the same record across the three materials; use `quoteList` to view the citation snippet and source identifier |
| Cited content output | The number of returned entries matches the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see that the output is empty while the pipeline continues; record the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the courseware and the checklist do not match. Cause: The two materials are maintained separately and have not been checked against the same field criteria.
- Symptom: The safety reminder checklist version is not synchronized, and old items are still cited. Cause: After updating, the original text was not traced back to verify the version date and responsible person's signature.
- Symptom: The accommodation contact form is missing signatures or receipts, and the statistical totals do not match the number of records. Cause: The criteria were not written into the header, and exceptions were not separately explained.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline continues.

Business test: use one week of records to verify the totals, and see whether the criteria and exceptions are clearly written.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model; open the citation superscript in the conversation, and compare `quoteList` with the original paragraph against the source document.
- Use one week of records to verify the totals, and check the header criteria, exception explanations, and signatures/receipts; record the number of citations separately, and do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
