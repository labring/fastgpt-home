---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Multilingual
meta_description: Study Abroad Safety: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the scenario of pre-departure training and overseas safety reminders, materials fall into three categories: pre-departure training courseware, safety reminder checklists, and accommodation contact forms, all of which contain fields, dates, and signatures. The courseware carries terminology and procedures, the safety checklist carries key points for risk handling, and the accommodation form carries contact fields and acknowledgments. Multilingual materials and terminology handling require that the same term be consistent throughout the entire text and that translated names can refer back to the original text; therefore, when the materials enter the knowledge base retrieval node, their respective roles are: the courseware and checklist provide terminology source fragments, the accommodation form provides field and date fragments, and the source identifier is used for back-reference. The update rhythm follows batches and versions, and it is common for the same record's name, quantity, and date to fail to match across two materials, for versions to be out of sync, and for signatures or acknowledgments to be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing a source fragment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Whether the terminology and procedure fields, dates, and signatures are consistent with the comparison draft, and whether the translated names can refer back to the original text | Sample three terms to check whether their spelling is consistent throughout the entire text, verify the fields and dates, and check `quoteList` and `responseData` (non-streaming module results returned with detailed output enabled) |
| Safety reminder checklist | Whether the safety item names, quantities, and dates match the courseware, and whether the versions are in sync | Compare the names and quantities of the two materials item by item, and record the `quoteMaxToken` budget separately from the number of array items |
| Accommodation contact form | Whether the contact fields, dates, and signature acknowledgments are complete, and whether the same record's name is consistent | Verify the signatures and acknowledgments, open the citation superscript to compare against the source document, and check `quoteList` to refer back to the original paragraph |

## Three common errors

- Phenomenon: The same record's name, quantity, and date fail to match between the courseware and the safety checklist. Cause: The two materials are updated separately, and terminology and field alignment has not been done.
- Phenomenon: The accommodation contact form lacks signatures or acknowledgments, and the published draft still carries the old version. Cause: The versions are out of sync, and the acknowledgment has not been collected before entering the next step.
- Phenomenon: There is no citation superscript in the answer, and the cited fragments do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has a basis in the original text, and check whether the citation array and superscript can refer back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: sample three terms to check whether their spelling is consistent throughout the entire text

- Open the search parameter panel and check the values item by item, and in the node check the selected collections and their vector models
- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and separately record the number of array items and the tokens of the cited text

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
