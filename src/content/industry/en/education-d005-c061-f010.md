---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Versions
meta_description: Research IP: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Maintain Document Versions and Changes

## What this category's data looks like

This category's data involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, completion date, and registration number, and are usually initiated by the research management department; patent disclosure documents carry the technical solution, inventors, filing date, and signature page, and are submitted by the inventors; software copyright materials include the software name, version number, development completion date, ownership, and stamped receipt. The three types of materials often enter the knowledge base in batches in the form of revised drafts, supplementary explanations, and scanned receipts, with the update cadence following approval milestones and correction notices. After the materials enter the knowledge base retrieval node, each participates in search as its own citation source: achievement registration forms are used to verify the achievement name and completion date, patent disclosure documents are used to verify the inventors and filing date, and software copyright materials are used to verify the version number and ownership. The name, quantity, and date of the same record may not match across different materials; when versions are not synchronized or signature receipts are missing, citation snippets will show discrepancies, which subsequent nodes or humans need to compare accordingly.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing the original text snippet and source identifier, and the length may be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the achievement name, contributors, completion date, registration number, and signature field are complete, and whether the name and date of the same record match those in the patent disclosure document | Open the citation markers in the knowledge base retrieval node, compare them against the original paragraphs of the achievement registration form, and record the fields and dates; use `quoteList` to view the details of the matched materials and confirm that the number of citations matches the matched materials |
| Patent disclosure document | Whether the technical solution name, inventors, filing date, and signature page are complete, and whether they are consistent with the version number and development completion date in the software copyright materials | Check the original paragraphs pointed to by each citation snippet one by one, and compare the inventor names and filing date; if the citation array is empty, first check whether any materials were matched in this round, then check the `quoteMaxToken` budget |
| Software copyright materials | Whether the software name, version number, development completion date, ownership, and stamped receipt are complete, and whether they match the quantity and dates in the achievement registration form | Open the search parameter panel and check the values item by item; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation output structure and confirm that each citation contains the original text snippet and source identifier, and record the array length separately |

## Three common errors

- Symptom: The name and completion date of the same achievement do not match between the achievement registration form and the patent disclosure document. Cause: The two materials were revised in batches, the old version was not marked as invalid, and the citation snippets each point back to different versions.
- Symptom: The version number in the software copyright materials and the registration number in the achievement registration form are not synchronized. Cause: After the correction notice, only one material was updated while the other remained the old version, and the citation source identifier points to the old record.
- Symptom: The patent disclosure document is missing the signature page or the software copyright materials are missing the receipt. Cause: The scanned copy is incomplete, the citation snippets only cover the body text, and the signature and receipt fields cannot be traced back to the original text.

## How to verify the setup

Acceptance for this feature: ask a question that has an original-text basis, check whether the citation content array and citation markers can point back to the original paragraphs, and confirm that each citation contains the original text snippet and source identifier; then ask a question with no matching materials, and confirm that the array is empty while the output pipeline still runs through.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the knowledge base retrieval node, check the selected collections and their vector models, and confirm that the selected knowledge bases use the same vector model; open the search parameter panel and check the values item by item.
- Run a trial with a query that has no matching materials, and see that the output is empty while the pipeline continues; open the citation markers in the conversation, compare them against the source documents, and confirm that the citation snippets correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
