---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Handover
meta_description: Journal Submissions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the initial review stage of academic journal submissions, material drafting and responsibility handover revolve around three types of materials: the submitted manuscript, the author information form, and the plagiarism check report. The submitted manuscript is the object under review, the author information form carries authorship, affiliation, funding, and contact details, and the plagiarism check report records the detection time, duplication rate, and detection version. When these three types of materials enter the knowledge base retrieval node, each serves as a citable source document, allowing citation output to point back to the original paragraphs. In terms of update cadence, the manuscript is replaced with revised versions, the author information form is synchronized with the confirmation letter, and the plagiarism check report is reissued with each detection batch. Field characteristics center on names, quantities, dates, signatures, and receipts: the same manuscript number must be consistent across the three materials, the version number and issue date must be synchronized, and the handover record must bear the responsible person and receipt traces. After the materials enter this function, the retrieval node is only responsible for recalling the corresponding fragments according to the question and outputting the citation array; it does not undertake field comparison or ledger generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original fragment and source identifier, and the length may be 0. The issuable material drafts and handover records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The manuscript number, title, version number, and receipt date are consistent across the three materials and correspond to the handover record | Open the citation markers in the conversation, check the number, title, and date against the original manuscript paragraphs, and view the hit source identifier in `quoteList` |
| Author information form | The authorship order, affiliation names, funding numbers, and signature receipts are complete, and the dates are synchronized with the manuscript version | Compare the author information form item by item with the manuscript title page, check whether signatures and receipts are missing, and record the number of citations and the hits returned by `responseData` (non-streaming module results returned with detailed output enabled) |
| Plagiarism check report | The detection time, detection version, and duplication rate fields are complete, and the report version corresponds to the current manuscript version | Check whether the report date is later than the receipt date and whether it covers the latest version, and confirm that the cited fragments can point back to the original report text |
| Handover record | The responsible person, handover date, and receipt fields are complete, and the version and date are consistent | Draft one according to the template and complete a handover, see whether missing items are blocked, and check whether the cited text is complete under the `quoteMaxToken` budget |

## Three common errors

- Symptom: The same manuscript number is written differently in the author information form and the plagiarism check report. Cause: The two materials were entered in different steps, and field alignment and version synchronization were not performed.
- Symptom: The handover record lacks the receipt field or receipt. Cause: The handover template did not fix the required fields, and the responsible person and date were omitted during circulation.
- Symptom: The cited fragments do not match the original text. Cause: First check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this function: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain still runs.

Business test: draft one according to the template and complete a handover, and see whether missing items are blocked.

- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality.
- Run a trial with a question that has no matching material, confirm that the output is an empty array while the chain continues, and then check against the source documents whether each citation can point back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
