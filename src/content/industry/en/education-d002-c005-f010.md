---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Checks
meta_description: Kindergarten Safety: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill scenarios. Materials include hazard inspection ledgers, rectification notices, emergency drill plans, sign-in sheets, access control and school bus inspection records, and responsible person signature pages. These materials enter the knowledge base retrieval node in document form, each playing a different role: ledgers and notices provide the basis for comparing hazard items and rectification deadlines, drill plans and sign-in sheets provide the basis for comparing headcount and procedures, and inspection records provide the checklist of access control and school bus items. Materials are updated by semester and by month, and field characteristics center on names, quantities, dates, responsible person signatures, and closed-loop status. Consistency in the name, quantity, and date of the same object across two materials is the starting point for determining discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection ledger and rectification notice | Whether hazard items and rectification deadlines correspond one-to-one, and whether there are any unclosed items | Retrieve the name, rectification deadline, and closed-loop status of the same hazard item in the two materials and compare them one by one; record the number of entries in the citation array separately, and check the tokens of the cited text separately against the `quoteMaxToken` budget |
| Emergency drill plan and sign-in sheet | Whether the drill headcount matches the sign-in, and whether the drill record matches the plan procedure | Retrieve the drill headcount, date, and stages in the plan and check them item by item against the sign-in sheet; open the citation marker to trace back to the original paragraph, and view the source identifier in `quoteList` |
| Access control and school bus inspection records | Whether any inspection items are missing, and whether responsible person signatures are complete | Retrieve the inspection checklist items and signature pages, check whether access control and school bus inspection items are covered, and whether the signature fields are complete; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure |
| Responsible person signature page | Whether the signature and date of the same responsible person are consistent across different materials | Retrieve the responsible person fields in the signature page, ledger, and notice, compare names and dates, and mark inconsistent fields |

## Three common errors

- Phenomenon: the hazard ledger shows rectification completed, but the notice has no closed-loop record. Cause: the name or deadline of the same hazard item differs between the two materials, and without item-by-item comparison it is attributed to clipping.
- Phenomenon: the drill record headcount does not match the plan requirements, and the sign-in sheet is missing pages. Cause: the plan and sign-in sheet were not checked as the same object, and the cited fragments do not match the original text.
- Phenomenon: access control or school bus inspection items are missing, and signature fields are blank. Cause: the inspection records were not compared item by item against the checklist, and an empty citation array was misjudged as a retrieval failure.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In the node, check whether the selected knowledge base uses the same vector model, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, observe that the cited content output is empty while the pipeline continues, and record the array entry count and the `quoteMaxToken` budget for separate checks.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
