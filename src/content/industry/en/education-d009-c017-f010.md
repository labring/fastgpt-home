---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Multilingual
meta_description: Undergraduate Programs: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses multilingual materials and terminology processing in undergraduate program setup and dynamic adjustment, involving three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The application form provides fields such as program name, code, degree-granting category, and application date; the cultivation plan gives the curriculum system, credits and class hours, and graduation requirements, and includes a foreign-language terminology comparison; the expert review opinions record the review conclusion, expert signatures, and dates. The materials run in parallel in multiple languages, and the same term may be written differently in different texts, so a unified terminology table and comparison draft need to be established. When the materials enter the knowledge base retrieval node, each is indexed as an independent source, and the citation output is returned as original text fragments, for subsequent use in comparing fields, writing ledgers, and generating reports. The update rhythm changes with application batches and review rounds, and versions and signature pages need to be retained.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology table and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Check the name, code, degree category, application date, and signature field, and confirm that they can be matched item by item with the cultivation plan and expert review opinions | Open the citation marker to point back to the original text paragraph, record the number of citations and the `quoteMaxToken` budget, and record the number of citations separately |
| Talent cultivation plan | Check the course names, credits and class hours, graduation requirements, and foreign-language terminology comparison, and confirm that the same term is written consistently throughout and can point back to the original text | Open the citation marker in the conversation to compare against the source document, and check the citation fragments in `responseData` (non-streaming module results returned with detailed output enabled) against the original text paragraphs |
| Expert review opinions | Check the review conclusion, expert list, date, and signature receipt, and confirm consistency with the names, quantities, and dates in the application form and cultivation plan | Run a test with a question that has no matching materials, see that the citation array is empty while the chain continues, and check the matched materials in `quoteList` |
| Unified terminology table and comparison draft | Check that the same term is written consistently throughout and that the translated name can point back to the original text, and confirm that the version and signature status are synchronized | Sample three terms to check whether their writing is consistent throughout, and compare the source identifiers and original text fragments one by one |

## Three common errors

- Symptom: the program name, course count, and dates for the same record do not match between the application form and the cultivation plan. Cause: the two materials are maintained separately, without field-level comparison and version synchronization.
- Symptom: expert review opinions lack signatures or receipts but are still cited as a valid source. Cause: before the materials enter the retrieval node, the signature page and receipt are not checked, and citations only return original text fragments.
- Symptom: citation fragments do not match the original text, or the answer has content but the citation array is empty. Cause: first check whether this round has a hit and which material was hit, then check the trimming; an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: sample three terms to check whether their writing is consistent throughout, and check whether the translated names can point back to the original text.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- Record the number of citations and the `quoteMaxToken` budget, record the number of citations separately, and do not compare array length with the content budget as if they were equal.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
