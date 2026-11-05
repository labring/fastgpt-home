---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Checks
meta_description: Apprenticeships: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Compare Documents and Locate Differences

## What this category's data looks like

Modern apprenticeship and order-based class management involves three types of materials: school-enterprise cooperation agreements, order-based class training plans, and master-apprentice mentorship records. School-enterprise cooperation agreements are jointly signed by the school and the enterprise, and include the cooperation period, number of positions, signatures, seals, and dates; order-based class training plans are prepared by the teaching team, and include course names, credit hours, class start dates, and approval signatures; master-apprentice mentorship records are filled in weekly by mentoring masters, and include apprentice names, number of apprentices mentored, start and end dates, and master signature receipts. The three types of materials have different update rhythms: agreements are signed by academic year, plans are revised by semester, and mentorship records are submitted weekly or monthly. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. When materials enter the knowledge base retrieval node, each is segmented and indexed as an independent document, and citation output is returned according to hit fragments for subsequent field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the cooperation period, number of positions, signing date, and signatures and seals of both parties are consistent with the ledger | Open the citation superscript, compare the name, quantity, date, and signature against the original document; record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Order-based class training plan | Whether the course names, credit hours, class start date, and approval signature are consistent with the ledger | Compare the plan fields with the ledger fields item by item; check whether the cited fragments in `quoteList` can point back to the original paragraphs of the plan |
| Master-apprentice mentorship record | Whether the apprentice names, number of apprentices mentored, start and end dates, and master signature receipts are consistent with the ledger | Spot-check records weekly or monthly, and check whether signatures and receipts are complete; when citations are empty, check the `quoteMaxToken` budget and hit status |
| Cited content output | The number of returned entries is consistent with the hit materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |

## Three common errors

- Phenomenon: The number of positions for the same record does not match between the agreement and the training plan. Cause: The versions of the two materials are not synchronized, and one party filled it in according to an old version; it is necessary to first check which material was hit in this round before locating the discrepancy.
- Phenomenon: The apprentice names in the mentorship records are inconsistent with the order-based class roster. Cause: Abbreviations or typos in names during entry, without character-by-character verification against the ledger; it is necessary to point back to the original paragraphs for confirmation.
- Phenomenon: The training plan lacks an approval signature or the mentorship record lacks a receipt. Cause: The signing process was not completed before archiving, and after the materials enter the retrieval node, the cited fragments have no signature field.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use a real record to find fields inconsistent with the ledger, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

- Open the citation superscripts in the conversation, compare them one by one against the source documents, and check whether the original text fragments correspond to the citation identifiers
- Run a test with a question that has no matching materials, and confirm that the citation array is empty while the output chain continues to run through

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
