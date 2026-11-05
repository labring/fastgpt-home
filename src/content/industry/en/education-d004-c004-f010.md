---
title: Citations and Source Traceability for Kindergarten and Family Communication: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Handover
meta_description: Family Communication: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Common materials for drafting materials and handover of responsibilities in kindergarten home-school co-education communication include committed items and response timelines, child performance description records, parent request classification sheets, notification delivery receipts, and draftable materials and handover records. When these materials enter the knowledge base retrieval node, each plays a different role: committed items and response timelines provide quotable original text fragments, used to check whether commitments have been responded to; child performance description records provide observation original text, used to compare whether the wording is consistent with the observation records; parent request classification sheets provide the basis for categorization, used to check whether feedback is categorized; notification delivery receipts provide the source of delivery facts. In terms of update cadence, commitments and responses are updated with each communication, child performance descriptions are recorded daily or weekly, request classifications are archived with parent feedback, and notification delivery receipts are backfilled after delivery. Field characteristics center on responsible person, version, date, committed items, response time, request category, and delivery status, requiring complete fields, a clear responsible person, and consistent version and date, so that draftable materials and handover records can enter the next step of sign-off.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The "draftable materials and handover records" are completed next by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length may be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Committed items and response timelines | Whether committed items and response times appear in pairs, and whether the response time falls within the agreed range | Open the citation superscript in the conversation, check the commitments and response times against the source document; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |
| Child performance description records | Whether the wording is consistent with the observation records, and whether there is any inference beyond the original text | Run a test with a question that has no matching materials, and confirm that the citation array is empty while the chain continues; then check whether, when there is original text support, the cited fragments can point back to the original paragraphs |
| Parent request classification sheets | Whether parent requests are classified by category, and whether feedback is categorized | Open the search parameter panel and check the values item by item; check whether the length of the citation array matches the number of matched materials, and whether the citation fields in `responseData` (non-streaming module results returned with detailed output enabled) can each point back |
| Notification delivery receipts | Whether the delivery status and delivery time are consistent with the original receipt text | Check the delivery status and time against the source document; check whether the citation source identifiers in `quoteList` can locate the original paragraphs |

## Three common errors

- Symptom: committed items have been written into the draft, the response time column is empty, and no one claims it at handover. Cause: material fields are incomplete, the responsible person is not clear, and committed items and response times are not verified in pairs.
- Symptom: child performance descriptions do not match the original observation records, and inferences appear that are not in the original text. Cause: cited fragments do not point back to the original paragraphs, and the observation records were not compared item by item during drafting.
- Symptom: parent requests are not categorized, feedback piles up in remarks, and handover records cannot be signed off by category. Cause: the request classification sheet did not enter retrieval as a cited source, and classification fields are missing.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through; at the same time, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: draft one according to the template and complete one handover, see whether missing items are blocked, and check that fields are complete, the responsible person is clear, and the version and date are consistent.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; then open the citation superscript and check against the source document whether each citation can point back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
