---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Multilingual
meta_description: Skills Competitions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data involves three types of materials in vocational college skills competition organization: competition regulations, registration forms, and training plans. Regulations contain the event name, group, date, and signature field; registration forms contain the contestant's name, ID number, competition event, and receipt; training plans contain stages, class hours, and the instructor's signature. These three types of materials often circulate across versions: after regulations are revised, registration forms are not synchronized, and training plans continue to use old dates, causing names, quantities, and dates in the same record to fail to match, or signatures and receipts to be missing. When materials enter the knowledge base retrieval node, regulations serve as the source of terminology definitions, registration forms serve as the source of personnel and event fields, and training plans serve as the source of time and signatures, each taking on a different citation role. The update rhythm is mainly pre-competition revision; after each revision, it is necessary to re-check whether the cited fragments can point back to the original paragraphs, ensuring that the terminology list and comparison draft are traceable.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original fragment and a source identifier, and the length can be 0. The "unified terminology list and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the event name, group, date, and signature field are consistent with the registration form and training plan | In the cited content, check the regulation fragments against the registration form fragments, compare the event name, group, and date item by item, and confirm whether the signature field is missing |
| Registration form | Whether the contestant's name, competition event, and receipt match the regulations and training plan | Use citation superscripts to point back to the original registration form, check the name, event, and receipt fields, record the number of array items and the `quoteMaxToken` budget, and do not perform equality comparison |
| Training plan | Whether the stages, class hours, and instructor's signature are synchronized with the regulation dates | Open the citation superscripts to compare against the original training plan, check the stages and class hours, confirm that the instructor's signature and receipt are complete, and view the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Unified terminology list and comparison draft | Whether the same term is written consistently throughout and the translated name can point back to the original text | Extract three terms, check in the citation array whether the writing is consistent throughout, and verify whether the translated name can point back to the original paragraphs |

## Three common errors

- Phenomenon: The same event name is written differently in the regulations and the registration form. Cause: After the regulations were revised, the registration form was not synchronized, the cited fragments each point back to different versions, and no full-text comparison was performed.
- Phenomenon: The training plan date does not match the regulation date. Cause: The versions were not synchronized, the old training plan is still in the knowledge base, and retrieval hit the old fragment without checking the version number.
- Phenomenon: The registration form is missing a signature or receipt. Cause: The materials were not fully collected during circulation; although the citation array has items, the corresponding fields are empty, and it is necessary to point back to the original text for confirmation.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has an original-text basis, and check whether the citation array and superscripts can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: extract three terms and check whether the writing is consistent throughout

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a trial with a query that has no matching materials, observe that the output is empty while the pipeline continues, record the number of array items, and separately check the tokens of the cited text and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
