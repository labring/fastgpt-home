---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Review
meta_description: Campus Safety: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Trace Exceptions and Review Results

## What this category's data looks like

For the school safety hazard inspection and campus incident reporting category, routine materials include safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are filled out weekly or monthly by the inspector, recording the location, hazard description, preliminary severity level, and inspection date; the hazard rectification ledger registers, item by item by hazard number, the rectification owner, deadline, completion status, and acceptance signature; emergency incident reports are filled out by the duty officer after an incident occurs, including time, location, course of events, personnel involved, and receipt. After these three types of materials enter the knowledge base retrieval node, they each serve as citation sources, providing original passages for anomaly tracing. The materials update at different cadences: checklists are high-frequency, the ledger rolls forward with rectification, and incident reports are occasional; field naming and date formats are often inconsistent, and during review each item must be traced back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original passage and a source identifier, and the length can be 0. The "anomaly list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection location, hazard description, inspection date, and inspector signature are complete, and whether the name, quantity, and date of the same hazard match those in the ledger | In the citation array, open the footnote markers one by one, compare them against the original passage in the safety inspection checklist, and record field and date discrepancies |
| Hazard rectification ledger | Whether the hazard number, rectification owner, deadline, completion status, and acceptance signature are complete, and whether the name and quantity of the same item match those in the incident report | Search using the same hazard number, verify whether the cited passage points back to the original ledger text, and check whether the version has not been synchronized |
| Emergency incident report | Whether the incident time, location, course of events, personnel involved, and receipt signature are present, and whether the dates and names match those in the checklist and ledger | In the conversation, open the citation footnote markers, compare them against the original report text, and verify the source identifier and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of returned entries matches the materials hit; an empty result is also normal, and the output pipeline continues to run through | Run a trial with a question that has no matching materials, and see whether the array is empty while the pipeline continues; record the citation count separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: The name, quantity, and date of the same hazard do not match between the checklist and the ledger. Cause: The two materials were filled out by different personnel at different times, without field alignment and version synchronization.
- Symptom: The emergency incident report lacks a receipt signature, or the hazard rectification ledger lacks an acceptance signature. Cause: The material circulation step was not closed-loop, and signatures and receipts were not archived together with the records.
- Symptom: There are no citation footnote markers in the answer, or the cited passage does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: ask a question that has original-text support, and verify whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: create an anomaly record, see whether it can be traced to the source material, and verify the values of `responseData`, `quoteList`, and `quoteMaxToken`.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, confirm that the output is empty while the pipeline continues, and record the citation count and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
