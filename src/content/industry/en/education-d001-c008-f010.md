---
title: Citations and Source Traceability for School Admissions and Enrollment Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c008-f010
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Citations | Evidence
meta_description: School Admissions: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Admissions and Enrollment Organization: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in primary and secondary school enrollment organizations, involving three types of materials: enrollment plans, application material checklists, and admission lists. Enrollment plans contain fields such as enrollment scope, time nodes, and admission rules; application material checklists contain material names, number of copies, submission dates, parent signatures, and receipts; admission lists contain student names, admission batches, publicity dates, and review signatures. The three types of materials are usually updated by academic year or batch. The names, quantities, and dates of the same record across different materials must be consistent, versions must be synchronized, and signatures or receipts must not be missing. When materials enter this feature, the node outputs only an array of cited content, each item containing the original text fragment and source identifier; the business deliverable is completed by subsequent AI nodes, code nodes, or manual work.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | The enrollment scope, time nodes, and admission rules fields in the plan are consistent with the original text, and the version is current | Open the citation marker, check the fields and dates against the original plan text, and confirm that no version is unsynchronized |
| Application material checklist | The material names, number of copies, submission dates, parent signatures, and receipts in the checklist match the original text | Compare the cited fragments with the original checklist text item by item, and check whether signatures or receipts are missing |
| Admission list | The student names, admission batches, publicity dates, and review signatures in the list are consistent with the original text | Open the citation marker in the conversation, and check the names, quantities, and dates against the original list text |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, and see whether the output is empty while the chain continues |

## Three common errors

- Symptom: The name or date of the same record does not match between the enrollment plan and the admission list. Cause: The versions of the two materials are not synchronized, or fields were not checked during entry.
- Symptom: The application material checklist lacks a signature or receipt, and the signature column cannot be seen in the cited fragment. Cause: The signature page was omitted during material scanning or entry, and no completeness check was performed.
- Symptom: The answer has content but the citation array is empty, or the cited fragments do not match the original text. Cause: No materials were matched in this round, or the matched materials are misaligned with the citation source identifiers.

## How to verify the setup

This feature's acceptance check: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. You can view the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and check the source identifiers in `quoteList`.

Business test: ask a cross-material basis question and see whether the answer provides traceable sources. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If citation limits are involved, check the tokens of the cited text, and record the array item count separately.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that matches no materials, and see whether the output is empty while the chain continues; then open the citation markers and check against the source documents whether each citation can trace back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
