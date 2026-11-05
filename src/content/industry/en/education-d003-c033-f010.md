---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Intake
meta_description: Skills Competitions: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the vocational college skills competition organization scenario, with materials drawn from three categories: competition regulations, registration forms, and training plans. Competition regulations provide the event name, group, date, signature field, and version number; registration forms record competitor names, ID numbers, competition events, instructors, and acknowledgments; training plans list phases, class hours, venues, equipment quantities, and coach signatures. When the three material types enter the knowledge base retrieval node, each plays a different role: regulations are the basis for determining eligibility and process, registration forms are the working draft for verifying personnel and events, and training plans are the reference for comparing training arrangements and resource investment. In terms of update cadence, regulations change versions with annual competition notices, registration forms are revised multiple times around the registration deadline, and training plans are adjusted on a rolling basis by week or by phase. Field characteristics center on five categories: names, quantities, dates, signatures, and acknowledgments. The same record often appears inconsistently across two materials, and locating it requires referring back to the original text through quoted snippets.

## Configuration and implementation checks

This step is executed by the quoted output of the knowledge base retrieval node, which outputs an array of quoted content, each entry containing an original text snippet and a source identifier, and the length may be 0. The "acceptance record and items to be completed" is then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | The event name, group, date, and signature field must align item by item with the registration form and training plan, and the version number should be consistent | Refer back to the original regulation paragraphs in the quoted array, verify the name, date, signature page, and version number, and record the array length |
| Registration form | Competitor names, competition events, instructors, and acknowledgments must correspond to the regulations and training plan, and quantities and dates must not conflict | Open the quote markers to compare against the original registration form, compare field by field, and list entries missing signatures or acknowledgments separately |
| Training plan | Phases, class hours, venues, equipment quantities, and coach signatures must be consistent with the regulations and registration form, and versions must be synchronized | Use `responseData` (non-streaming module results returned with detailed output enabled) to view quote details, verify the original text snippets and source identifiers in `quoteList`, and record the `quoteMaxToken` budget |
| Knowledge base retrieval node | The selected collections must be knowledge bases of the same vector model, and the search parameters must match the values in the knowledge base retrieval section | Verify the selected collections and vector model in the node, open the search parameters panel, and compare item by item |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the regulations and the registration form. Cause: The two materials were revised separately without cross-comparison, and the quoted snippets refer back to only a single original text.
- Symptom: The training plan and regulation versions are not synchronized, and the quoted source points to an old version. Cause: After the version change, the knowledge base was not updated, retrieval hit the old document, and the quote identifier still points to the old source.
- Symptom: The registration form lacks a signature or acknowledgment, but the answer gives a complete conclusion. Cause: The missing item was not identified and followed up on; although the quoted array is non-empty, it does not cover the signature and acknowledgment fields.

## How to verify the setup

Acceptance for this feature: ask a question with textual support and check whether the quoted array and markers can refer back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain still runs.

Business test: ask a question missing key information and see whether it follows up before answering.

- Run a test with a question that has no matching materials, see that the quoted array is empty while the chain continues, and record the array length.
- Open the quote markers in the conversation, compare against the source documents, verify whether each quote can refer back to the original paragraph, and check `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
