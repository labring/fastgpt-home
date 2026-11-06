---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Handover
meta_description: Student Mental Health: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the drafting of materials and handover of responsibilities in mental health screening and referral in primary and secondary schools, covering three types of materials: psychological screening plans, interview records, and referral forms. The screening plan carries the screening subjects, tools, schedule, and organizational division of labor; the interview record carries the interview time, subject, key content points, and interviewer; the referral form carries the referred subject, reason for referral, receiving party, and receipt. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, used to compare whether the name, quantity, and date of the same record are consistent, whether versions are synchronized, and whether signatures and receipts are complete. The update cadence is maintained separately for semester screening, individual case interviews, and referral occurrences, with fields primarily consisting of responsible person, date, signature, and version number, ensuring that issuable material drafts and handover records have complete fields, clear responsible persons, and consistent versions and dates.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. Issuable material drafts and handover records must be subsequently produced by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output pipeline will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the fields include screening subjects, tools, time, organizational division of labor, and responsible person's signature, and whether the version number and date are consistent | Check the fields item by item against the plan template, open the citation marker to trace back to the original paragraph, record the number of array entries, and separately review the `quoteMaxToken` budget |
| Interview record | Whether the name, quantity, and date of the same record match between the interview record and the referral form, and whether the interviewer's signature is complete | Open the citation marker in the conversation to compare against the source document, compare the two materials field by field, and check the citation source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Referral form | Whether the referral reason, receiving party, receipt, and signature are complete, and whether the version is synchronized with the screening plan | Draft a referral form according to the template and go through one handover sign-off; missing items should be intercepted by subsequent nodes or manual work, and check that the cited fragments in `quoteList` correspond to the original text |
| Knowledge base retrieval node | Whether the selected knowledge base uses the same vector model, whether the number of cited content output entries matches the hit materials, and whether being empty is also normal | In the node, check the selected collection and vector model, run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the interview record and the referral form. Cause: The two materials were drafted separately, were not compared item by item according to the same source fields, and the cited fragments did not trace back to the original text.
- Phenomenon: The screening plan has been updated, but the referral form still cites the old version, and the versions are not synchronized. Cause: The material update cadence is inconsistent, the version number and date were not checked during handover, and signatures or receipts are missing.
- Phenomenon: There is no citation marker in the answer, or the cited fragments do not correspond to the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are intercepted.

- In the node, check the selected knowledge bases and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues, and record the number of array entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
