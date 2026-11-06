---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Find Supporting Evidence
slug: /en/industry/education-d001-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Evidence
meta_description: Research Misconduct: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in the investigation and handling of academic misconduct reports. The materials include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials provide leads and original statements, and after entering the knowledge base they become the primary source of basis entries; investigation reports carry the investigation process and conclusions, with fields including the reported person, matter name, date, signature, and receipt; expert appraisal opinions provide professional judgments, with fields including appraisal matter, quantity, conclusion, and expert signature. The three categories of materials are entered into the knowledge base in batches according to the pace of acceptance, investigation, appraisal, and response, and the version is based on the currently effective draft. When querying, the material name, quantity, date, and signature must be aligned item by item, so that each basis can point back to the original paragraph, for citation when replying to parents or writing it into a plan.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The basis entries that can point back to the original text are then completed by subsequent AI nodes, code nodes, or manual work, for comparing fields, writing ledgers, and generating reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The entry can point back to the original report text, and the name, quantity, and date match the investigation report | Open the citation marker to compare against the source document, verify the fields and dates item by item, and record the number of entries |
| Investigation report | The version is the currently effective draft, signatures and receipts are complete, and the conclusion is consistent with the appraisal opinion | Verify the report version number and issue date, and check whether the signature field and receipt attachment are complete |
| Expert appraisal opinion | The appraisal matter, quantity, and conclusion are consistent with the cited location in the investigation report, and the expert signature is present | Compare the original appraisal opinion with the cited paragraph in the report, and verify whether the quantity and date are the same record |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and the pipeline continues | Run a test with a question that has no matching materials, see that the array is empty while the pipeline runs through, and record `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: the two materials were entered into the knowledge base separately without field alignment, and one paragraph was taken from each when citing.
- Symptom: the investigation report cites an old version of the appraisal opinion, and the conclusion is inconsistent with the currently effective draft. Cause: the versions were not synchronized, and the old draft still remains in the knowledge base and is hit by retrieval.
- Symptom: the report lacks a signature or receipt, but the cited entry is still output as a basis. Cause: the signature field and receipt attachment were not checked during entry, and field completeness was not validated.

## How to verify the setup

Acceptance of this feature: first ask a question with original text basis, and check whether the citation array and markers can point back to the original paragraph; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record `quoteList` within `responseData`.

Business test: ask a cross-material basis question, for example whether the name, quantity, and date of the same matter are consistent across the report materials, investigation report, and expert appraisal opinion, and see whether the answer gives a traceable source.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item. When the citation limit is involved, verify the tokens of the cited text; record the number of array entries separately, and do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
