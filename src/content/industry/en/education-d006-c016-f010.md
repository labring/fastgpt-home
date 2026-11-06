---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Progress
meta_description: Campus Safety: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Track Progress and Check Statistics

## What this category's data looks like

The source materials for school safety hazard inspections and campus incident reporting are safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are registered item by item according to inspection routes and inspection items, including inspection date, inspector, hazard description, preliminary severity level, and signature; the hazard rectification ledger follows on from the checklists, recording the rectification responsible person, rectification deadline, rectification measures, completion date, and re-inspection signature; emergency incident reports record the incident time, location, course, handling, reporting target, and receipt. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the checklists provide the fields and dates on the hazard discovery side, the ledger provides the fields and signatures on the rectification closed-loop side, and the incident reports provide the fields on the reporting and receipt side. The update rhythm is usually weekly aggregation and monthly archiving, with versions rolling as re-inspections and supplementary signatures occur. Field characteristics are concentrated in four categories: name, quantity, date, and signature, which are precisely where progress records and statistical reconciliation are most prone to mismatches.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The "progress table and statistical scope description" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Fields include inspection date, inspector, hazard description, and signature; the date and number of inspection items must be consistent with the first row of the ledger | In the conversation, open the citation marker, check the checklist's fields and date against the source document, and record the number of entries in the citation array |
| Hazard rectification ledger | Fields include rectification responsible person, deadline, measures, completion date, and re-inspection signature; the name and quantity of the same hazard must match the checklist | Open the search parameter panel and check the values item by item, then check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original paragraphs of the ledger |
| Emergency incident report | Fields include incident time, location, course, handling, reporting target, and receipt; missing signature or receipt is regarded as not closed-loop | Run a trial with a question that has no matching materials, see whether the output is empty while the chain continues, then check whether the citations in `quoteList` are consistent with the original text |
| Cited content output | The number of returned entries is consistent with the matched materials; empty is also normal; the number of entries is the array length | Check the value of `quoteMaxToken` as the citation content budget; record the array entry count separately and do not compare it for equality with the budget |

## Three common errors

- Phenomenon: the name, quantity, and date of the same hazard do not match between the checklist and the ledger. Cause: the two materials are updated separately, not backfilled under the same number, and only one is changed during re-inspection.
- Phenomenon: the checklist has been revised, but the ledger still references the old version's fields and deadlines. Cause: versions are not synchronized, and the revision round and effective date are not marked during archiving.
- Phenomenon: an incident report lacks the signature of the reporting target or the receipt, but it is still counted as closed-loop in statistics. Cause: signatures and receipts are not archived together with the report, and verification only looks at the body of the report.

## How to verify the setup

Acceptance of this feature: ask a question with source-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: use one week of records to reconcile the totals, and see whether the scope and exceptions are clearly stated; compare the totals in the progress table and statistical scope description item by item against the ledger, and list exceptions separately.

- Open the citation markers and compare against the source documents, check the cited fragments against the original paragraphs item by item, record the number of entries in the citation array, and separately record the value of the `quoteMaxToken` budget.
- Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and check whether the selected knowledge bases use the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
