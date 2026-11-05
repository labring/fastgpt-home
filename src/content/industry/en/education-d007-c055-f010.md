---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Review
meta_description: Adult Admissions: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results

## What this category's data looks like

Adult college entrance examination registration and admission management involves three core types of materials: registration forms (including the candidate's basic information, examination category, and signature field), preferential scoring materials (including the scoring item, certificate number, review signature, and receipt), and admission rosters (including the admission batch, major, planned number, date, and responsible person's signature). The material sources are registration system exports, scans of paper originals, and level-by-level review receipts. The update cadence advances with the three stages of registration, review, and admission. The field characteristics use name, ID number, scoring item, date, quantity, and signature as key anchors. When entering the exception tracing and manual review function, the registration form serves as the main record to locate the candidate's identity, the preferential scoring materials serve as supporting evidence to verify the basis for the bonus points and the completeness of the receipt, and the admission roster serves as the result record to compare the admission status and planned number. The three types of materials serve as sources for one another, supporting the generation of the exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. Even if no content is found, the output chain will still run through. The exception list and review conclusions are completed afterward by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Check the name, ID number, examination category, signature field, and date, and confirm consistency with the same record in the preferential scoring materials and admission roster | Open the citation marker, point back to the original paragraph in the registration form, and compare field by field; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |
| Preferential scoring materials | Check whether the scoring item, certificate number, review signature, and receipt are complete, and confirm that the name, quantity, and date match those in the registration form and admission roster | Retrieve the cited content array, view the source identifier in `responseData` (non-streaming module results returned with detailed output enabled), and point back to the original text of the scoring materials; if the signature or receipt is missing, mark it as an exception |
| Admission roster | Check the admission batch, major, planned number, date, and responsible person's signature, and confirm consistency with the same record in the registration form and preferential scoring materials | Open the citation marker in the conversation and compare it against the original text of the admission roster; use `quoteList` to view the correspondence between the cited fragment and the original text, and if the version is not synchronized, mark it as an exception |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and the admission roster. Cause: No unified standard was applied during entry, or the versions were not synchronized, causing the two materials to be updated separately.
- Phenomenon: The certificate number in the preferential scoring materials does not match the receipt number in the registration form. Cause: The version of the scoring materials was not synchronized, or the receipt was not archived together with the review result.
- Phenomenon: The admission roster lacks the responsible person's signature or the receipt is missing. Cause: The signature circulation was not completed during the review step, or the receipt was omitted during transmission, making the exception untraceable.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the cited content array and citation marker can point back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the output chain still runs through.

Business test: create an exception record, see whether it can be traced to the source material, and confirm that the exception is supported by the original record and, after the reviewer signs, is handed to the responsible person for handling.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check each item, confirming that the values are consistent with those set in the knowledge base retrieval section; record the number of citations, and separately check the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
