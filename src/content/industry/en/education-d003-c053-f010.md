---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Intake
meta_description: Admissions Health Exams: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

In the college admissions physical examination organization scenario, materials are mainly of three types: physical examination forms, re-examination applications, and restricted-major notifications. Physical examination forms record height and weight, vision and color perception, past medical history, and physician signature; re-examination applications contain the application date, re-examination items, and approval signature; restricted-major notifications contain the major name, basis for restriction, and candidate receipt. The three types of materials are often aggregated by different departments and in different batches, with inconsistent field naming and date formats. The name, quantity, and date of the same record may not match across different materials, and version desynchronization, missing signatures, or missing receipts also occur from time to time. When the materials enter the Q&A acceptance and missing-item follow-up function, the physical examination form serves as the main record carrying the basic fields, the re-examination application serves as process material supplementing the re-examination conclusion, and the restricted-major notification serves as result material providing the restricted destination; together the three constitute the citation sources for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text snippet and a source identifier, and the length may be 0. "Accepted records and items to be completed" is then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether fields, dates, and signatures are complete, and whether past medical history and physician signature correspond | In the citation array, refer back item by item to the original paragraphs of the physical examination form, and verify the name, item name, examination date, and signature field |
| Re-examination application | Whether the application date, re-examination items, and approval signature are consistent with the physical examination form records | Open the citation marker to compare against the source document of the re-examination application, compare the re-examination item names and dates, and record the number of array items |
| Restricted-major notification | Whether the restricted major name, basis for restriction, and candidate receipt match | In the citation snippets, verify the major name and basis for restriction, and confirm whether the receipt signature or receipt date exists |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, observe that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, record the number of citations separately, and use `quoteMaxToken` only for content budget verification |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the physical examination form and the re-examination application. Cause: The two departments did not unify the field conventions during data entry, versions were not synchronized, and the citation snippets each refer back to the original text, requiring manual comparison.
- Phenomenon: The major name in the restricted-major notification does not match the conclusion in the physical examination form. Cause: The version of the notification basis was not synchronized, and the old version of the major catalog is still in the citation sources, requiring verification of material dates and signatures.
- Phenomenon: The re-examination application lacks an approval signature or candidate receipt. Cause: The material circulation step was not closed-loop; although the citation array can return snippets, field completeness is insufficient, requiring follow-up for supplementary documents.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through, the number of citations is recorded according to the array length, and `quoteMaxToken` only verifies the tokens of the citation text.

Business test: submit a question missing key information and see whether it first asks a follow-up question before answering.

- In the node, verify the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, and confirm that the citation snippets in `quoteList` correspond to the original paragraphs.
- Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; then for a question with matches, open the citation markers and verify the fields, dates, and signatures against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
