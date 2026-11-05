---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Handover
meta_description: Training Compliance: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Off-campus training compliance filing and penalty response materials revolve around three categories: school operating licenses, course filing materials, and fee disclosure. The school operating license includes the license number, validity period, operating address, and signature; the course filing materials include the course name, class hours, textbook version, course start date, and responsible person's signature; the fee disclosure includes fee items, amounts, refund rules, disclosure date, and receipt. The material sources are the approval authority's receipts, the institution's internal ledgers, and disclosure archives, and the update cadence keeps pace with filing changes, course adjustments, and fee policies. After entering the knowledge base retrieval node, each of the three material categories serves as a citable original text fragment, providing a field traceability basis for subsequent drafting and handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The four fields of license number, validity period, operating address, and signature match the original, and the date is not earlier than the issue date | In the node, check the selected knowledge base collection and vector model, and open the citation marker to point back to the original license paragraph |
| Course filing materials | The course name, class hours, textbook version, course start date, and responsible person's signature are complete, and the same record name and quantity match across the two materials | Compare the cited fragments item by item with the original filing receipt, and use `quoteList` to view the source identifier of the hit material |
| Fee disclosure | The fee items, amounts, refund rules, disclosure date, and receipt are complete, and the version is in sync with the current filing | Run a trial with a question that has no matching material, confirm that the citation array is empty while the chain continues, and record the `responseData` (non-streaming module results returned with detailed output enabled) output form |
| Cited content array | The number of returned entries matches the hit materials; being empty is also normal, and the entry count is recorded separately | Verify that `quoteMaxToken` is the citation content budget and is not compared for equality with the array entry count |

## Three common errors

- Symptom: The course name, class hours, or course start date of the same course do not match across the two materials. Cause: During drafting, the original text was not referenced back, and field sources were not traced item by item.
- Symptom: The fee disclosure version is out of sync with the current filing, and the old amount still appears in the draft. Cause: The date and version identifier corresponding to the cited fragment were not verified.
- Symptom: The handover record lacks the responsible person's signature or receipt, and the next step cannot sign off. Cause: The material draft entered handover before its fields were complete.

## How to verify the setup

Feature acceptance: Ask a question with an original-text basis and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and record `responseData` and the citation count.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and record `quoteMaxToken` and the array entry count separately.
- Open the citation markers in the conversation, compare each citation against the source document to check whether it can point back to the original paragraph, and when the array is empty, confirm that the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
