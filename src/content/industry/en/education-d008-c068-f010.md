---
title: Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c068-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Citations | Access
meta_description: Journal Editing: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Review, Proofreading and Editorial Quality: Manage Authorized Access and External Services

## What this category's data looks like

When materials on journal three-review three-proofreading and editorial quality enter authorized access and external services, the three-review form, the proof, and the proofreading record are the three core sources. The three-review form records the fields, dates, and signatures of the initial review, re-review, and final review; the proof carries the traces of layout and textual changes; the proofreading record registers errors and receipts round by round. Material updates advance with the editorial and proofreading rounds; the name, quantity, and date of the same record often fail to match across two materials, and unsynchronized versions, missing signatures, or missing receipts also occur from time to time. The three types of materials each have their own role in the function: the three-review form is used to verify process completeness and the signature chain, the proof is used to compare whether changes have been implemented, and the proofreading record is used to trace the errors and receipt status of each round. During external services, the visitor's identity and visible scope need to match; unauthorized access must not be visible, and access may be opened to parents or superiors.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length may be 0. "The externally available entry and authorization scope" are then completed by subsequent AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When the citation upper limit is involved, check the tokens of the citation text, and record the array item count separately.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Check whether the fields, dates, and signatures of the initial review, re-review, and final review are complete, and whether the name, quantity, and date of the same record match between the three-review form and the proofreading record | Open the three-review form and the proofreading record and compare fields, dates, and signatures item by item; mark those missing signatures or receipts |
| Proof | Check whether the changes on the proof are consistent with the proofreading record, whether the versions are synchronized, and whether the changed places have corresponding receipts | Take the proof and proofreading record of the same round, compare the change locations and receipts, and mark those whose versions are not synchronized |
| Proofreading record | Check the name, quantity, date, and signature of the errors in each round, and whether they match the three-review form and the proof | Go through the proofreading record round by round, cross-compare it with the three-review form and the proof, and mark those whose dates do not match |
| Citation content output | Check whether the number of returned items is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; then open the citation marker to compare with the source document |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the three-review form and the proofreading record. Cause: the two materials are registered separately, no cross-comparison is made, and the field definitions are inconsistent.
- Symptom: the proof has been changed, but the proofreading record is not synchronized, and the versions do not match. Cause: after the change, the record was not written back, the versions were not synchronized, and receipts are missing.
- Symptom: there is no citation marker in the answer, or the citation fragment does not match the original text. Cause: without first checking whether this round hit and which material was hit, the issue is directly attributed to length truncation.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, check whether the citation array and marker can point back to the original text, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the matched materials; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and that the citation in `quoteList` remains empty while continuing.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized access is not visible.

- Open the search parameter panel and check item by item, confirming that the selected collections are consistent with their vector models and that the values are the same as those set in the knowledge base retrieval section.
- Open the citation marker in the conversation, compare it with the source document, and check that each citation can point back to the original text paragraph; when the citation upper limit is involved, check the tokens of the citation text, and record the array item count separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
