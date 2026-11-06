---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Operations
meta_description: Research Progress: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data looks like
Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. The sources are paper signed copies and electronic ledgers submitted by the project team, and the update cadence rolls according to quarterly milestones and acceptance windows. Annual progress report fields include task name, number of indicators, start and end dates, and responsible person's signature; mid-term review materials include stage results, budget execution, expert opinions, and receipts; acceptance reports include final indicators, version number, acceptance conclusion, and multi-party signatures. When these materials enter the knowledge base retrieval node, each serves as a citable original source, used in deployment, operations, and application handover scenarios to refer back to fields, dates, and signature locations. Deployment status and operation records require consistency among version, connection, and task records. If names, quantities, or dates across materials do not match, or if versions are not synchronized, or signatures and receipts are missing, the item-by-item verification of the handover form will be affected.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether task name, number of indicators, start and end dates, and responsible person's signature are consistent with the same items in the mid-term review materials | Open the citation superscript, compare fields and dates item by item against the original paragraphs, and record the locations of discrepancies |
| Mid-term review materials | Whether stage results, budget execution, expert opinions, and receipts are complete and synchronized with the version of the acceptance report | Check the receipt signature page and version number, and verify whether the names and quantities of the same record match across the two materials |
| Acceptance report | Whether final indicators, version number, acceptance conclusion, and multi-party signatures are consistent with deployment status and operation records | Verify item by item according to the handover form, confirm that version, connection, and task records have no missing items, and register the number of entries in the citation array and the `quoteMaxToken` budget separately |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the citation content array length can be 0, and the pipeline runs through | Run a test with a question that has no matching materials, check that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues, then open the search parameter panel to verify the values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The materials were revised separately without write-back, and the cited snippets point to paragraphs of different versions.
- Symptom: The mid-term review materials and the acceptance report versions are not synchronized, and the paragraphs referred back to by the citation superscript are outdated. Cause: The update cadence is not aligned, and old-version documents remain in the associated knowledge base.
- Symptom: The acceptance report lacks signatures or receipts, and items are missing during the item-by-item verification of the handover form. Cause: The signature page was not scanned into the knowledge base, and an empty citation array was mistakenly judged as a retrieval failure.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, check whether the citation array and superscripts can refer back to the original text, and confirm that each citation's original text snippet corresponds to its source identifier; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and that `quoteMaxToken` is only used as a content budget while the number of citations is recorded separately.

Business test: Perform one item-by-item verification according to the handover form, see which record is missing, and focus on checking whether version, connection, and task records are consistent, and whether signatures and receipts are complete.

- In the conversation, open the citation superscript, refer back to the original paragraphs item by item against the source documents, and record fields and dates that do not match.
- Run a test with a question that has no matching materials, check `quoteList` within `responseData`, and confirm that the citation array is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
