---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Operations
meta_description: Student Mental Health: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of primary and secondary school mental health screening and referral. The materials include three types: psychological screening plans, interview records, and referral forms. A screening plan contains the scale name, screening dimensions, decision thresholds, implementation date, and the signature of the person in charge; an interview record contains the interviewed student identifier, interview time, interviewer, main topics, and follow-up recommendations; a referral form contains the reason for referral, referral destination, receipt signature, and acceptance date. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent knowledge base or as a document collection within the same knowledge base. The node is only responsible for returning an array of cited content by vector search; it is not responsible for comparing fields or generating ledgers. In terms of update cadence, screening plans are adjusted by semester, interview records advance with individual cases, and referral forms are supplemented as receipts are returned. Field characteristics center on four types: names, quantities, dates, and signatures. The same record often appears in two materials with inconsistent name spellings, inconsistent quantity definitions, and inconsistent date ordering. When versions are not synchronized, cited snippets are even more likely to fail to match the original text.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The handover-ready deployment state and operation records are completed subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the scale name, screening dimensions, decision thresholds, implementation date, and signature of the person in charge in the plan are complete, and whether they are consistent with the corresponding names and dates in the interview records and referral forms | In the node, check the selected knowledge base collections and their vector models; open the citation markers to compare against the original paragraphs of the plan, and verify names, quantities, dates, and signatures item by item |
| Interview record | Whether the interviewed student identifier, interview time, interviewer, main topics, and follow-up recommendations are complete, and whether they match the same record's names and dates in the screening plan and referral form | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; then, for a question with matching materials, check whether the number of returned entries matches the hit materials |
| Referral form | Whether the reason for referral, referral destination, receipt signature, and acceptance date are complete, and whether they match the same record's names, quantities, and dates in the screening plan and interview record | Open the search parameter panel and verify the values item by item; in the conversation, open the citation markers and compare against the source documents to confirm that each citation can point back to the original paragraph |
| Cited content output | The number of returned entries matches the hit materials; empty is also normal; each citation can point back to the original paragraph | Check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) against the number of hit materials; when the citation limit is involved, check the tokens of the cited text, record the array entry count separately, and treat `quoteMaxToken` only as a content budget, not as an equality comparison |

## Three common errors

- Symptom: The same student's name is written differently in the screening plan and the referral form, and the date ordering does not match. Cause: The two materials are filled in by different stages, are not checked against a unified field definition, and versions are not synchronized.
- Symptom: The quantity definitions in the interview record and the referral form are inconsistent, e.g., the number of interviews and the number of referrals do not match. Cause: They are recorded independently, and fields and dates are not compared item by item during handover.
- Symptom: The referral form lacks a receipt signature or acceptance date, and the cited snippet does not match the original text. Cause: The receipt was archived before being returned; first check whether this round hit anything and which material was hit, then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: verify once item by item according to the handover form, see which record is missing, and focus on whether the version, connection, and task record are consistent.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, and run a trial with a question that has no matching materials to see whether the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
