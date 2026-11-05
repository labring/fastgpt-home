---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Checks
meta_description: Student Mental Health: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. A psychological screening plan records the screening subjects, tools, time, and responsible person, and is the baseline material for initiating screening; interview records document, student by student, the interview date, interviewer, content summary, and signature; a referral form states the referral subject, reason for referral, receiving party, and receipt. In the citation traceability function, the three types of materials each serve as a searchable source: the plan provides batch and field definitions, interview records provide individual facts, and referral forms provide transfer evidence. Materials are updated by semester or batch, and fields include name, quantity, date, signature, and receipt status. Within the same record, discrepancies often occur across the plan, interview records, and referral forms in name spelling, number of people, and dates; versions are not synchronized; or signatures and receipts are missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening subject names, number of people, screening date, responsible person's signature, and version number in the plan should be consistent with the corresponding batch in the ledger | Open the original plan text and verify names, quantities, dates, and signatures item by item; record discrepant fields and annotate the source paragraph |
| Interview records | The student names, interview dates, interviewer signatures, and content summaries in the interview records should point to the same subject as the plan roster and referral form | Compare interview dates and signatures student by student, and check whether the record's name is consistent in the plan and referral form |
| Referral form | The referral subject, referral date, receiving party, and receipt status in the referral form should be consistent with the corresponding fields in the interview records and plan | Check whether the referral form receipts are complete, and compare whether the referral date matches the interview date and the plan batch date |
| Knowledge base retrieval node | Cited content is output as an array, and the length can be 0; even if no content is found, the output chain still runs through | Check the number of items in the citation array and the `quoteList` source identifier in `responseData` (non-streaming module results returned with detailed output enabled), and confirm that each citation can be traced back to the original paragraph |

## Three common errors

- Symptom: The same student's name spelling or number of people does not match between the plan and interview records. Cause: The materials were filled in by different personnel, the name conventions were not unified, and versions were not synchronized.
- Symptom: The referral form lacks the receiving party's signature or receipt. Cause: The referral process was not closed-loop, receipts were not collected, and material archiving was incomplete.
- Symptom: There are no citation superscripts in the answer, or the cited snippets do not match the original text. Cause: The corresponding material was not hit in this round, or a different record was hit, and this cannot be directly attributed to length truncation.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the number of items in the citation array and the superscripts can be traced back to the original paragraph; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: use a real record to find fields inconsistent with the ledger, record discrepancies in name, quantity, date, or signature, and submit them to the reviewer for confirmation and write-back.

- Open the search parameter panel, check that the `quoteMaxToken` value is consistent with the knowledge base retrieval section, and record the number of items in the citation array separately without making an equality comparison.
- Open the citation superscripts in the conversation, verify the cited snippets against the original paragraphs one by one against the source document, and confirm that the `quoteList` source identifier is traceable.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
