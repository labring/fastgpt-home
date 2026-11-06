---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Handover
meta_description: Graduate Admissions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission scenario, covering three types of materials—re-examination plans, candidate score sheets, and transfer/adjustment lists—and explains their roles when they enter the knowledge base retrieval citation function. The re-examination plan is a rules-based material, with fields including re-examination batch, time, location, assessment method, score weights, and supervision and appeal channels; the candidate score sheet is a process-based material, with fields including candidate number, name, preliminary exam total score, re-examination scores for each component, converted total score, and ranking; the transfer/adjustment list is a results-based material, with fields including transfer/adjustment major, candidate number, name, preliminary exam score, proposed admission opinion, and signature and date. The three types of materials have different update rhythms: the re-examination plan is finalized before the batch starts, the score sheet is summarized by session after the re-examination ends, and the transfer/adjustment list is updated after each round of transfer/adjustment ends. The same candidate name, candidate number, score, and date must be consistent between the score sheet and the transfer/adjustment list, and versions and signed receipts must be synchronized; otherwise, subsequent issuance and handover cannot be closed-loop.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields including batch, time, location, assessment method, score weights, and supervision and appeal channels are complete, version and date are consistent, and signatures are complete | In the node, verify the selected collection and its vector model; open the search parameter panel and check item by item; run a test with a question that has no matching materials to see whether the output is empty while the chain continues |
| Candidate score sheet | Candidate number, name, preliminary exam total score, re-examination scores for each component, converted total score, and ranking are consistent between the score sheet and the transfer/adjustment list, and dates and signatures are not missing | In the conversation, open the citation markers and compare against the source documents; verify that the number of returned entries matches the matched materials, and empty is also normal; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |
| Transfer/adjustment list | Transfer/adjustment major, candidate number, name, preliminary exam score, proposed admission opinion, and signature and receipt are complete, and block when versions are not synchronized | Verify that each citation can point back to the original paragraph; check that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the markers; when the citation limit is involved, check the tokens of the cited text, and record the array length separately |
| Handover record | Responsible person is clear, version and date are consistent, missing items are blocked, and the next step has a receipt upon acceptance | Draft one according to the template and complete one handover to see whether missing items are blocked; verify that the fields and responsible person in `quoteList` are complete |

## Three common errors

- Symptom: the same candidate name or candidate number does not match between the score sheet and the transfer/adjustment list. Cause: the two materials were drafted separately, were not checked against the same record by pointing back to the original text, and the cited snippets are inconsistent with the original text.
- Symptom: the version of the re-examination plan or transfer/adjustment list is not synchronized, and dates and signatures are missing. Cause: after drafting the materials, no handover acceptance was performed, receipts were not retained, and the old version is still hit by retrieval.
- Symptom: there are no citation markers in the answer, or there is an answer but the citation array is empty. Cause: no materials were matched in this round, or the citations do not match the original text and were mistakenly judged as a failure; an empty array is a normal output and does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- Open the search parameter panel and check item by item to confirm that the values are consistent with those set in the knowledge base retrieval section; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.
- In the conversation, open the citation markers and compare against the source documents; check whether the citation array, source identifiers, and original paragraphs in `quoteList` within `responseData` correspond.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
