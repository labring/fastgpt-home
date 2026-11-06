---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Intake
meta_description: Joint Education: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-Foreign cooperative education institutions. Materials include the establishment application, cooperation agreement, articles of association, and annual report receipt and signature pages. The establishment application carries fields such as institution name, education level, address, and legal representative; the cooperation agreement stipulates the names of both parties, contribution amounts, signing date, and validity period; the articles of association specify the governance structure, deliberation rules, and sealing requirements; the annual report receipt records the submission time and acceptance status. When materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and citation output is returned as original text fragments with source identifiers, for subsequent nodes to compare fields, write ledgers, and generate reports. The update rhythm follows material versions: a new version of the cooperation agreement, amendments to the articles of association, and supplementary annual report submissions all generate new fragments, while old fragments may still be hit, so source identifiers must be retained at the citation layer for traceability. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record often appears inconsistently across two materials, so citations must be able to point back to specific paragraphs to support missing-item identification and follow-up questions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. "Acceptance records and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans. Even if no content is found, the output chain still runs through, and an empty array is a normal output.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether fields such as name, address, legal representative, and education level are consistent with the cooperation agreement and articles of association, and whether dates and signatures are complete | In the citation array, point back to the original paragraphs one by one, check field values and signing dates, and record inconsistencies |
| Cooperation agreement | Whether the names of both parties, contribution amounts, validity period, signing date, and seals match the application and articles of association, and whether versions are synchronized | Open the cited fragments against the source identifiers, check quantities and dates, and confirm whether signatures or receipts are missing |
| Articles of association | Whether the governance structure, deliberation rules, and sealing requirements are consistent with the statements in the application and cooperation agreement, and whether revised versions are synchronized | Use citation superscripts to locate paragraphs in the articles of association, compare names and dates, and mark items whose versions are not synchronized |
| Annual report receipt | Whether the submission time, acceptance status, and supplementary submission records are consistent with the annual report materials, and whether the receipt and signatures are complete | Search the citation output for receipt fragments, check dates and status, and enter follow-up questions when missing |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and the cooperation agreement. Cause: The two materials were entered separately without field alignment, and the cited fragments are returned independently.
- Phenomenon: The contribution amount or signing date does not match between the two materials. Cause: After the cooperation agreement was revised, old fragments are still hit, and versions are not synchronized, causing citations to point to old paragraphs.
- Phenomenon: The articles of association or receipt lacks a signature, but the answer gives a complete conclusion. Cause: The citation array does not cover the signature page, the missing item is not identified, and the follow-up step is skipped.

## How to verify the setup

This feature's acceptance: ask a question with textual evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through. When checking, record the number of array entries and the `quoteMaxToken` budget; do not compare the two for equality; if a citation upper limit is involved, check the tokens of the citation text, and record the number of array entries separately.

Business test: submit a question missing key information, see whether it asks a follow-up question before answering, and check whether the follow-up items correspond to missing fields in the establishment application, cooperation agreement, or articles of association.

- Open the citation superscripts, verify the original text fragments and source identifiers one by one against the source documents, and confirm that each citation can point back to a specific paragraph.
- Run a test with a question that has no matching materials, observe that the citation array is empty in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` while the chain continues, and record the number of array entries separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
