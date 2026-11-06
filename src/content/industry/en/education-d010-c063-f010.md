---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Operations
meta_description: Research Misconduct: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses deployment, operations, and application handover in the investigation and handling of academic misconduct reports. The materials include report materials, investigation reports, and expert appraisal opinions. Report materials provide leads and original evidence, investigation reports record the verification process and conclusions, and expert appraisal opinions provide professional judgments. After these three types of materials enter the knowledge base retrieval node, each is returned as a citation snippet and source identifier for subsequent comparison of fields, dates, and signatures. The update cadence advances with the investigation: new versions are produced at each stage of acceptance, verification, appraisal, and conclusion. Field characteristics center on record name, quantity, date, signature, and receipt; the same record must remain consistent across different materials.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing the original text snippet and a source identifier, and the length may be 0. The handover-ready deployment status and operation records are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether fields, dates, and signatures are consistent with the investigation report | Check the record name, quantity, date, signature, and receipt, and compare the two materials item by item |
| Investigation report | Whether the version is synchronized and whether the expert appraisal opinion has a receipt | Open the citation superscript to trace back to the original text, and check the citation array and source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Expert appraisal opinion | Whether the date and signature of the appraisal opinion correspond to the conclusions of the investigation report | Check item by item according to the handover form, and record the citation snippet and source in `quoteList` |
| Deployment status and operation records | Whether version, connection, and task records are consistent | Run a trial query with no matching materials to confirm the array is empty while the pipeline works, and check that `quoteMaxToken` is the content budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two materials are updated separately, and fields and signatures are not checked item by item according to the handover form.
- Symptom: The investigation report version is not synchronized, and the expert appraisal opinion still points to the old conclusion. Cause: After the version update, the knowledge base was not re-associated, and the citation source is disconnected from the original text.
- Symptom: Signatures or receipts are missing, and there is no corresponding record on the handover form. Cause: No trace is left during the material circulation step, and the deployment status and operation records are incomplete.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline works.

Business testing: check once item by item according to the handover form, see which record is missing, and check whether version, connection, and task records are consistent.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the respective values of `quoteMaxToken`.
- Open the citation superscript in the conversation, check against the source document whether each citation can trace back to the original paragraph, and record the source identifier in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
