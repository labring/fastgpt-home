---
title: Citations and Source Traceability for College Admissions and Application Placement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Handover
meta_description: College Admissions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the enrollment and filing stage of general higher education institution admissions, materials are mainly of three types: enrollment plans, filing rules, and admission rosters. Enrollment plans contain institution codes, major groups, planned numbers, selected examination subjects, batches, and dates, and are verified and signed by the planning management department; filing rules contain filing ratios, tie-breaking ranking, adjustment scope, withdrawal conditions, and the effective version; admission rosters contain candidate numbers, names, score rankings, admitted majors, admission review conclusions, and signatures/seals. In material drafting and responsibility handover, the three types of materials respectively serve as the basis, the criteria, and the record of results. When entering the knowledge base retrieval node, each provides original text fragments that can be traced back and source identifiers, for subsequent field comparison, ledger writing, and report generation, with the update cadence synchronized with batch progression and policy adjustments.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Institution code, major group, planned number, selected examination subjects, batch, and date are complete, and signature and version are consistent | Compare item by item against the original plan text, check the signature field and version date, and record the cited source identifier |
| Filing rules | Filing ratio, tie-breaking ranking, adjustment scope, withdrawal conditions, and effective version can each be traced back to the original text item by item | Open the citation superscript to compare against the rule paragraphs, and check whether the effective date and version number are synchronized |
| Admission roster | Candidate number, name, score ranking, admitted major, admission review conclusion, and signature/seal fields are complete | Compare the names, quantities, and dates in the two materials according to the roster template, and check whether the receipts are all attached |
| Cited content array | The number of returned items matches the materials hit; being empty is also normal; cited fragments can be traced back to the original text | Run a test with a question that has no matching materials, and check the array length in `responseData` (non-streaming module results returned with detailed output enabled); when the citation limit is involved, check the `quoteMaxToken` budget, record the number of items separately, and view the `quoteList` source |

## Three common errors

- Symptom: The name or score ranking of the same candidate does not match between two materials. Cause: During drafting, the original text fragments were not traced back word by word, the cited source identifier was missing, and field comparison was not performed before handover.
- Symptom: The number in the enrollment plan is inconsistent with the number in the admission roster. Cause: The versions were not synchronized, the old plan was still being used in the citation array, and the handover record did not indicate the version and date.
- Symptom: The handover record lacks a signature or receipt. Cause: The responsible person was not specified in the template, the receipt step was not verified item by item according to the template, and the missing item was not blocked before entering the next step.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs through, and view `quoteList` within `responseData`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run a test with a question that has no matching materials, confirm that the output is empty while the chain continues; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
