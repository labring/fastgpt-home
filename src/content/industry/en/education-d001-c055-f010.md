---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Find Supporting Evidence
slug: /en/industry/education-d001-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Evidence
meta_description: Adult Admissions: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Find Supporting Evidence

## What this category's data looks like

Adult college entrance examination registration and admission management involves three types of materials: registration forms, care bonus materials, and admission rosters. Registration forms carry the candidate's basic information, application level, and signed confirmation; care bonus materials carry the bonus item, certificate number, review opinion, and receipt; admission rosters carry the admission batch, major, planned number, and admission conclusion. The three types of materials corroborate each other on fields, dates, and signatures, and it is common for names, quantities, and dates to fail to match, for versions to be out of sync, and for signatures or receipts to be missing. After the materials enter the knowledge base retrieval node, each is cited as an original text fragment: registration forms are used to verify identity and application information, care bonus materials are used to verify the bonus basis and review chain, and admission rosters are used to verify admission results and roster standards. The update rhythm advances with the admissions year and review batches; old versions of materials should be replaced by the current version, and citations must be able to point back to the specific paragraph and source identifier.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The basis entries that can point back to the original text are completed by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, or generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Whether the fields, dates, and signatures match the care bonus materials and admission roster | Open the citation marker, compare the name, certificate number, application level, and signature date in the registration form, and record the source identifier in `quoteList` |
| Care bonus materials | Whether the bonus item, certificate number, review opinion, and receipt are complete and the version is current | Check the cited fragment against the original paragraph, confirm that the bonus item name and quantity are consistent in both materials, and mark it if the receipt is missing |
| Admission roster | Whether the admission batch, major, planned number, and admission conclusion are consistent with the registration form standards | Compare the names, quantities, and dates in the roster and the registration form one by one, record the number of entries in the citation array separately, and use `quoteMaxToken` to check the budget for the tokens of the cited text |
| Cited content output | The number of returned entries is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) may be 0 |

## Three common errors

- Phenomenon: the same candidate's name is written differently in the registration form and the admission roster. Cause: the two materials were entered at different times and with different standards, and field alignment was not performed.
- Phenomenon: the certificate number in the care bonus materials does not match the quantity recorded in the registration form. Cause: the versions are out of sync, and the old version of the materials is still within the citation scope.
- Phenomenon: the review opinion column lacks a signature or receipt. Cause: the material circulation step was not completed, and the cited fragment only presents the existing content.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- In the conversation, open the citation markers, compare them against the source documents, and confirm that each citation can point back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
