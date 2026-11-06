---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Checks
meta_description: Exam Administration: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Compare Documents and Locate Differences

## What this category's data looks like

This category involves three types of materials: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual defines the process and field definitions, the examination room record sheet records the on-site situation, and the violation fact record carries the basis for determination and handling. The three are aligned by session and candidate object, the update cadence is per exam session, and versions are adjusted with notices or supplementary entries. Field characteristics center on name, quantity, date, and signature: the name, quantity, and date of the same record must be consistent across the two materials; unsynchronized versions will cause field misalignment, and missing signatures or receipts will affect the closure of the materials. When the materials enter the knowledge base retrieval node, each is retrieved as a citation source, and the original text snippet is returned together with the source identifier, for subsequent nodes to compare fields, write ledgers, and generate reports; the citation array itself does not assume the responsibility of judgment.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Whether the fields, dates, and signatures are consistent with the examination room record sheet | Retrieve the manual clauses and the same-session paragraphs of the record sheet, compare name, quantity, date, and signature, and record the discrepant fields |
| Examination room record sheet | Whether the name, quantity, and date of the same record match across the two materials | Take one real record, compare it field by field against the manual and the violation fact record, and mark the inconsistent items |
| Violation fact record | Whether the version is synchronized and whether signatures or receipts are complete | Check the record version and receipts, inspect cases of missing signatures or receipts, and form items pending review |
| Citation content output | Whether the number of citation array entries matches the hit materials, and whether the chain still runs when empty | Check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled); when empty, confirm the chain continues, and record the `quoteMaxToken` budget separately from the number of entries |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the manual and the record sheet. Cause: when entering data, it was not backfilled according to the unified field definitions, or the version was not synchronized, leaving old fields behind.
- Symptom: the violation fact record lacks a signature or receipt, and the material closure is incomplete. Cause: the handling step did not promptly add the signature, or the receipt was not archived together with the record, so only partial snippets can be retrieved.
- Symptom: there is no citation superscript in the answer, or there is an answer but the citation array is empty. Cause: no materials were hit in this round, or the correspondence between citations and the original text was not expanded in the conversation; first check the hit entries, then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs. Check the citation array length in `responseData`, and record the `quoteMaxToken` budget separately; do not compare the two for equality.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, and confirm consistency with the knowledge base retrieval section.
- In the conversation, open the citation superscripts, check against the source documents whether each citation can point back to the original text paragraph, and record the number of citation array entries and the source identifier in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
