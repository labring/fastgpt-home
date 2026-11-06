---
title: Citations and Source Traceability for Kindergarten and Family Communication: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Review
meta_description: Family Communication: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Trace Exceptions and Review Results

## What this category's data looks like

Kindergarten home-school co-education communication materials usually include: commitment items and response times, descriptions of child performance, classification of parent requests, and notification delivery records. When these materials enter the knowledge base retrieval node, each has a different role: commitment items are used to verify whether a response was given, descriptions of child performance are used to compare against observation records, classification of parent requests is used to check feedback categorization, and notification delivery records are used to confirm delivery status. The material sources are mostly daily class records, parent feedback forms, and kindergarten notification archives. The update rhythm changes with daily communication and weekly summaries, and the field characteristics are mainly time, object, item, description, and category. During exception tracing, first locate the original record, then compare whether the fields are consistent, forming an exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The "exception list and review conclusion" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response times | Commitment not responded to: the commitment item has an original record, but the response time field is empty or exceeds the agreed period | Locate the original commitment text in the citation array, check whether the response time field is filled in, and record the discrepancy |
| Descriptions of child performance | Statement inconsistent with observation records: the parent description and the teacher's observation record are inconsistent in behavior, time, or frequency | Open the citation marker to compare against the source document, and compare the description field with the original observation record |
| Classification of parent requests | Feedback not categorized: the parent request has an original record, but the category field is missing or assigned to the wrong category | Check the original request text in the cited fragment, and verify the category field against the categorization rules |
| Notification delivery records | Delivery status inconsistent with records: the notification has a send record, but the delivery confirmation field is empty or contradictory | Check the delivery record in the cited source, and verify the delivery status field and timestamp |

## Three common errors

- Symptom: there is no citation marker in the answer. Cause: the citation array was not output with the answer, or subsequent nodes did not splice the cited fragments and source identifiers into the reply.
- Symptom: there is an answer but the citation array is empty. Cause: no material was matched in this round; an empty array is a normal output and does not mean retrieval failed.
- Symptom: the cited fragment does not match the original text. Cause: first check whether this round matched anything and which material was matched, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. Check the number of citation entries in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifiers in `quoteList`; record the array length separately, and do not compare it for equality with `quoteMaxToken`.

Business test: create an exception record, see whether it can be traced back to the source material, and verify whether the four fields of commitment, description, category, and delivery are consistent with the original text.

- In the node, check the selected knowledge base collections and their vector models, and confirm that knowledge bases using the same vector model are selected.
- Open the search parameter panel and check the values item by item, confirming that they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
