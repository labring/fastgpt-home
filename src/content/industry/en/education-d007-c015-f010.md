---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Review
meta_description: Student Mental Health: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses primary and secondary school mental health screening and referral scenarios, and the materials include three types: screening plans, interview records, and referral forms. Screening plans carry the scale, administration date, and responsible person's signature; interview records carry the interview time, subject, observation points, and interviewer's signature; referral forms carry the referral reason, receiving party, receipt, and signatures of both parties. The three types of materials are updated by semester or batch, and the fields are mainly names, dates, quantities, conclusions, and signatures. After entering the knowledge base retrieval node, the plans and records serve as retrieved materials, and the referral forms serve as comparable materials, used to check whether the names, quantities, and dates of the same record are consistent across different materials, whether versions are synchronized, and whether signatures or receipts are complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale name, administration date, responsible person's signature, and batch version in the plan must match those in the interview records and referral forms | Open the citation marker in the conversation, point back to the original paragraph of the plan, verify the name, date, quantity, and signature fields, and record the number of citations and the `quoteMaxToken` budget |
| Interview record | The interview time, subject, observation points, and interviewer's signature must be consistent with the same record in the screening plan and referral form | Use the cited fragment to point back to the original text of the interview record, compare the name, quantity, and date of the same record in the two materials, and check the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Referral form | The referral reason, receiving party, receipt, and signatures of both parties must correspond to the screening plan and interview record; if a signature or receipt is missing, mark it | Open the citation marker in the conversation, compare it with the original text of the referral form, verify the receipt and signature fields, and if necessary check the citation details in `quoteList` |
| Exception record | An exception must be supported by the original record, and after the reviewer signs, it is handed to the responsible person for handling | Create an exception record, use the citation array to point back to the source material, and verify whether the name, quantity, and date are consistent and whether the version is synchronized |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the screening plan and the interview record. Cause: The two materials were entered separately and were not aligned to the same batch version.
- Phenomenon: The referral form lacks a signature or receipt, yet the exception record is still submitted. Cause: The review step did not list signatures and receipts as pass conditions.
- Phenomenon: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit and which material was hit, then consider trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: ask a question with textual support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline still runs.

Business test: create an exception record, see whether it can be traced to the source material, and verify the fields, dates, and signatures of that record in the screening plan, interview record, and referral form.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching material, and see that the citation array is empty while the output pipeline continues; then open the citation markers and compare each citation against the source document to see whether it can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
