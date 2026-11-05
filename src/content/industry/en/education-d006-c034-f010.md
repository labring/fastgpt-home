---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Progress
meta_description: Skills Certification: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for social assessment of occupational skill level certification revolve around three types of materials: the assessment implementation plan, candidate registration forms, and assessor dispatch forms. The plan provides the batch, occupation, level, time nodes, and statistical criteria; the registration forms provide candidate names, ID numbers, declared occupations, and payment receipts; the dispatch forms provide assessor names, certificate numbers, dispatch dates, and signatures. The three are archived by batch, with weekly records and monthly summaries, and fields include names, quantities, dates, signatures, and receipts. When the materials enter the knowledge base retrieval node, the plan is responsible for criteria and nodes, the registration forms are responsible for headcount and roster, and the dispatch forms are responsible for assessors and attendance, each serving as a cited source for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The "progress table and statistical criteria description" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Whether the batch, occupation, level, time nodes, and statistical criteria are complete, and whether the version is synchronized with the current batch | Open the citation marker to trace back to the original plan text, and verify fields, dates, and signature columns item by item |
| Candidate registration form | Whether candidate names, ID numbers, declared occupations, and payment receipts are consistent with the plan criteria, and whether the quantities match | Use weekly records to verify the totals, and compare the names, quantities, and dates in the registration forms and the plan |
| Assessor dispatch form | Whether assessor names, certificate numbers, dispatch dates, and signatures are complete, and whether receipts are missing | Compare against the original dispatch form text, check signatures and receipts, record exceptions, and note the criteria |
| Cited content output | Whether the number of returned entries matches the materials hit; empty is also normal; `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) can trace back to the original paragraphs | Run a test with a question that matches no materials, and see whether the array is empty while the chain still works; `quoteMaxToken` only verifies the citation text budget, and the number of entries is recorded separately |

## Three common errors

- Phenomenon: the same candidate's name or quantity does not match between the registration form and the plan. Cause: the two material versions are not synchronized, or they were not collected under the same batch criteria during entry.
- Phenomenon: the dispatch form dates are inconsistent with the implementation plan nodes, and signatures or receipts are missing. Cause: the dispatch form was not updated with the plan, and assessor attendance records were not promptly supplemented with signed receipts.
- Phenomenon: there are no citation markers in the answer, or the cited snippets do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still works.

Business test: use weekly records to verify the totals, see whether the criteria and exceptions are clearly written, and whether the recorded numbers and statistical numbers match.

- Open the search parameter panel and verify item by item, confirm that the associated knowledge base uses the same vector model, and check the original paragraphs against the citation markers.
- Use weekly records to verify the totals, write the criteria into the header, record exceptions, and note the source identifiers for reference in weekly or monthly reports.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
