---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Find Supporting Evidence
slug: /en/industry/education-d001-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Evidence
meta_description: Pastoral Education: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Find Supporting Evidence

## What this category's data looks like

This page focuses on business basis queries in the context of school moral education and homeroom teacher work, involving three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans record the activity theme, time, location, and homeroom teacher signature; after entering the knowledge base, they serve as the basis for activity design and execution. Student comprehensive quality records contain fields such as ideological and moral character, academic level, and physical and mental health, as well as semester dates and review signatures; after entering, they serve as the basis for evaluation and conclusions. Home visit records contain the home visit subject, time, location, communication content, and parent receipt; after entering, they serve as the basis for home-school communication. Materials are updated by semester or month, and the version is marked as current by the date and signature within the file. The names, quantities, and dates of the same record in different materials must correspond to one another. Versions lacking signatures or receipts do not enter the basis entries.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. "Basis entries that can be traced back to the original text" are completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields include theme, time, location, and homeroom teacher signature; the name and date of the same activity can be matched across two materials | Open the citation marker and compare it with the source document; verify that the original text fragment of that citation in `responseData` (non-streaming module results returned with detailed output enabled) matches the plan fields |
| Student comprehensive quality record | Fields include ideological and moral character, academic level, physical and mental health, etc.; semester dates and review signatures are complete; the version is current | Open the citation marker in the conversation; verify the record version and signature column pointed to by the source identifier in `quoteList` |
| Home visit record | Fields include home visit subject, time, location, communication content, and parent receipt; entries missing the receipt are not used as basis | Run a test with a cross-material question; verify that the number of items in the citation array matches the hit materials; `quoteMaxToken` is only used for content budget verification |
| Citation content output | The number of returned items matches the hit materials; empty is also normal, and the chain continues | Run a test with a question that has no matching materials; check that the output is empty while the chain still runs through |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the themed class meeting plan and the home visit record. Cause: The two materials are maintained separately, and field alignment was not performed by the same activity or the same student.
- Phenomenon: The version of the student comprehensive quality record is not synchronized, and the old version's signature is still in the citation. Cause: The updated file did not replace the old version in the knowledge base, and retrieval hit the old passage.
- Phenomenon: A home visit record lacks the parent receipt or homeroom teacher signature but is still treated as a basis entry. Cause: The signature and receipt fields were not checked before the material was entered into the knowledge base, and the cited fragment only captured the body text.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, verify whether the citation array and markers can be traced back to the original text, and verify the source identifier of each citation in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and verify that the number of citations and `quoteMaxToken` are recorded separately.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify item by item that the values are consistent with those set in the knowledge base retrieval section, and verify that the tokens of the cited text in `quoteList` and the number of array items are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
