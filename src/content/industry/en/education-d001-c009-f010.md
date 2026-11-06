---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Find Supporting Evidence
slug: /en/industry/education-d001-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Evidence
meta_description: Dropout Prevention: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Find Supporting Evidence

## What this category's data looks like

This category's data for compulsory education dropout prevention and control mainly includes three types of materials: dropout risk ledgers, return-to-school persuasion records, and home visit records. Ledger fields usually include student name, class, risk level, registration date, and responsible person's signature; persuasion records include persuasion time, method, result, and parent receipt; home visit records include home visit date, teacher's signature, parent's signature, and student status description. The material sources are each class within the school and the moral education office, updated by semester or by month, and the current effective version prevails. When entering the knowledge base retrieval node, the three types of materials each participate in retrieval as independent sources: the ledger provides the risk list and level basis, the persuasion records provide the process and result basis, and the home visit records provide the family communication and signature basis. The same student's name spelling, dates, and counts may be inconsistent across the three materials, and missing signatures and receipts may also occur. The retrieval output is only responsible for providing traceable original text fragments and source identifiers; field comparison and ledger organization are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The "basis entries that can be traced back to the original text" are completed next by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student name, class, risk level, registration date, and responsible person's signature; the version must be currently effective, and entries must match the original text | Open the citation marker in the conversation, check the name, date, and signature against the original ledger text; record the citation array length, and do not compare the number of entries with `quoteMaxToken` for equality |
| Persuasion records | Fields include persuasion time, method, result, and parent receipt; the same record's name, quantity, and date must be consistent across the two materials | Run a test with a cross-material question and check whether the cited fragments can be traced back to the original persuasion record text; view the citation array and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Home visit records | Fields include home visit date, teacher's signature, parent's signature, and student status description; entries missing signatures or receipts must be marked | Open the search parameter panel and check the values item by item; view the cited content array in `quoteList` and confirm that each citation can be traced back to the original text paragraph |

## Three common errors

- Phenomenon: The same student's name spelling, number of persuasion attempts, and dates do not match between the ledger and the persuasion records. Cause: The two materials are filled in by different steps without unified verification, so each is matched separately during retrieval, and the differences are exposed when the cited fragments are placed side by side.
- Phenomenon: The version cited from the home visit records is inconsistent with the current version, and the old version is still matched during retrieval. Cause: After the materials were updated, the documents in the knowledge base were not synchronously replaced, the versions were not synchronized, and the citation source identifiers still point to the old documents.
- Phenomenon: The persuasion records lack parent receipts, and the home visit records lack teacher signatures, so the cited fragments cannot prove that the process is closed-loop. Cause: When the materials were archived, the signature and receipt fields were not checked; retrieval only matches by text and does not verify field completeness.

## How to verify the setup

Acceptance of this feature: ask a question with an original text basis, and check whether the citation array and citation markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through. When recording the number of citations and `quoteMaxToken`, the number of entries is the array length, and the budget is the citation content budget; the two are not compared for equality.

Business test: ask a cross-material basis question, see whether the answer provides traceable sources, and check whether the cited fragments are consistent with the original text paragraphs.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; then open the citation markers and check against the source documents whether each citation can be traced back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
