---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Multilingual
meta_description: Program Revision: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology

## What this category's data looks like

Multilingual materials and terminology processing in undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. The program plan provides the general provisions and curriculum system, the course syllabus carries course names, content, and assessment methods in various languages, and the credit structure table records the credits and class hour allocation for each module. Materials often enter the knowledge base as parallel multilingual versions, such as Chinese and English, and the same term must maintain consistent translations across materials in different languages, with translations able to refer back to the original paragraphs. Fields include course name, course code, credits, class hours, semester offered, revision date, and signature field. The revision pace advances by academic year or training cycle, with frequent version iterations, and it is common for the same record to have mismatched names, quantities, or dates across two materials, unsynchronized versions, or missing signatures or receipts. After these materials enter the knowledge base retrieval node, each serves as a citation source, providing original text fragments for subsequent terminology comparison and draft generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. The unified terminology table and the comparison draft are completed subsequently by AI nodes, code nodes, or manual work. Even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, course code, credits, revision date, and signature field are item-by-item consistent with the course syllabus and credit structure table | In the node, check the selected knowledge base collections and their vector models; open the search parameter panel and check item by item; use the conversation citation markers to compare against the source documents |
| Course syllabus | Whether the name, credits, class hours, and semester offered of the same course match across multilingual versions, and whether the translations can refer back to the original paragraphs | Sample three terms and check whether their spelling is consistent throughout; check whether the number of citation array entries matches the hit materials; an empty result is also normal |
| Credit structure table | Whether the credits, class hours, revision date, and signature field of each module are consistent with the program plan and course syllabus, and whether the versions are synchronized | Run a test with a question that has no matching materials and see whether the output is empty while the chain continues; record the number of array entries and separately check the tokens of the citation text |
| Multilingual terminology comparison draft | Whether the same term is spelled consistently throughout, and whether the translations can refer back to the original text | Open the citation markers in the conversation and compare against the source documents; check whether the citation fragments in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original paragraphs |

## Three common errors

- Phenomenon: The same course name is written differently in the program plan and the course syllabus. Cause: The two materials' versions are not synchronized, or the terminology table is not unified, causing the citation fragments to fail to match the original text.
- Phenomenon: The credit count for the same module does not match across the two materials. Cause: The credit structure table was not updated along with the program plan revision, or the citation hit an old version of the material.
- Phenomenon: The revision date or signature field is inconsistent across the two materials. Cause: Missing signatures or receipts, and the material entered the knowledge base before the process was completed, so the citation source cannot refer back to a valid version.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, check whether the citation array and citation markers can refer back to the original paragraphs, and confirm that each citation in `responseData` contains an original text fragment and a source identifier; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: sample three terms and check whether their spelling is consistent throughout, and check whether the translations of the same term in the program plan, course syllabus, and credit structure table can refer back to the original text.

- Open the search parameter panel and check item by item, confirm that the associated knowledge bases use the same vector model, and record the number of citation array entries; the number of citation entries is the array length, and `quoteMaxToken` is the citation content budget, so the two are not compared for equality.
- Open the citation markers in the conversation, compare against the source documents, and check whether the citation fragments in `quoteList` correspond to the original paragraphs; run a test with a question that has no matching materials and confirm that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
