---
title: Citations and Source Traceability for Kindergarten and Family Communication: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Access
meta_description: Family Communication: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Manage Authorized Access and External Services

## What this category's data looks like

This category's data mainly comes from class notices, child observation records, parent request registrations, and commitment response ledgers. When notice-type materials enter knowledge base retrieval, they serve as citation sources, used to display delivered information at the external entry point; observation records serve as the traceability source draft for descriptions of child performance, and the scope visible to the parent side must be consistent with the original fields of the record; parent request classification and commitment response times serve as the basis for determining authorized access, deciding which fields in the external service can be viewed by parents or superiors. The update rhythm follows daily communication records and weekly ledger aggregation, and the field characteristics are commitment items and response times, child performance descriptions, parent request classifications, and notice delivery. When materials enter the citation source and traceability function, their roles differ: notices and observation records provide original text fragments, requests and commitments provide visibility scope boundaries, and the retrieval node is only responsible for outputting the citation array according to matched materials, and does not undertake difference comparison or ledger generation.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The externally available entry point and authorization scope are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class notices and delivery records | Whether notice delivery matches the parent-visible scope, and whether commitment items and response times can be traced back in the cited fragments | Open the citation marker in the conversation, compare it with the original notice paragraph and delivery fields, and record the number of citations and source identifiers |
| Child observation records | Whether the description of child performance is consistent with the original observation record, and whether the fields visible on the parent side exceed the authorized scope | Access once with a restricted identity, compare the cited fragments with the original observation record item by item, and confirm that unauthorized fields are not visible |
| Parent request registrations and commitment response ledgers | Whether the parent request classification is consistent with the feedback categorization, and whether unresponded commitment items are covered by the cited fragments | Check the selected collection and vector model in the knowledge base retrieval node, and view the citation array length and the `detail` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the parent side sees commitment items but not response times. Cause: commitments and responses belong to different materials, the cited fragments match only one of them, and they are not aggregated by request classification.
- Symptom: the description of child performance is inconsistent with the wording of the observation record. Cause: the cited fragments come from a summary or secondary organization and do not trace back to the original observation record paragraph.
- Symptom: parent request feedback is not categorized, and the external entry display is chaotic. Cause: the request registration lacks a classification field, and the citation array matches multiple items but has no source identifier to distinguish them.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array length, without comparing the length to `quoteMaxToken` for equality.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and check whether commitment items and response times, child performance descriptions, parent request classifications, and notice delivery are consistent with the authorized scope.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record `quoteMaxToken` as the citation content budget, with the array length recorded separately.
- Open the citation marker in the conversation, compare each citation against the source document to see whether it can trace back to the original paragraph, and check whether the source identifiers in `quoteList` within `responseData` are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
