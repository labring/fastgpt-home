---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Versions
meta_description: Student Mental Health: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, and the materials include three types: psychological screening plans, interview records, and referral forms. The psychological screening plan carries the scale selection, screening dimensions, judgment criteria, and implementation date; the interview record carries the interviewee, interview time, interviewer, and key statements; the referral form carries the referral subject, reason for referral, receiving party, signature, and receipt. When these three types of materials enter the knowledge base retrieval node, each participates in retrieval as a citable original passage, and the cited snippet must be able to point back to the material and passage in which it appears. In terms of update cadence, plans change with semesters or policy adjustments, interview records are generated per session, and referral forms produce receipts as cases move through the process. Field characteristics center on names, quantities, dates, signatures, and receipts. When the same record appears in two materials, the names, quantities, and dates must remain consistent; after a version change, the old version must remain traceable, and citations must stay in sync with the current version.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original passage and a source identifier, and the length may be 0. The version ledger and change records are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening dimensions, judgment criteria, implementation date, and version number in the plan must be consistent with the current version, and the old version must remain traceable | In the node, check the selected knowledge base collection and vector model, open the citation marker, and compare it against the original passage and date field of the plan |
| Interview record | The interviewee, interview time, interviewer, and key statements must match the corresponding field names, quantities, and dates in the referral form | Run a test with a question involving an interviewee, check whether the cited snippet can point back to the original interview record, and compare the referral form fields |
| Referral form | The referral subject, reason for referral, receiving party, signature, and receipt must be complete and consistent with the names, quantities, and dates in the screening plan and interview record | Open the search parameter panel and check the values item by item, record the length of the citation array, and separately inspect the `quoteMaxToken` budget |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output pipeline continues to work | Run a test with a question that has no matching materials, see that the citation array is empty while the pipeline continues, and check the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the screening plan and the referral form. Cause: The two materials are updated separately, without field comparison and version synchronization.
- Symptom: The plan has been revised, but citations still point to passages from the old version. Cause: The knowledge base was not updated in sync, the old version was not marked invalid, and citations were not refreshed with the current version.
- Symptom: The referral form lacks a signature or receipt, and the cited snippet cannot point back to the complete original text. Cause: Material archiving is incomplete, and the passage entering retrieval itself lacks key fields.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original passage; then ask a question with no matching materials, confirm that the array is empty while the pipeline works, and record the array length and the `quoteMaxToken` budget; the two are not compared for equality.

Business test: change one piece of content, see whether the version number and citations update in sync, and check whether the citation source identifiers in `quoteList` within `responseData` point to the current version.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Open the citation markers in the conversation, compare each citation against the source document to check whether it can point back to the original passage, and record the length of the citation array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
