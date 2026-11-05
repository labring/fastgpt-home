---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Operations
meta_description: Undergraduate Programs: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Coordinate Operations and Application Handover

## What this category's data looks like

Deployment, operations, and application handover for undergraduate program setup and dynamic adjustment mainly involve three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The program setup application form carries the proposed program name, code, program length, degree-granting category, and application date; the talent cultivation plan carries the curriculum system, credits and class hours, practical components, and revision date; the expert review opinions carry the review conclusion, list of experts, signatures, and receipt date. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source. Each fragment in the citation array points back to the corresponding material paragraph, and the source identifier points to the specific document and paragraph location. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The program name and code must be consistent with the application form; the number of courses and credits must be consistent with the cultivation plan; the review date and signature must be consistent with the expert review opinions. The update cadence follows the program application cycle and the cultivation plan revision cycle, and the version is based on the material's signing date and revision notes. During deployment, operations, and application handover, the fields, dates, and signatures of the three types of materials must be checked item by item according to the handover form, confirming that the version, connection, and task records are consistent, and then handed over to operations or the next shift.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original fragment and a source identifier, and the length can be 0. Even if no content is retrieved, the output chain still completes. The "handover-ready deployment status and operation records" are completed by subsequent AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Field check: whether the program name, code, program length, degree-granting category, and signing date are consistent with the talent cultivation plan and expert review opinions; whether signatures and receipts are complete | Open the citation marker and compare the name, quantity, date, and signature item by item against the source document; record the number of items in the citation array and the `quoteMaxToken` budget, and do not compare the two for equality |
| Talent cultivation plan | Field check: whether the number of courses, credits and class hours, practical components, and revision date are consistent with the application form and expert review opinions; whether the version is synchronized | Open the citation marker in the conversation and point back to the original paragraph; check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text; register missing items when signatures or receipts are absent |
| Expert review opinions | Field check: whether the review conclusion, list of experts, signatures, and receipt date are consistent with the application form and cultivation plan; whether the name, quantity, and date of the same record match across the two materials | Run a test with a question that has no matching material and see whether the citation array is empty while the chain continues; then check whether the hit materials in `quoteList` match the number of citations |

## Three common errors

- Symptom: the same program name or course quantity does not match between the application form and the cultivation plan. Cause: the two materials' versions are not synchronized, the revision date and signing date are inconsistent, and the cited fragments each point back to paragraphs from an old version.
- Symptom: the expert review opinions lack signatures or receipts, but the handover form records them as complete. Cause: the signature page was not stored in the knowledge base together with the materials, the citation array did not hit that page, and the check only looked at the main text without looking at the attachment.
- Symptom: there is no citation marker in the answer, or the cited fragments do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not mean retrieval failed, and an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain completes.

Business test: check once item by item according to the handover form, see which record is missing, and after confirming that the version, connection, and task records are consistent, hand over to operations or the next shift.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; record the number of citations separately according to the array length, and `quoteMaxToken` is only used as the content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
