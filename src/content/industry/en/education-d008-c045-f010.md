---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Access
meta_description: Training Compliance: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses off-campus training compliance filing and penalty response scenarios. The materials include three types: school operating licenses, course filing materials, and fee disclosure. The school operating license provides fields for the entity name, address, validity period, and issuing authority; the course filing materials provide the course name, number of class hours, target students, filing date, and handler signature; the fee disclosure provides fee items, standards, disclosure date, and receipt. After the three types of materials enter the knowledge base retrieval node, each plays a source role: the license is used to verify the entity identity and permitted scope, the course filing materials are used to verify the course and filing records, and the fee disclosure is used to verify the fee items and disclosure time. The material update cadence changes with filing changes, license renewals, and fee adjustments, and multiple versions commonly coexist. In terms of field characteristics, the name, quantity, and date of the same record may be inconsistent across two materials, signatures or receipts may be missing, and when versions are not synchronized, old documents can still be hit by retrieval.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. "Externally available entry points and authorization scope" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model; inconsistent vector models will make retrieval results unusable | In the node, check the selected collections and their vector models, and compare them item by item against the settings in the knowledge base retrieval section |
| School operating license | Check the entity name, address, validity period, issuing authority fields, and signature; the name and date of the same record across two materials must match | Open the citation marker to trace back to the original paragraph, and compare the entity name and date in the license and the course filing materials |
| Course filing materials | Check the course name, number of class hours, target students, filing date, and handler signature; when versions are not synchronized, old documents may still be hit | Access once with a restricted identity and see whether the visible scope matches the settings; then check whether the filing date and signature are complete |
| Fee disclosure | Check the fee items, standards, disclosure date, and receipt; if the signature or receipt is missing, that record cannot be used as an external basis | In the conversation, open the citation marker to compare against the source document, and record the number of citations and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the license and the course filing materials. Cause: the two materials were entered separately without field comparison, and the versions were not synchronized.
- Symptom: the fee disclosure lacks a signature or receipt but is still cited as an external basis. Cause: the signature and receipt fields were not checked when the material was ingested, and output occurs as soon as retrieval hits.
- Symptom: the cited snippet does not match the original text, and the paragraph pointed to by the marker is inconsistent with the answer content. Cause: first check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material, confirm the array is empty while the pipeline still runs, and check that the number of citations in `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget are recorded separately, without comparing the two for equality.

Business test: access once with a restricted identity and see whether the visible scope matches the settings, and unauthorized content is not visible.

- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and record that the array length is 0.
- Open the search parameter panel and check the values item by item, confirming they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
