---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Handover
meta_description: Graduate Destinations: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in university employment contract signing and graduation destination statistics, involving three types of materials: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the employer name, unified social credit code, signing date, and signatures of both parties; the graduation destination registration form carries the destination type, employer location, registration certificate information, and department review; the employer certificate carries the hired position, onboarding time, and employer official seal. When these three types of materials enter the knowledge base retrieval node, each serves as a traceable source for comparing whether the name, quantity, and date of the same record are consistent, whether versions are synchronized, and whether signatures and receipts are complete. The update rhythm advances with graduation batches and signing progress. Drafts and handover records must have complete fields, clear responsible persons, and consistent versions and dates before they can be handed to the next stage for acceptance.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. Signable material drafts and handover records are completed by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the employer name, unified social credit code, signing date, and signatures of both parties are consistent with the registration form | In the citation array, point back to the original paragraphs one by one, and verify the name, quantity, date, and signature fields |
| Graduation destination registration form | Whether the destination type, employer location, registration certificate information, and department review are complete and versions are synchronized | Open the citation superscript to compare with the source document, and confirm there are no missing fields and that versions and dates are consistent |
| Employer certificate | Whether the hired position, onboarding time, and employer official seal correspond to the agreement | Use `quoteList` to view the cited fragment, and verify whether the receipt and signature are missing |
| Knowledge base retrieval node | Whether the selected collection uses the same vector model, and whether the number of citations matches the hit materials | Try a question with no matching materials, confirm the array is empty while the pipeline continues, and record `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The employer name and signing date of the same record do not match between the agreement and the registration form. Cause: The two materials were drafted separately and were not checked by pointing back to the same source.
- Phenomenon: Material versions are not synchronized, and an old draft is circulated as the issued version. Cause: The handover record did not mark the version and date, and the acceptance step did not stop it.
- Phenomenon: The employer certificate lacks an official seal or receipt, and no one claims it during handover. Cause: The responsible person was not specified in the draft, and the signature fields and receipt were not verified item by item.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the pipeline runs through.

Business test: Draft one according to the template and complete one handover, and see whether missing items are stopped.

- Open the search parameter panel and verify item by item, confirm that the values are consistent with the knowledge base retrieval section, and separately record the number of citations and the `quoteMaxToken` budget.
- Open the citation superscript in the conversation, compare the `quoteList` fragment against the source document, and confirm that each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
