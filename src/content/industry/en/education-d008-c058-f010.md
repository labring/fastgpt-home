---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Access
meta_description: Research Agreements: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Manage Authorized Access and External Services

## What this category's data looks like

In the scenario of signing scientific research project task books, the project task book, the subject task breakdown table, and the budget book are the three types of basic materials. The project task book states the project name, the undertaking unit, the start and end dates, and the signature page; the subject task breakdown table breaks the research content down to subjects and responsible persons, including subject names, task milestones, and deliverables; the budget book lists budget categories, amounts, calculation bases, and the preparation date. When the materials enter the authorized access and external services function, the task book serves as the basis for the external entry point and the scope of authorization, the breakdown table defines the subject level visible to visitors, and the budget book limits the visibility boundary of funding fields. The materials are updated with signing, changes, and stamped receipts, and the version is based on the signature date and the receipt. The field characteristic is cross-table consistency: the name, quantity, and date of the same subject in the two materials must be consistent, and neither the signature nor the receipt can be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length can be 0. The "external entry point and scope of authorization" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge base uses the same vector model and corresponds to the three types of materials: task book, breakdown table, and budget book | Check the selected collection and its vector model in the node, and confirm that all three types of materials are under the same vector model |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal and should not interrupt due to an empty array | Run a test with a question that has no matching materials, observe that the output is empty while the chain continues, and record the array length |
| Citation-to-original-text correspondence | Each citation can be traced back to the original passage in the project task book, breakdown table, or budget book | Open the citation markers in the conversation, compare them with the source documents, and verify each original text fragment and source identifier one by one |
| Search parameters | Consistent with the values set in the knowledge base retrieval section, and citation text is counted in tokens | Open the search parameters panel and verify each item; `quoteMaxToken` is only for content budgeting, and the number of array items is recorded separately |

## Three common errors

- Symptom: The name, quantity, and date of the same subject do not match between the task book and the breakdown table. Cause: During signing, the two materials were maintained separately and archived without cross-comparison.
- Symptom: The budget book version was not synchronized, and the old amount still appears in the externally visible scope. Cause: After the change, the old material in the knowledge base was not replaced, and retrieval hit the old version.
- Symptom: The task book lacks a signature or receipt but is still used as the basis for authorization. Cause: When the material was stored, the signature page and receipt were not validated, and the visitor identity and visible scope were mismatched.

## How to verify the setup

This function's acceptance: ask a question with original-text support and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Open the citation markers one by one, compare the cited fragments with the original text of the project task book, breakdown table, and budget book, and record any inconsistencies.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the output chain runs through, and separately record the array length and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
