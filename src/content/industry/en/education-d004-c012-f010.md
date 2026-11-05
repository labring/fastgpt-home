---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Handover
meta_description: Teaching Reviews: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of district and county teaching research activities and classroom observation and evaluation. Materials include teaching research activity notices, classroom observation records, evaluation meeting minutes, as well as signable material drafts and handover records derived from these materials. The notice defines the activity name, time, location, participation scope, and submission requirements; the classroom observation record carries the segments, facts, and timestamps of classroom observation; the evaluation meeting minutes carry the review points, improvement suggestions, and signatures. The update cadence advances with activity batches: the notice is issued first, classroom observation records are formed during class, evaluation meeting minutes are summarized after the meeting, and handover records are updated upon sign-off between stages. When materials enter the knowledge base retrieval node, each serves as a citation source to be retrieved: the notice is used to verify activity fields, the classroom observation record is used to verify classroom facts and dates, and the evaluation meeting minutes are used to verify review conclusions and signatures. Field characteristics center on names, quantities, dates, versions, and signature receipts; the same record must be consistent across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and a source identifier, and the length may be 0. The signable material drafts and handover records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Name, time, location, participation scope, and submission requirements fields are complete, and dates and versions are consistent | Open the original notice, verify fields and dates item by item, then compare against the version number in the handover record |
| Classroom observation record | Classroom segments, factual descriptions, timestamps, and signature receipts are complete, and the same record name and quantity are consistent across two materials | Use citation superscripts to point back to the original paragraphs, and compare the names, quantities, and dates in the classroom observation record and the evaluation meeting minutes |
| Evaluation meeting minutes | Review points, improvement suggestions, responsible persons, and signature dates are complete, and the version is consistent with the notice | Verify signatures and receipts, and check whether the minutes version is synchronized with the notice and classroom observation record |
| Citation content output | The number of returned entries matches the hit materials; empty is also normal, and the output pipeline runs through | Run a test with a question that has no matching materials, see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues, and record the array length |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the notice and the evaluation meeting minutes. Cause: Each was excerpted separately during drafting, without pointing back to the same original paragraph, and no field comparison was done before handover.
- Symptom: Versions are not synchronized; the draft has been changed but the handover record still points to the old version. Cause: The version number and date were not updated with the materials, and the sign-off step only checked signatures, not versions.
- Symptom: Signatures or receipts are missing, and the material cannot be issued. Cause: The handover record has no responsible person field, the sign-off action leaves no trace, and receipts are not archived together with the materials.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the citation text; the array entry count is recorded separately, and view `quoteList` when necessary.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, verify the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item
- Use the citation superscripts in the conversation to compare against the source documents, confirm that each citation can point back to the original paragraph, and record the array length separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
