---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Versions
meta_description: Research Misconduct: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Maintain Document Versions and Changes

## What this category's data looks like

In the investigation and handling of academic misconduct reports, the three types of materials—report materials, investigation reports, and expert appraisal opinions—each have their own field, date, and signature requirements. Report materials include the reported person, factual description, evidence list, and submission date; investigation reports include the investigation process, findings, handling recommendations, date of issuance, and signature; expert appraisal opinions include the appraisal matters, basis, conclusions, expert signature, and date. When the materials enter the knowledge base retrieval node, they serve as citable original-text sources, each stored as an independent document or in segmented form, for citation output to refer back to. In terms of update cadence, if the name, quantity, or date of the same record does not match across two materials, or if versions are not synchronized, or signatures or receipts are missing, each item must be compared one by one during change maintenance. Citation sources and traceability require that each citation can refer back to the original paragraph; the version ledger and change records are then compared by subsequent nodes or manually based on this to compare fields, write the ledger, and generate reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original-text fragment and a source identifier, and the length may be 0. The "version ledger and change records" are then completed by subsequent AI nodes, code nodes, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the fields, dates, and signatures are complete, and whether the name, quantity, and date are consistent in the investigation report and expert appraisal opinion | Check item by item against the original text the reported person, factual description, evidence list, and submission date, and open the citation marker to refer back to the source paragraph |
| Investigation report | Whether the investigation process, findings, handling recommendations, date of issuance, and signature are complete, and whether the version uniquely corresponds to the current version | Check the report's date of issuance and signature, and check whether the name, quantity, and date of the same record match across the two materials |
| Expert appraisal opinion | Whether the appraisal matters, basis, conclusions, expert signature, and date are complete, and whether citations are updated synchronously | Check the expert signature and date, confirm that the citation fragment corresponds to the original text, and that the old version is traceable |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output chain continues | Run a test with a question that has no matching materials, and see that the array is empty while the chain still runs through; when the citation limit is involved, check the tokens of the citation text, and record the array item count separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are maintained separately, changes are not synchronized, and the version ledger does not record the differences.
- Symptom: The investigation report or expert appraisal opinion lacks a signature or receipt. Cause: No signature confirmation is set up in the material circulation step, receipts are not archived, and versions are not synchronized.
- Symptom: There is no citation marker in the answer, and the citation fragment does not match the original text. Cause: There was no match in this round, or the matched materials are inconsistent with the citation sources; first check the match situation, then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through. Check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`; record the number of citations separately, and do not compare it for equality with `quoteMaxToken`.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and check that the number of citation content output items is consistent with the matched materials.
- Open the citation markers in the conversation, check against the source documents whether each citation can refer back to the original paragraph, and record the version ledger and change records.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
