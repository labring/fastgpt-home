---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Multilingual
meta_description: Adult Admissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Handle Multilingual Materials and Terminology

## What this category's data looks like

Adult college entrance examination registration and admission management involves three types of materials: registration forms, care bonus point materials, and admission rosters, which respectively record the candidate's basic information, the basis for bonus points, and the admission result. Fields include name, ID number, application level, bonus point item, admitted major, date, and signature. The materials come from provincial admissions agencies, registration points, and institutions, and are updated in batches along with registration, review, and admission batches, so versions are prone to misalignment. In multilingual materials and terminology handling, the three types of materials each play a different role: the registration form provides the field names where terminology first appears, the care bonus point materials provide policy terminology and the basis for translated names, and the admission roster confirms the final list and status wording. After entering the knowledge base retrieval node, these materials are cited as original text fragments from the associated knowledge base, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The unified terminology table and the comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Adult college entrance examination registration form | Whether the fields, date, and signature are complete, and whether the name and ID number are consistent with the care bonus point materials | Open the citation marker to trace back to the original paragraph, check the registration form fields and signature column; record the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Care bonus point materials | Whether the bonus point item name, quantity, and date correspond to the registration form, and whether the receipt is retained | Check the bonus point items and dates against the source document, inspect the receipt; use `quoteList` to view a single cited fragment |
| Admission roster | Whether the admitted major, level, and status wording are consistent with the registration form and bonus point materials, and whether the signature is complete | Compare the names and dates in the admission roster with the registration form and bonus point materials one by one; verify that `quoteMaxToken` is the citation content budget |
| Unified terminology table and comparison draft | Whether the same term is written consistently throughout the entire text, and whether the translated name can be traced back to the original text | Sample three terms and check their wording throughout the entire text, confirming that each citation can be traced back to the original paragraph |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and the admission roster. Cause: The versions of the two materials were not synchronized, and the terminology table was not unified.
- Phenomenon: The quantity or date of bonus point items does not match between the registration form and the care bonus point materials. Cause: The materials were updated in batches, and the cited fragments come from different batches.
- Phenomenon: The admission roster lacks a signature or receipt. Cause: The signature column and receipt retention were not checked before publication, and the citation did not cover that page.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has an original text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business testing: sample three terms and check whether their wording is consistent throughout the entire text, and confirm that the translated names can be traced back to the original text.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, and see that the citation array is empty while the output pipeline continues; record the number of citations separately, and do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
