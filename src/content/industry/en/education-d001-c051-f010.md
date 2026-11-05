---
title: Citations and Source Traceability for College Entrance Exam Application Eligibility: Find Supporting Evidence
slug: /en/industry/education-d001-c051-f010
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Citations | Evidence
meta_description: Entrance Exam Eligibility: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Entrance Exam Application Eligibility: Find Supporting Evidence

## What this category's data looks like

In the general college entrance examination registration qualification review scenario, materials fall into three categories: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrating parents. The registration form carries the candidate's basic information, examination category, and signature confirmation; the household registration and student status certificates carry the household registration address, the school where the student status is held, and the start and end dates of enrollment; the materials for children accompanying migrating parents carry the residence permit, social insurance contributions, and parents' employment information. When the three types of materials enter the knowledge base retrieval node, their roles differ: the registration form is the primary record, the household registration and student status certificates are used for cross-checking identity and enrollment trajectory, and the materials for children accompanying migrating parents are used to supplement qualification conditions. Materials are updated according to the annual admissions cycle; after the policy documents for the new year are released, old versions must be marked as invalid. Field characteristics are concentrated in name, ID number, household registration address, school name, start and end dates of enrollment, number of social insurance months, and signature field; the names, quantities, and dates of the same record often do not match across two materials, and version desynchronization and missing signatures or receipts also occur from time to time.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether the name, ID number, examination category, and signature field are consistent with the household registration and student status certificates, and whether the signing date is within the current year's registration cycle | Check the original fields and signature page of the registration form, and trace the cited fragment back to the paragraph where it appears |
| Household registration and student status certificates | Whether the household registration address, school name, and start and end dates of enrollment align item by item with the registration form, and whether the issue date is earlier than the registration deadline | Open the citation markers against the source documents and check whether each citation can be traced back to the original text |
| Materials for children accompanying migrating parents | Whether the residence permit validity period, number of social insurance months, and parents' employment information are consistent with what is filled in the registration form, and whether the receipts are complete | Compare fields and dates item by item, record inconsistent items, and mark the source |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal; the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is recorded separately | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues |

## Three common errors

- Phenomenon: The name or ID number of the same candidate does not match across two materials. Cause: An alias or old ID number was used during entry, and unification was not performed based on the primary record of the registration form.
- Phenomenon: The issue date of the household registration and student status certificates is earlier than the previous year, yet it is still cited as the current version. Cause: Material versions are not synchronized, and old-version files are not marked as invalid.
- Phenomenon: The materials for children accompanying migrating parents lack a parent's signature or social insurance receipt, but the cited fragment only captures the main text. Cause: Pages are missing from the scanned copy, and citations are returned according to the matched paragraph, without covering the signature page.

## How to verify the setup

This feature's acceptance: ask a question with a basis in the original text, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question, and see whether the answer provides a traceable source.

- Open the citation markers in the conversation, and check item by item against the source documents whether the cited fragments are consistent with the original paragraphs.
- Open the search parameter panel and check the values item by item, confirming that `quoteMaxToken` is the citation content budget, that the number of citations is recorded separately by array length, and that the source identifier is retained in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
