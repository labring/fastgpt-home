---
title: Citations and Source Traceability for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Handover
meta_description: Teacher Credits: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in credit management for primary and secondary school teacher training, involving three types of materials: training notices, credit recognition forms, and attendance lists. The training notice provides the training program name, start and end dates, credit hours, and organizing institution, and is the source of basis for credit recognition; the credit recognition form carries the teacher's name, ID document number, training program, recognized credits, and recognition date, and requires the signature of the person in charge; the attendance list records the personnel actually present, sign-in dates, and attendance results, and is the original voucher for credit recognition. When drafting and handing over these three types of materials, the fields must be complete, the responsible persons must be clear, and the version and date must be consistent, and they must be handed over to the next stage for sign-off. The update cadence advances by training batch; each batch produces one version of the notice, one version of the recognition form, and one version of the list. After revision, the version number and date must be synchronized to avoid the name, quantity, and date of the same record failing to match across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The "issuable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Category verification dimensions: whether the program name, start and end dates, credit hours, organizing institution, issuance date, and signature are complete, and whether the dates are consistent with the attendance list | Open the knowledge base retrieval node, verify that the selected knowledge base uses the same vector model, and check whether the `quoteList` of the cited content array points back to the original paragraph of the notice |
| Credit recognition form | Category verification dimensions: whether the teacher's name, ID document number, training program, recognized credits, recognition date, and signature of the person in charge are complete, and whether they correspond to the credit hours in the training notice | Run a trial with a question that has no matching materials, see whether the cited content array is empty while the chain continues, and then check the citation text budget corresponding to `quoteMaxToken` |
| Attendance list | Category verification dimensions: whether the personnel actually present, sign-in dates, attendance results, and receipts are complete, and whether the names, quantities, and dates are consistent with the credit recognition form | Open the citation superscript in the conversation, compare against the source document, confirm that each citation can point back to the original paragraph, and record the number of array entries separately |
| Handover record | Category verification dimensions: whether the responsible persons of both parties in the handover, handover date, version number, and sign-off receipt are complete, and whether the versions are synchronized with the three materials | Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and then check whether `responseData` (non-streaming module results returned with detailed output enabled) contains the citation array |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record fail to match between the training notice and the attendance list. Cause: the same version was not used as the base draft during drafting, and the field sources were not labeled.
- Phenomenon: the credit recognition form has been revised, but the attendance list still remains at the old version. Cause: the version number and date were not updated synchronously, and version consistency was not checked during handover.
- Phenomenon: the handover record lacks a signature or receipt, and the next stage cannot sign off. Cause: the responsible person fields were not filled in completely, and missing items were not checked item by item against the template during handover.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, check whether the cited content array and citation superscript can point back to the original paragraph, and confirm that the source identifier in `quoteList` is consistent with the matched material; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Verify that the selected knowledge base uses the same vector model, check the `quoteList` and source identifier of the cited content array, and confirm that each citation can point back to the original paragraph.
- Run a trial with a question that has no matching materials, and confirm that the cited content array is empty while the chain continues; record the number of array entries, and separately check the citation text budget corresponding to `quoteMaxToken`; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
