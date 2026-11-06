---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Checks
meta_description: Study Abroad Safety: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Compare Documents and Locate Differences

## What this category's data looks like

This category involves three types of materials: pre-departure training courseware, safety reminder checklists, and accommodation contact forms. The courseware is updated by semester and contains course name, class hours, teaching date, and signature field; the safety reminder checklist is maintained by destination and risk level and contains reminder items, effective date, and receipt status; the accommodation contact form contains accommodation name, number of rooms, check-in date, and contact person signature. When the three types of materials enter the knowledge base retrieval node, each serves as an independent citation source; the node performs vector search on the knowledge base collection of the same vector model, outputs an array of cited content, and each entry contains the original text fragment and source identifier. When the update cadence of the materials is not synchronized, the name, quantity, and date of the same record are prone to discrepancies and require field-by-field comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Whether the course name, class hours, teaching date, and signature field are consistent across the three types of materials | Open the courseware and the safety reminder checklist, check item by item the name, quantity, and date of the same course, and record the discrepant fields; check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) point back to the original paragraphs |
| Safety reminder checklist | Whether the reminder items, effective date, and receipt status are consistent with the corresponding records in the accommodation contact form | Compare the checklist with the accommodation contact form, and verify the number of reminder items, effective date, and receipt signature for the same destination; use `quoteList` to expand the citation source identifier and confirm the matched material |
| Accommodation contact form | Whether the accommodation name, number of rooms, check-in date, and contact person signature are consistent with the courseware records | Extract one real accommodation record, compare it field by field with the accommodation arrangements in the courseware, and mark inconsistent items in name, quantity, and date; verify that `quoteMaxToken` is only the citation content budget, and record the array entry count separately |
| Knowledge base retrieval node | Whether the selected knowledge base uses the same vector model, and whether an empty citation output is also considered normal | In the node, verify the selected collection and vector model; run a trial query with no matching material to confirm that the citation array is empty while the pipeline still runs, then open the citation badge to compare against the source document |

## Three common errors

- Symptom: The name, quantity, and date of the same accommodation record do not match between the contact form and the courseware. Cause: The two materials are updated on different cadences, and no field-level comparison is performed before entering citation output.
- Symptom: The effective date and receipt status of the safety reminder checklist are inconsistent between versions. Cause: The versions are not synchronized, the old checklist is still hit by retrieval, and the cited fragments point to outdated paragraphs.
- Symptom: The courseware and contact form lack signatures or receipts, but the citation array still returns fragments. Cause: The signature field is empty but the text has already been ingested into the knowledge base, retrieval matches by content, and the signature status is not validated.

## How to verify the setup

This feature acceptance: ask a question with source-text support and check whether the citation array and badge can point back to the original paragraphs; then ask a question with no matching material and confirm that the array is empty while the pipeline still runs.

Business test: use one real record to find fields inconsistent with the ledger, record discrepancies in name, quantity, and date, and submit them to the reviewer for confirmation and write-back.

- Open the citation badge, compare the cited fragments with the original paragraphs one by one against the source document, and record entries that cannot be traced back.
- Run a trial query with no matching material to confirm that the citation array is empty while the output pipeline continues, and do not attribute the empty array to retrieval failure.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
