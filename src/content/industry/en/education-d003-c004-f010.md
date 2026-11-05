---
title: Citations and Source Traceability for Kindergarten and Family Communication: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Intake
meta_description: Family Communication: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Handle Questions and Collect Missing Information

## What this category's data looks like

Kindergarten home-school co-education communication materials include four categories: commitment items and response times, child performance descriptions, parent request classifications, and notification delivery. Commitment items come from records of agreements between teachers and parents; when entering Q&A intake, they serve as the basis for verifying time nodes and responsibility attribution; child performance descriptions come from observation records and activity photo captions; when entering, they serve as the basis for comparison with whether they are consistent with parents' retellings; parent request classifications come from registrations via drop-off, pick-up, and online channels; when entering, they serve as the routing basis for classification and assignment to the responsible person; notification delivery comes from announcements and receipt records; when entering, it serves as the basis for judging whether it was reached and whether resending is needed. Materials are updated daily or weekly, and fields include timestamps, child identifiers, item types, original text snippets, and source identifiers. The citation sources and traceability function first retrieves these materials during the intake step, then generates follow-up questions based on gaps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "intake records and completed question items" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response times | Whether the commitment received a response within the agreed time, and whether the response content is consistent with the original agreement | Open the citation marker in the conversation, trace back to the original commitment text and response record, and verify the time field and item type |
| Child performance descriptions | Whether the parent's retelling matches the observation record, and whether the description falls under the same child and the same time period | Use `quoteList` to expand the cited snippet, and compare it against the observation entries and timestamps in the source document |
| Parent request classifications | Whether the request was classified into the correct category and points to the responsible person, and whether unclassified items trigger follow-up questions | Check the number of entries in the citation array against the number of request registrations, and compare the classification field and responsible-person field one by one |
| Notification delivery | Whether the notification was reached and a receipt was retained, and whether a follow-up question item is generated when a receipt is missing | Check the delivery record pointed to by the citation source identifier, and inspect whether the receipt field in `responseData` (non-streaming module results returned with detailed output enabled) is empty |

## Three common errors

- Symptom: A parent asks about a commitment item, but the answer does not give a response time. Cause: The original commitment text was not retrieved and hit, the citation array is empty, and the chain still runs through but lacks a time basis.
- Symptom: The child performance in the answer does not match the wording of the observation record. Cause: The cited snippet comes from another time period or another child, and the original text was not traced back by child identifier and timestamp.
- Symptom: A parent request is forwarded out without being classified. Cause: The classification field is missing, and the follow-up question did not first complete the request category and responsible person before directly entering subsequent processing.

## How to verify the setup

Acceptance for this feature: ask a question that has an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through. Record the number of citations, i.e. the array length; when a citation upper limit is involved, check the tokens of the cited text. `quoteMaxToken` is the content budget, and the number of array entries is recorded separately.

Business test: ask a question that lacks key information, and see whether it first asks a follow-up question before answering.

- Open the search parameter panel and check item by item, confirming that the selected knowledge base uses the same vector model, and that the `quoteMaxToken` value is consistent with the knowledge base retrieval section.
- Run a trial with a question that has no matching materials, inspect `responseData` and the citation array, confirm that the output chain continues when the length is 0, and record the number of array entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
