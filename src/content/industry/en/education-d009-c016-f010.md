---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Multilingual
meta_description: Campus Safety: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Handle Multilingual Materials and Terminology

## What this category's data looks like

School safety hazard inspections and campus incident reporting involve three types of materials: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are mostly filled in by duty personnel weekly or per inspection, with fields including inspection item, location, date, and inspector signature; hazard rectification ledgers are summarized monthly by the safety management department, with fields including hazard name, rectification measure, responsible person, completion date, and review signature; emergency incident reports are submitted within a time limit after an incident occurs, with fields including incident name, time, number of people involved, handling process, and receipt number. The three types of materials often coexist as paper scans, spreadsheets, and image-text records, with an update rhythm of record-as-you-inspect, monthly aggregation, and time-limited supplementary reporting after an incident. The same record's name, quantity, and date not matching across two materials, versions not synchronized, and missing signatures or receipts are the three most common types of inconsistency in multilingual materials and terminology handling. When materials enter the knowledge base retrieval node, each assumes its own source role: safety inspection checklists provide the original text of inspection items and locations, hazard rectification ledgers provide the original text of the rectification process and signatures, and emergency incident reports provide the original text of the incident course and receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | The inspection item, location, date, and inspector signature are written consistently across the multilingual comparison drafts and can point back to the original text paragraph | In the node, check the selected collection and its vector model; open the citation superscript and compare item by item against the inspection items and signature fields in the source document |
| Hazard rectification ledger | The hazard name, rectification measure, responsible person, completion date, and review signature do not conflict across the three materials, and the terminology translations can point back to the original text | Open the search parameter panel and check item by item; run a test with a question that has no matching material, and see whether the output is empty while the chain continues |
| Emergency incident report | The incident name, time, number of people involved, handling process, and receipt number match the records in the safety inspection checklist and ledger | Open the citation superscript in the conversation and compare against the source document; record the number of citations and the tokens of the cited text, `quoteMaxToken` is the cited content budget, and the array entry count is recorded separately |
| Cited content output | The number of returned entries matches the materials hit, and being empty is also normal; in `responseData` (non-streaming module results returned with detailed output enabled), `quoteList` can be used to view the hit situation | Run a test with a question that has no matching material, and see whether the output is empty while the chain continues; when checking whether the cited fragments do not match the original text, first check whether this round hit anything and which material was hit |

## Three common errors

- Phenomenon: The same record's name, quantity, and date do not match between the safety inspection checklist and the hazard rectification ledger. Cause: The two materials are filled in by different steps, without terminology unification and version synchronization.
- Phenomenon: The emergency incident report conflicts with the ledger's rectification completion date, and the receipt number is missing. Cause: Versions are not synchronized, and signatures or receipts were not backfilled during supplementary reporting.
- Phenomenon: There is no citation superscript in the answer, or the cited fragments do not match the original text. Cause: Without first checking whether this round hit anything and which material was hit, the issue is directly attributed to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscript can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through.

Business test: sample three terms and check whether their writing is consistent throughout the entire document

- Open the citation superscript and compare item by item against the source document, confirming that each citation can point back to the original text paragraph
- Record the number of citations and the tokens of the cited text, `quoteMaxToken` is the cited content budget, and the array entry count is recorded separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
