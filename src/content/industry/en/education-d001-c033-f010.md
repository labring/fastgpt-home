---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Find Supporting Evidence
slug: /en/industry/education-d001-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Evidence
meta_description: Skills Competitions: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Find Supporting Evidence

## What this category's data looks like

This category's data usually enters the knowledge base in three types of materials: competition regulations, registration forms, and training plans. Competition regulations contain the event name, group, time, location, scoring method, and signature field; registration forms contain the names of contestants and instructors, student IDs, majors, competition events, dates, and receipts; training plans contain stages, class hours, venues, equipment, responsible persons, and signatures. The three types of materials update at different rhythms: regulations are released by competition year, registration forms are collected by batch, and training plans are adjusted weekly. When entering this feature, the regulations are the draft basis for determining qualifications and procedures, the registration forms are the verification source for personnel and quantities, and the training plans are the supporting evidence for training arrangements and signatures. The names, quantities, and dates of the same record in the three materials often do not match; unsynchronized versions or missing signatures or missing receipts will make it impossible for basis entries to point back to the original text.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Even if no content is searched, the output chain will still run through. "Basis entries that can point back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | The event name, group, time, location, and signature field match the original text, and the version is current | In the node, check the selected knowledge base and vector model, open the citation marker, and compare it with the regulation paragraphs |
| Registration form | The names of contestants and instructors, student IDs, majors, competition events, dates, and receipts are consistent with the original text | Run a test with a question spanning the regulations and registration form, and see whether each citation can point back to the original text |
| Training plan | The stages, class hours, venues, equipment, responsible persons, and signatures can be found in the original text, and the version is synchronized | Open the search parameter panel and check item by item, record the number of array items, and separately record `quoteMaxToken` |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues |

## Three common errors

- Symptom: the same contestant name is written differently in the registration form and the training plan. Cause: the two materials were entered separately, the names were not unified according to the regulations, and the cited snippets do not match the original text.
- Symptom: the event date differs by one day between the regulations and the registration form. Cause: the versions are not synchronized, and the old version of the regulations is still participating in retrieval in the knowledge base.
- Symptom: the training plan lacks the responsible person's signature or the registration form lacks a receipt. Cause: material collection is incomplete, and basis entries cannot point back to the complete original text.

## How to verify the setup

This feature's acceptance: ask a question with original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the source identifier of each citation in `quoteList`.

Business test: ask a basis question spanning materials, and see whether the answer gives traceable sources.

- In the node, check the selected knowledge bases and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of array items, and separately record `quoteMaxToken` as the cited content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
