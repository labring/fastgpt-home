---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Handover
meta_description: Campus Safety: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses school safety hazard inspections and campus incident reporting, covering three types of materials: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists record inspection items, locations, dates, and inspector signatures; hazard rectification ledgers record hazard names, quantities, rectification deadlines, responsible persons, review conclusions, and receipts; emergency incident reports record the incident process, handling measures, reporting time, and issuer. When these three types of materials enter the knowledge base retrieval node, they serve as the retrieved source text; the node returns an array of cited content via vector search, each entry containing a source text snippet and a source identifier, and the length may be 0. The material update cadence is daily inspections, rectification within a deadline, and immediate reporting after an incident occurs. Field characteristics center on names, quantities, dates, signatures, and version numbers. The citation output provides traceable source-text evidence for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing a source text snippet and a source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Inspection items, locations, dates, and inspector signatures are complete; the name, quantity, and date of the same record are consistent between the checklist and the ledger | Open the citation markers and compare them against the source documents, verify whether each citation can be traced back to the original paragraph, and record the number of array entries |
| Hazard rectification ledger | Hazard name, quantity, rectification deadline, responsible person, review conclusion, and receipt have no missing items; version and date are consistent | Check whether the selected knowledge bases use the same vector model, and compare ledger fields item by item against the source citation snippets |
| Emergency incident report | The incident process, handling measures, reporting time, and issuer signature are complete, and the name, quantity, and date of the same record match those in the safety inspection checklist and ledger | Run a test query with no matching materials to confirm that the citation array is empty while the chain still completes |
| Citation content output | The number of returned entries matches the materials hit; empty is also normal; the citation content budget and the array length are recorded separately | Open the search parameter panel to check the values, verify that `quoteMaxToken` is the citation text budget, and record the number of array entries separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the safety inspection checklist and the hazard rectification ledger. Cause: During drafting, the original citations were not traced back, and fields were rewritten without comparison against the source.
- Symptom: The emergency incident report and the ledger version are not synchronized, and signatures or receipts are missing. Cause: During handover, the version number and signature fields were not checked, and the draft proceeded directly to the next step.
- Symptom: There are no citation markers in the answer, and the citation snippets do not match the original text. Cause: Length truncation was suspected first, without first checking whether this round had any hits and which material was hit.

## How to verify the setup

Acceptance for this feature: ask a question with source-text evidence and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and inspect the citation snippets and source identifiers in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled).

Business test: draft one document according to the template and complete one handover to see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they all use the same vector model.
- Open the search parameter panel and check the values item by item; verify that `quoteMaxToken` is the citation content budget, record the number of array entries separately, and do not perform an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
