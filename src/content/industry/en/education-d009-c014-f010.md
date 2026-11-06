---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Multilingual
meta_description: Pastoral Education: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses school moral education and homeroom teacher work scenarios, and the materials include three categories: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans provide activity objectives, procedures, and signature fields; student comprehensive quality records carry semester evaluations, quantitative items, and dates; home visit records retain communication points, receipts, and signatures. After these three categories of materials enter the knowledge base retrieval node, they serve as citable original text sources, each taking on the evidentiary role of terminology provenance and field cross-reference. The update rhythm runs in parallel by semester and by month: class meeting plans are adjusted by week, comprehensive quality records are archived by semester, and home visit records are supplemented as events occur. Field characteristics are concentrated in four categories: names, quantities, dates, and signature receipts. The same record often shows mismatched names, quantities, and dates across two materials, versions not synchronized, or missing signatures and receipts. Multilingual materials and terminology handling require that the same term be written consistently throughout and that translated names can point back to the original text; citation sources and traceability take this as their premise.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The unified terminology glossary and cross-reference draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | The plan name, activity quantity, implementation date, and signature fields must be aligned item by item with the same batch of materials, and translated names must be able to point back to the original text paragraphs | Open the source document at the citation marker and verify the name, quantity, date, and signature fields; record the number of array items and the `quoteMaxToken` budget, and do not compare the two for equality |
| Student comprehensive quality record | Semester evaluation items, quantitative quantities, archive dates, and signature receipts must remain consistent across versions, and the same term must be written consistently throughout | Compare fields item by item against the source document and confirm that cited fragments can point back to the original text; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure and `quoteList` to view hit details |
| Home visit record | Communication points, counts, home visit dates, and receipt signatures must be cross-consistent with class meeting plans and comprehensive quality records, avoiding unsynchronized versions | Extract three terms and check whether their writing is consistent throughout; run a trial query with no matching materials to confirm that the citation array is empty while the pipeline still runs through |

## Three common errors

- Phenomenon: The same record's name, quantity, and date do not match between the class meeting plan and the comprehensive quality record. Cause: The two materials are updated separately, versions are not synchronized, and citations do not point back to the same original text paragraph.
- Phenomenon: The home visit record lacks a signature or receipt, yet the externally published draft is still adopted. Cause: The signature fields were not checked when the materials were archived, and the citation output only presents fragments without covering the signature fields.
- Phenomenon: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether this round had a hit and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline still runs through.

Business test: extract three terms and check whether their writing is consistent throughout, and confirm that translated names can point back to the original text.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a query sentence that has no matching materials and see that the output is empty while the pipeline continues; then open the citation markers and check against the source document whether each citation can point back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
