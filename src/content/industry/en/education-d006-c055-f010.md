---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Progress
meta_description: Adult Admissions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Track Progress and Check Statistics

## What this category's data looks like

The data for this category looks like this: Adult college entrance examination registration and admission management involves three types of materials: registration forms, care bonus point materials, and admission rosters. Registration forms record the candidate's basic information, application level, and subjects; dates and signatures are used to confirm responsibility for the filing. Care bonus point materials carry the bonus item name, quantity, and certification date, and are often accompanied by receipts or acknowledgment records. Admission rosters list admitted candidates, majors, and admission dates by batch, and must correspond item by item with registration forms and bonus point materials. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source: registration forms are used to verify identity and application information, bonus point materials are used to verify the basis for bonus points and signatures, and admission rosters are used to verify admission results and dates. The material update rhythm advances through the three stages of registration, review, and admission, and the version is based on the latest receipt or signature page. Field characteristics are concentrated in four items: name, quantity, date, and signature. If the same record has inconsistent name spelling, quantity scope, or date format across different materials, or if versions are not synchronized and signatures and receipts are missing, deviations will occur in progress records and statistical verification.

## Configuration and implementation checks

How to configure it: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The "progress table and statistical scope description" is completed next by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Whether the name, date, and signature are consistent with the bonus point materials and admission roster | Compare the name, application level, and date in the registration form and admission roster item by item, and check whether the signature column and receipt are complete |
| Care bonus point materials | Whether the bonus item name, quantity, and certification date are clearly written and accompanied by a receipt | Compare the bonus point materials with the registration form, check the item name, quantity scope, and date format, and inspect the signature and receipt |
| Admission roster | Whether the number of admitted candidates, majors, and dates match the registration form and bonus point materials | Check the number of records in the admission roster against the registration form and bonus point materials by batch, and check whether the versions are synchronized |
| Cited content array | Whether the number of returned entries matches the matched materials; empty is also normal | Check the citation array and badges in `responseData` (non-streaming module results returned with detailed output enabled), verify whether the `quoteList` field can point back to the original paragraph, and only check the citation text budget for `quoteMaxToken` |

## Three common errors

- Phenomenon: The same candidate's name spelling or quantity does not match across two materials. Cause: The entry scope of the registration form and bonus point materials is not unified, abbreviated names and quantity units are inconsistent, and item-by-item verification against the same record was not performed.
- Phenomenon: The dates in the admission roster and registration form do not match. Cause: Versions are not synchronized; after materials are updated during the review stage, the admission roster is not backfilled, and old and new versions coexist, causing date discrepancies.
- Phenomenon: Bonus point materials lack a signature or receipt. Cause: Acknowledgment records were not fully collected during material circulation, and the signature page and receipt were not archived together with the materials, making responsibility impossible to confirm during statistics.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and badges can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly written.

- Compare the name, quantity, date, and signature in the registration form, bonus point materials, and admission roster item by item, write the scope into the header, and list exceptions separately.
- Open the citation badges to compare against the source documents, and check whether `quoteList` is consistent with the original paragraph; record the number of array entries separately, and only check the citation text budget for `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
