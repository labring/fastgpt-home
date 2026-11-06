---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Find Supporting Evidence
slug: /en/industry/education-d001-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Evidence
meta_description: Research Agreements: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Find Supporting Evidence

## What this category's data looks like

This category's data looks like this: The scenario of signing scientific research project task books involves three types of core materials: the project task book, the subject task breakdown table, and the budget book. The task book states the project name, undertaking unit, start and end dates, and signature fields; the breakdown table lists subject names, responsible persons, task milestones, and deliverables; the budget book gives subject amounts, preparation dates, and approval signatures. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source: the task book provides the overall basis, the breakdown table provides the basis for task division, and the budget book provides the funding basis. The update rhythm of materials usually keeps pace with project approval, budget adjustments, or subject changes, but version lag often occurs in practice: the same subject name is written differently in the task book and the breakdown table, the same milestone date differs by several days between the two materials, and the budget amount is not written back after adjustment. Missing signatures and receipts are also common in scanned copies or supplementary signing processes. In terms of field characteristics, the task book emphasizes names and dates, the breakdown table emphasizes tasks and responsible persons, and the budget book emphasizes subjects and amounts; only by cross-checking the three can a complete basis chain be formed.

## Configuration and implementation checks

Configuration and implementation checks: This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text fragment and source identifier, and the length can be 0. The basis entries that can be traced back to the original text are completed by subsequent AI nodes, code nodes, or manual work. Even if no content is retrieved, the output link will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Name, dates, and signature fields are consistent with the current version | Open the citation superscript, compare it with the original paragraph of the task book, check whether the project name, start and end dates, and signature fields are complete, and confirm that the version is current |
| Subject task breakdown table | Subject names, responsible persons, and task milestones correspond to the task book | Locate the breakdown table source identifier in the citation array, compare subject names and task milestone dates one by one, and record inconsistencies with the task book |
| Budget book | Subject amounts, preparation dates, and approval signatures can be traced back to the original text | Check the subjects and amounts in the citation fragments, compare them with the original budget book, confirm the preparation dates and approval signatures, and check whether they are synchronized with the adjusted version |
| Citation content output | The number of returned entries matches the hit materials; empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the link continues; record the array length, and separately check `quoteMaxToken` and the citation text in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: the same subject name is written differently in the task book and the breakdown table. Cause: the two materials were prepared by different personnel, no unified name check was performed, and when cited they each trace back to the original text, so the difference is retained.
- Phenomenon: task milestone dates differ by several days between the two materials. Cause: after the breakdown table was updated, it was not synchronized back to the task book, the versions were not synchronized, and the citation array hits both versions at the same time, requiring manual comparison.
- Phenomenon: the budget book lacks approval signatures or receipts. Cause: the scanned copy omitted the signature page, or the supplementary signing process was not completed, so the citation fragment only contains amounts and subjects, and the signature fields are not visible.

## How to verify the setup

How to verify the setup: Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the link runs through. Check the number of citation entries in `responseData` and `quoteMaxToken` and record them separately; do not make an equality comparison.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and check whether the names, quantities, dates, and signatures of the task book, breakdown table, and budget book can be matched one by one against the original text.

- In the conversation, open the citation superscripts, compare them one by one with the source documents, confirm that each citation can trace back to the original paragraph, and record the array length and the `quoteMaxToken` value.
- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and run a test with a no-match question to observe whether the output is empty while the link continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
