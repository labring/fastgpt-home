---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Access
meta_description: Student Mental Health: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, and the materials include three types: psychological screening plans, interview records, and referral forms. The psychological screening plan provides the scale dimensions, screening date, and the signature of the organizing party, and is the entry basis for authorized access; the interview record carries the student's pseudonym, interview time, interviewer, and review signature, and is the process material for referral judgment; the referral form records the referral subject, referral date, receiving party, and receipt signature, and is the destination voucher for external services. The three types of materials are updated by semester: the screening plan is published at the beginning of the semester, interview records are appended as cases progress, and referral forms are backfilled after the referral is completed. Field characteristics are concentrated in four categories: name, quantity, date, and signature. When entering the authorized access and external service functions, the screening plan determines the visible scope, while the interview records and referral forms determine the cited sources and traceability path.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "The externally available entry and authorization scope" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields must include screening dimensions, screening date, and the signature of the organizing party, and must be consistent with the screening batch name in the interview records | Open the citation marker, compare it against the original paragraph of the plan, and verify the dimension names and dates |
| Interview record | Fields must include the student's pseudonym, interview time, interviewer, and review signature, and must be consistent with the referral subject name and quantity in the referral form | Use a restricted identity to retrieve one interview record and verify whether the cited fragment corresponds word for word with the original text |
| Referral form | Fields must include the referral subject, referral date, receiving party, and receipt signature, and the version must be synchronized with the current screening plan | Open the search parameter panel and verify the cited source identifiers of `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Authorized access entry | The visitor's identity matches the visible scope, and unauthorized access is not visible | Access once with a restricted identity and see whether the visible scope matches the setting |

## Three common errors

- Symptom: The name, quantity, and date of the same student do not match between the interview record and the referral form. Cause: The two materials are filled in by different stages, and no field comparison or receipt verification was performed.
- Symptom: The screening plan has been updated, but the interview record still cites the old version's dimensions. Cause: The version was not synchronized, and the cited source was not re-matched after the knowledge base update.
- Symptom: The referral form lacks the receiving party's signature or receipt. Cause: The signature field was not backfilled after the referral was completed, and the material lacks a traceable identifier when it enters retrieval.

## How to verify the setup

This feature's acceptance: ask a question with original-text evidence, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When the citation upper limit is involved, verify the tokens of the cited text, and record the array item count separately.

Business test: access once with a restricted identity and see whether the visible scope matches the setting

- Open the citation markers in the conversation, compare them one by one against the source documents, and verify whether the cited fragments are consistent with the original paragraphs
- Run a test with a question that has no matching material, and see whether the citation array is empty while the output pipeline continues to run through

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
