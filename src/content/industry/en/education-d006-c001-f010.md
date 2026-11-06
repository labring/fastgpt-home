---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Progress
meta_description: Kindergarten Care: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Track Progress and Check Statistics

## What this category's data looks like

Kindergarten childcare daily life management involves materials such as daily life schedules, morning and afternoon check records, and child health observation records. The daily life schedule provides the names of segments, time periods, and responsible persons; the morning and afternoon check records register by date the child's name, body temperature, throat and hand conditions, handling opinions, and signatures; the child health observation records supplement observation items such as water intake, meals, naps, bowel movements, and emotions. The three types of materials are updated daily and summarized weekly, with fields including date, child's name, segment or observation item, quantity or status, signature, and receipt. When entering the knowledge base retrieval node, the schedule serves as the baseline for standards, the morning and afternoon check records and health observation records serve as detailed sources, and the cited fragments are used to refer back to the original paragraphs for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text fragment and source identifier, and the length can be 0. Even if no content is found, the output chain will still run through. The "Progress Table and Statistical Standards Description" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the segment names, time periods, responsible persons, and dates match the morning and afternoon check records and health observation records, and whether the standards are written in the header | Open the citation corner mark to refer back to the original paragraphs, check item by item the names, dates, and signatures, and record the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Morning and afternoon check records | Whether the child's name, body temperature, handling opinions, and signature receipt are complete, and whether the quantity and date of the same record are consistent in the two materials | Check the original text fragments in `quoteList` against the source documents, confirm that the number of citations matches the hit materials, and record separately when empty |
| Child health observation records | Whether observation items such as water intake, meals, naps, and bowel movements correspond to the segments in the schedule, whether versions are synchronized, and whether signatures or receipts are missing | Use one week's records to check the totals, verify the tokens of the cited text and the `quoteMaxToken` budget, and record the array length separately |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameters are consistent with the values in the knowledge base retrieval section | Check the selected collection and vector model in the node, open the search parameter panel and check item by item, and use a no-match question to test that the output is empty while the chain continues |

## Three common errors

- Phenomenon: The same child's name is written inconsistently in the daily life schedule and the morning and afternoon check records, and the dates also do not match. Cause: The two materials are registered separately, and no reference back to the original paragraphs was made according to the same standards for verification.
- Phenomenon: The health observation record has been updated to a new version, but the cited fragments still point to the old paragraphs, and the quantity and totals do not match. Cause: The versions were not synchronized, and the correspondence between citations and original text was not rechecked as the materials were updated.
- Phenomenon: The morning and afternoon check records lack signatures or receipts, but the statistical counts are still included in the totals. Cause: Exceptions were not clearly written, the standards were not placed in the header, and empty or missing items were not recorded separately during verification.

## How to verify the setup

Acceptance of this function: Ask a question with original text evidence, check whether the citation array and corner marks can refer back to the original paragraphs, and record the array length; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Use one week's records to check the totals, see whether the standards and exceptions are clearly written, verify the tokens of the cited text and the `quoteMaxToken` budget, and record the array length separately.

- Open the citation corner marks in the conversation and check the original text fragments and source identifiers one by one against the source documents.
- Run a test with a question that has no matching materials, confirm that the output is empty while the chain continues, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
