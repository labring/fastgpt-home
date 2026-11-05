---
title: Citations and Source Traceability for Kindergarten and Family Communication: Find Supporting Evidence
slug: /en/industry/education-d001-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Evidence
meta_description: Family Communication: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Find Supporting Evidence

## What this category's data looks like

In the kindergarten home-school co-education communication scenario, materials are mainly divided into four categories: commitment items and response times, child performance descriptions, parent request classifications, and notification delivery records. When these materials enter the knowledge base retrieval node, each plays a different role: commitment-type materials are used to check whether responses were made on schedule, child performance descriptions are used to compare whether observation records are consistent, parent request classifications are used to confirm whether feedback has been categorized, and notification delivery materials are used to confirm whether information has been received. Sources are based on the current version of materials in this kindergarten, and the update rhythm is adjusted in sync with daily class records and kindergarten notices. In terms of field characteristics, each material carries the original text paragraph and source identifier, and cited content is returned as an array, whose length can be 0; even if no content is found, the output pipeline still runs through.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Evidence items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response time materials | Whether the commitment item received a response at the agreed time, and whether the response content can be traced back to the original text paragraph | Open the citation marker and check the commitment item and response time fields against the source document |
| Child performance description materials | Whether the description is consistent with the observation record, and whether the cited fragment can be located in the original text | Use `quoteList` to view the cited fragment and compare it with the corresponding paragraph in the observation record |
| Parent request classification materials | Whether parent feedback has been categorized, and whether the classification result can be traced back to the original text | Check the source identifier and request classification field in the citation array to confirm the basis for classification |
| Notification delivery materials | Whether the notification has been delivered, and whether the delivery record can be traced back to the original text | View the cited content in `responseData` (non-streaming module results returned with detailed output enabled) and check it item by item against the notification delivery record |

## Three common errors

- Phenomenon: A commitment item is mentioned in the answer but no response time is given. Cause: The commitment-type material was not hit, the citation array is empty, and the pipeline still runs through; first check which materials were hit in this round.
- Phenomenon: The child performance description is inconsistent with the observation record. Cause: The cited fragment does not match the original text; first check which hit material it is, then see whether the cited content was truncated.
- Phenomenon: A parent request is answered directly without classification. Cause: The request classification material did not enter the citation array; check the selected knowledge base collections and search parameters.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and citation markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: ask a cross-material evidence question and see whether the answer gives a traceable source.

- In the node, check whether the selected knowledge base collections and their vector models are consistent.
- Open the search parameter panel and check the values item by item, and check that the tokens of the cited text and the number of array items are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
