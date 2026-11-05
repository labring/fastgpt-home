---
title: Citations and Source Traceability for Graduate Education Process Management: Find Supporting Evidence
slug: /en/industry/education-d001-c025-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Citations | Evidence
meta_description: Graduate Education: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Education Process Management: Find Supporting Evidence

## What this category's data looks like

Graduate training process management involves materials such as training plans, proposal reports, and mid-term assessment forms, with fields including course name, credits, date, signature, and receipt. Materials are updated by semester and milestone, and the current archived version prevails. When entering the knowledge base retrieval node, the training plan serves as the original source for the course and credit fields, the proposal report serves as the original source for the topic and date fields, and the mid-term assessment form serves as the original source for the assessment conclusion and signature fields; together, the three support cross-material basis queries.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. "Basis items that can be traced back to the original text" are completed afterward by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | The course name, credits, date, and signature fields must be consistent with the current archive | In the citation array, trace each item back to the original paragraph of the training plan, and check the fields and signature |
| Proposal report | The topic name, date, and signature fields must be consistent with the current archive | Open the citation marker and compare it against the original text of the proposal report, and check the name and date |
| Mid-term assessment form | The assessment conclusion, date, and signature or receipt fields must be consistent with the current archive | Use `quoteList` to view the matched snippet, and check the conclusion and receipt |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see that the array is empty while the pipeline still completes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the training plan and the mid-term assessment form. Cause: The two materials are entered separately, and no field comparison was performed.
- Symptom: The version of the proposal report is not synchronized, and the citation points to an old date. Cause: The new version was not replaced in the archive, and retrieval still matches the old snippet.
- Symptom: The mid-term assessment form lacks a signature or receipt, but the cited snippet is still output. Cause: The completeness of the signature field was not verified when the material was ingested.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline still completes, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled).

Business test: ask a cross-material basis question, and see whether the answer provides traceable sources.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the citation array is empty while the pipeline continues, and record the number of items in the array; do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
