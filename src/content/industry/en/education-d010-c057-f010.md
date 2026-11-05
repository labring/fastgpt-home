---
title: Citations and Source Traceability for National Key Research and Development Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Operations
meta_description: National R&D Grants: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Coordinate Operations and Application Handover

## What this category's data looks like

National Key R&D Program project application materials usually include three types: the project application form, the budget application form, and the cooperation agreement. The update rhythm is concentrated revision during the application window, finalization before review, and archiving after approval. The project application form carries the research content, assessment indicators, task breakdown, and the roles of the undertaking units; the budget application form carries the funding categories, calculation basis, and amounts for each category; the cooperation agreement carries the division of labor among partners, intellectual property ownership, funding disbursement, and signatures and seals. The field characteristics of the three types of materials are concentrated in names, quantities, dates, signatures, and receipts: the same equipment, the same personnel, and the same task may be described differently in two materials, and amounts and start/end dates need to be aligned item by item, while signature pages and receipt pages need to form a complete set. When the materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets point back to the original paragraphs, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, each item containing the original snippet and source identifier; the length can be 0. The handover-ready deployment status and operation records must be continued by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check the research content, assessment indicators, task breakdown, and names of undertaking units, and compare whether the names, quantities, and dates of the same record in the agreement and budget form are consistent | Open the citation superscript to point back to the original paragraph, compare the three materials field by field; record the number of citations and the `quoteMaxToken` budget, and register the number separately |
| Budget application form | Check the funding categories, calculation basis, and amounts for each category, and compare whether the task period, number of participating units, and dates align with those in the project application form | Check the values in the search parameter panel and confirm they are consistent with the knowledge base retrieval section; check whether the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the number of matched materials |
| Cooperation agreement | Check whether the division of labor among partners, intellectual property ownership, funding disbursement nodes, signature and seal pages, and receipt pages form a complete set, and whether dates and version numbers are synchronized | Run a trial query with no matching materials to confirm that the citation array is empty while the chain runs through; inspect the correspondence between the citation source identifiers and the original paragraphs in `quoteList` |
| Deployment status and operation records | Check whether the version, connection, and task records are consistent, verify item by item once according to the handover form, and see which record is missing | Before handing over to operations or the next shift, verify the deployment status and operation records item by item according to the handover form, fill in missing items, and then hand over |

## Three common errors

- Symptom: the name and quantity of the same equipment do not match in two materials. Cause: the project application form and the budget application form were revised separately, no field-level comparison was made, and the discrepancy was only discovered after the cited snippets pointed back to the original text.
- Symptom: the date of the cooperation agreement is inconsistent with the start/end dates in the project application form. Cause: versions were not synchronized; after one party updated, the other party continued to use the old draft, and the signature page and receipt page were missing.
- Symptom: there is no citation superscript in the answer, and the cited snippets do not match the original text. Cause: it was first attributed to length truncation, without checking whether this round hit anything or which material was hit, before looking at truncation.

## How to verify the setup

Acceptance of this feature: ask a question with supporting original text and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through; check the number of citations in `responseData` and the source identifiers in `quoteList`, and record the citation text tokens and the `quoteMaxToken` budget separately, without comparing the counts for equality.

Business test: verify item by item once according to the handover form and see which record is missing; after the version, connection, and task records are consistent, hand over to operations or the next shift.

- Open the search parameter panel and verify item by item, confirming that the associated knowledge base selects a knowledge base with the same vector model, and that the values are consistent with the knowledge base retrieval section.
- Open the citation superscripts in the conversation and check against the source documents whether each citation can point back to the original paragraph; run a trial query with no matching materials to confirm that the array is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
