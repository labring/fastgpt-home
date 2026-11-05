---
title: Citations and Source Traceability for University Laboratory Safety Classification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Progress
meta_description: Lab Safety Categories: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Track Progress and Check Statistics

## What this category's data looks like

The data for this category typically looks like this: laboratory grading and classification tables, hazard source lists, and safety responsibility statements. The grading and classification table registers category, hazard source, and responsible person item by item by room or laboratory; the hazard source list sets out entries such as chemicals, gas cylinders, and equipment together with quantities; the safety responsibility statement corresponds to the responsible person, date, and signature. When these three types of materials enter the knowledge base retrieval node, the grading and classification table provides grading entries and the basis for determination, the hazard source list provides entry and quantity fields, and the safety responsibility statement provides signature and date fields. The update rhythm usually rolls weekly or monthly, and materials are re-ingested after new signing or revision. Field characteristics center on name, quantity, date, signature, and version number; the same record may have inconsistent name spellings, different quantity calibers, and misordered dates across multiple materials. The citation output is only responsible for returning the hit original text fragments and source identifiers, for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "progress table and statistical caliber description" is completed next by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the fields include grading category, hazard source, responsible person, date, and version; whether the name and category of the same room are consistent across different versions | Retrieve the table fragment in the citation output, trace each item back to the original text, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit grading entries |
| Hazard source list | Whether the entry name, quantity, unit, storage location, and update date match the grading and classification table | Use one week's records to retrieve the list fragment, check the quantity and unit of the cited fragment in `quoteList`, and compare with the same room's entries in the grading and classification table |
| Safety responsibility statement | Whether the responsible person and signature, signing date, and receipt are complete; whether the name and date of the same record are consistent between the list and the responsibility statement | Retrieve the responsibility statement fragment, check whether the signature and date fields are retained within the `quoteMaxToken` budget, and separately record missing signatures or missing receipts |
| Progress table and statistical caliber description | Whether the record count and statistical count match, whether the caliber is written in the header, and whether exceptions are clearly stated | Use one week's records to check the totals, check whether the number of citations matches the statistical entries, and note the caliber and exceptions in the header |

## Three common errors

- Phenomenon: the name, quantity, and date of the same room do not match between the grading and classification table and the hazard source list. Cause: the two materials are updated separately, versions are not synchronized, and retrieval hits fragments from different versions.
- Phenomenon: the safety responsibility statement lacks a signature or receipt, but it is still counted as completed in statistics. Cause: the signature field does not enter the cited fragment, and verification only looks at the entry name without looking at the signature and date.
- Phenomenon: there is no citation superscript in the answer, or the cited fragment does not match the original text. Cause: this round did not hit the corresponding material, or what was hit was an old-version paragraph, and it cannot be directly attributed to length truncation.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: use one week's records to check the totals, see whether the caliber and exceptions are clearly stated, whether the record count and statistical count match, and whether the caliber is written in the header.

- In the node, check whether the selected knowledge base collections and their vector models use the same vector model, and open the search parameter panel to check the values item by item.
- Run a trial with a query that has no matching material, and see whether the citation array is empty while the pipeline continues; then open the citation superscripts against the source documents and check whether each citation can trace back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
