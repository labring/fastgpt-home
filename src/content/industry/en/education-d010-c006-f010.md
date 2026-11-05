---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Operations
meta_description: Kindergarten Quality: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

The materials for kindergarten operation behavior and quality self-assessment include three types: self-assessment reports, issue lists, and rectification plans. Self-assessment reports are produced by semester or academic year, and their fields include operating conditions, safety and hygiene, care and education, faculty and staff, and internal management; each item has a self-assessment conclusion, date, and signature. The issue list itemizes each issue's description, responsible position, discovery date, and receipt. The rectification plan corresponds to issue numbers and states rectification measures, completion deadlines, acceptance personnel, and signatures. When these three types of materials enter the knowledge base retrieval node, each has a different role: the self-assessment report provides overall conclusions and itemized basis, the issue list provides itemized facts, and the rectification plan provides time and responsibility clues. In terms of update cadence, reports are updated with the assessment cycle, while lists and plans are updated on a rolling basis with rectification progress. Field characteristics are multiple dates, multiple signatures, and multiple numbers; the same matter is prone to inconsistency in name, quantity, and date across the three materials, and when versions are not synchronized or signatures/receipts are missing, item-by-item verification against the handover form will expose the gaps.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The handover-ready deployment status and operation records are then completed by subsequent AI nodes, code nodes, or manual work, comparing fields item by item according to the handover form, writing ledgers, and generating reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Fields, dates, and signatures: whether each item of operating conditions, safety and hygiene, care and education, faculty and staff, and internal management has a self-assessment conclusion, date, and signature, and whether it matches the issue list and rectification plan | Open the citation superscript in the conversation, compare against the source document, and verify whether the cited fragment in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original paragraph of the report; then open the search parameter panel and check the values item by item |
| Issue list | Fields, dates, and signatures: whether the issue description, responsible position, discovery date, and receipt are complete, and whether the name, quantity, and date of the same issue are consistent across the two materials | Run a test with a question that has no matching material, see whether the citation array is empty while the chain continues, and record the number of array entries; then verify whether the hit material in `quoteList` corresponds to the list entry |
| Rectification plan | Fields, dates, and signatures: whether the rectification measures, completion deadline, acceptance personnel, and signature are complete, and whether the version is synchronized with the self-assessment report | Check the selected collections and their vector models in the node, confirm they use the same vector model; then verify item by item according to the handover form to see which record is missing |
| Cited content output | The number of returned entries is consistent with the hit materials, and being empty is also normal; the tokens of the cited text and the number of array entries are recorded separately | Verify `quoteMaxToken` as the cited content budget, and do not compare it for equality with the array length; use a no-match question to confirm that an empty array still goes through |

## Three common errors

- Symptom: the name, quantity, or date of the same issue does not match between the self-assessment report and the issue list. Cause: the two materials were updated separately and were not backfilled under the same number, and only a single copy was checked during handover.
- Symptom: the rectification plan has been revised, but the self-assessment report still cites the old version's conclusion. Cause: the versions were not synchronized, the knowledge base associated with the node was not updated with the materials, and the handover form did not list a version item.
- Symptom: the issue list lacks receipts, and the rectification plan lacks acceptance personnel signatures. Cause: the process was archived before completion, and during handover only field names were checked, not signatures and receipts.

## How to verify the setup

Acceptance of this function: ask a question with original-text basis, and verify whether the citation array and superscript can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain goes through.

Business test: verify once item by item according to the handover form, see which record is missing, and verify that the version, connection, and task records are consistent.

- Check the selected knowledge base collections and their vector models in the node, confirm they use the same vector model, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching material, see whether the citation array is empty while the chain continues, and record the number of array entries; then open the citation superscript and compare against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
