---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Handover
meta_description: Kindergarten Quality: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of kindergarten operation behavior and quality self-assessment. The materials include three types: self-assessment reports, issue lists, and rectification plans. The self-assessment report carries items such as operation direction, care and education process, health care, and personnel conditions, with fields including indicator name, observation point, self-assessment conclusion, date, and signature; the issue list records, by item, the issue description, involved indicator, discovery date, and responsible person; the rectification plan states the measures, completion deadline, acceptance person, and receipt. When these three types of materials enter the knowledge base retrieval node, each serves as a retrieved original source, and the citation output returns the original text snippet and source identifier, for subsequent nodes to compare fields, write ledgers, and generate signable drafts. The update cadence rolls forward by semester or special inspection, and versions are synchronized by date and signature.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the indicator name, observation point, self-assessment conclusion, date, and signature are complete, and whether the name, quantity, and date of the same record are consistent between the report and the list | Open the citation superscripts to trace each item back to the original paragraph, check the fields and dates against the source document, and record the number of citations, i.e. the array length |
| Issue list | Whether the issue description, involved indicator, discovery date, and responsible person are complete, and whether the item names, quantities, and dates match those in the rectification plan | Use `quoteList` to view the hit materials, check whether each citation can be traced back to the original paragraph, and mark items missing a signature or receipt |
| Rectification plan | Whether the measures, completion deadline, acceptance person, and receipt are complete, whether the version and date are synchronized, and whether they are consistent with the self-assessment report conclusion | Open the search parameter panel to check the values, check `quoteMaxToken` as the citation content budget, and record the array item count separately without making an equality comparison |
| Knowledge base retrieval node | Whether the selected knowledge bases use the same vector model, and whether the citation content output is returned as an array and allowed to be empty | Run a test with a question that has no matching materials, and see whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the flow continues to run through |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: the two original texts are each updated separately, without comparing fields against the same version.
- Symptom: the rectification plan has been changed while the self-assessment report still uses the old date, and the versions are not synchronized. Cause: the cited snippets come from materials of different versions, without checking the date and signature.
- Symptom: the issue list is missing a signature or receipt and is returned during handover. Cause: the drafting step did not list the signature and receipt as required fields, and the handover record did not verify them item by item.

## How to verify the setup

Acceptance of this feature: ask a question that has original-text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the flow runs through.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm they use the same vector model.
- Run a test with a question that has no matching materials, see whether the output is empty while the flow continues, and record the array item count.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
