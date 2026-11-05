---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Review
meta_description: Research Misconduct: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the category of investigation and handling of academic misconduct reports. Materials include report materials, investigation reports, and expert appraisal opinions. Report materials provide leads and original records, investigation reports carry the investigation process and conclusions, and expert appraisal opinions provide professional judgments. When materials enter the knowledge base retrieval node, each is cited and output as an independent source, used to trace abnormal records. The update rhythm follows case progression: new versions are produced at each stage of acceptance, investigation, appraisal, and review. Field characteristics center on names, quantities, dates, and signatures: the same record may show inconsistent names, mismatched quantities, or contradictory dates across different materials; versions not synchronized lead to mixing of old and new materials; missing signatures or receipts make it impossible to close the loop on review conclusions. These fields, along with dates and signatures, are the basis for subsequent comparison and ledger generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The "abnormal list and review conclusions" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether names, quantities, dates, and signatures are consistent with the investigation report | Open the citation superscript, compare against the original paragraphs of the report materials, and verify fields, dates, and signatures |
| Investigation report | Whether versions are synchronized, and whether names, quantities, and dates in the expert appraisal opinions can correspond | View the citation source identifiers in the conversation, and compare the investigation report and appraisal opinions item by item |
| Expert appraisal opinions | Whether signatures or receipts are complete, and whether cited fragments can point back to the original text | Verify the number of entries in the citation array and the matched materials, and record the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameters are consistent with the knowledge base retrieval section | Open the search parameter panel and check item by item, confirming the values of `quoteMaxToken` and `quoteList` |

## Three common errors

- Phenomenon: The names and quantities of the same record do not match between the report materials and the investigation report. Cause: The two materials were filled in at different stages, no field-level comparison was performed, and only fragments were taken during citation without pointing back to the original text.
- Phenomenon: The investigation report cites an old version of the expert appraisal opinions, and the dates and conclusions are inconsistent. Cause: Versions were not synchronized, the new version did not replace the old version, and retrieval hit the old material.
- Phenomenon: The review conclusions lack signatures or receipts, and the abnormal record cannot be closed. Cause: Signature pages were not collected during material circulation, and an empty citation array did not trigger supplementary entry.

## How to verify the setup

This feature's acceptance: Ask a question with textual evidence, and verify whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Create an abnormal record, see whether it can be traced to the source material, and verify whether the cited fragments are consistent with the original paragraphs.

- Open the citation superscript, compare against the source document, verify whether the cited fragments are consistent with the original paragraphs, and record the number of entries in the array.
- Open the search parameter panel, check the associated knowledge base and vector model item by item, and confirm the values of `quoteMaxToken` and `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
