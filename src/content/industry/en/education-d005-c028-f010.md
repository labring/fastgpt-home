---
title: Citations and Source Traceability for Vocational College Program Registration: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Versions
meta_description: Vocational Programs: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Maintain Document Versions and Changes

## What this category's data looks like

The materials for the filing of program offerings in vocational colleges usually include the program offering filing form, the talent demand justification, and the list of faculty and equipment, which corroborate one another. The filing form contains the program name, code, program length, admission target, proposed establishment date, and school signature; the talent demand justification contains the industry research date, job title, demand quantity, and the justifier's signature; the faculty and equipment list sets out teacher names, professional titles, quantities, equipment names, number of units/sets, and the responsible person's signature. When these materials enter the knowledge base retrieval node, the node outputs only an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0; it does not take on the role of judging the main record and the supporting record. In terms of update cadence, changes to program names or quantities, adjustments to justification dates, and supplementary signature entries all produce new versions, and old versions must be retained and traceable. The field characteristic is that the four types of information—names, quantities, dates, and signatures—are prone to misalignment between the two materials, and the correspondence must be fixed by means of citation sources and traceability, forming a version ledger and change records.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program offering filing form | Whether the fields, dates, and signatures are consistent with the current version, and whether the program name and code can be traced back to the original text | Open the citation superscript, compare against the original paragraphs of the filing form, and check the four items of name, quantity, date, and signature; record the number of citation items and the `quoteMaxToken` budget |
| Talent demand justification | Whether the justification date, job title, and demand quantity match the filing form, and whether the justifier's signature is complete | Locate the justification paragraphs in the cited content array, compare name, quantity, and date item by item; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure |
| Faculty and equipment list | Whether the number of teachers, professional titles, and equipment units/sets are consistent with the filing form and justification, and whether the responsible person's signature and receipt are missing any items | Retrieve the original text snippets of the list, check quantity and date; use `quoteList` to view the details of a single citation item and confirm that it can be traced back |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are synchronized | After changing one piece of content, rerun retrieval to see whether the version number and citations are updated synchronously, and whether old-version citations are still traceable |

## Three common errors

- Symptom: The program name, demand quantity, and date of the same record do not match between the filing form and the justification. Cause: The two materials are maintained separately, and the correspondence has not been fixed by citation source.
- Symptom: The filing form has been updated, but the faculty and equipment list is still the old version, and citations still point to the old paragraphs. Cause: The versions are not synchronized, the old version is not marked as traceable, and retrieval hits the old material.
- Symptom: The list lacks the responsible person's signature or receipt, and the cited snippets cannot prove effectiveness. Cause: The signature and receipt were not entered into the knowledge base together with the materials, and the traceability chain is broken at the original document.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscript can trace back to the original paragraphs; then ask a question with no matching material, and confirm that the array is empty while the pipeline runs through, and that the number of items and the `quoteMaxToken` budget are not compared for equality.

Business test: change one piece of content and see whether the version number and citations are updated synchronously

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a query that has no matching material, see that the cited content output is empty while the pipeline continues, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
