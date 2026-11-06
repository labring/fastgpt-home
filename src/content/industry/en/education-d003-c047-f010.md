---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Intake
meta_description: Study Abroad Safety: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information

## What this category's data looks like

In the pre-departure training and overseas safety reminders category, materials include pre-departure training courseware, safety reminder checklists, and accommodation contact forms. The courseware covers visas, medical examinations, insurance, and entry procedures; the checklist covers public security, transportation, medical care, and emergency contacts; the contact form records accommodation address, front desk phone number, and emergency contact. Materials are updated by semester or project batch, and within the same batch the dates, signatures, and receipts must be consistent. When entering the knowledge base retrieval node, the courseware and checklist serve as the source basis role, and answer citations need to point back to their paragraphs; the contact form serves as the field comparison role, used to check whether names, quantities, and dates match. The update rhythm is bounded by batch, and when versions are not synchronized, old courseware and new checklists will be retrieved at the same time.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. "Intake records and completed question items" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Fields include project name, batch date, signature column, and receipt column; the name and date of the same record in the courseware and checklist must be consistent | In the node, verify that the selected knowledge bases use the same vector model; run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues |
| Safety reminder checklist | The version number and effective date must align with the courseware batch; if the signature or receipt is missing, that item is not used as a basis | Open the citation superscript to compare against the source document, and verify whether each citation can point back to the original paragraph; record the number of citations separately by array length |
| Accommodation contact form | The accommodation name, quantity, front desk phone number, and emergency contact must match the checklist and courseware | Open the search parameter panel and check the values item by item; when the citation limit is involved, check the tokens of the cited text, and do not compare it for equality with the number of array items |
| Intake record | Missing items are identified and followed up on, the answer has a material basis, and then it is forwarded to the handler | Run a test with a question missing key information, and see whether it first asks a follow-up question before answering; check the citation output in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name and quantity of the same accommodation record do not match between the contact form and the checklist. Cause: The two materials are updated separately, and the fields are not checked for synchronization.
- Phenomenon: Old-version courseware and a new checklist are retrieved at the same time, and the answer cites an expired batch. Cause: The versions are not synchronized, and the effective dates are not aligned.
- Phenomenon: The answer has content but the citation array is empty, or the cited snippet does not match the original text. Cause: This round did not hit materials, or the hit item did not point back to the original text, and it should not be directly attributed to length truncation.

## How to verify the setup

Acceptance for this feature: ask a question that has an original-text basis, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a question missing key information, and see whether it first asks a follow-up question before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm they use the same vector model.
- Open the search parameter panel and check the values item by item; record the number of citations by array length, and check `quoteMaxToken` separately as the content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
