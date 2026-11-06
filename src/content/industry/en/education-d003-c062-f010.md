---
title: Citations and Source Traceability for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Intake
meta_description: Research Ethics: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

In the research ethics review scenario, materials mainly consist of ethics review applications, informed consent form templates, and risk assessment forms. These three often come from different handlers, and their update cadence changes with project initiation, protocol amendments, and annual tracking. The ethics review application serves as the master record, stating the study name, responsible person, review category, and submission date; the informed consent form template serves the participant notification role, containing the version number, signature block, and date; the risk assessment form serves the risk identification role, listing risk items, levels, handling, and signatures. Field characteristics center on names, quantities, dates, versions, and signature receipts. The same record often appears across the three materials with different name spellings, inconsistent participant counts, reversed dates, unsynchronized versions, and missing signatures or receipts. After these materials enter the knowledge base retrieval node, each serves as a citable original source, providing the basis for Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The intake record and the completed follow-up items are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the name, quantity, date, and signature fields are consistent with the informed consent form template and risk assessment form | Open the citation markers and compare them one by one against the source documents, checking the study name, participant count, submission date, and signature block in the application |
| Informed consent form template | Whether the version number, signature block, and date are synchronized with the ethics review application and risk assessment form | Check whether the template version and the application version come from the same source, verify whether the signature block and date are complete, and record missing items as follow-up questions |
| Risk assessment form | Whether the risk items, levels, handling, and signature receipts correspond to the ethics review application | Compare the names and quantities of risk items, confirm that signatures or receipts exist, and list missing signatures as follow-up points |
| Cited content array | The number of returned entries matches the hit materials; empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; record the array length, check the citation text budget with `quoteMaxToken`, check the node return structure with `responseData` (non-streaming module results returned with detailed output enabled), and expand details with `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials were filled in by different handlers, and no field-level comparison was performed.
- Symptom: The informed consent form template version is not synchronized, and the risk assessment form still references the old version. Cause: After the protocol amendment, only one material was updated, and the remaining materials were not advanced with the version.
- Symptom: The risk assessment form lacks a signature or receipt, but the intake record is still treated as complete. Cause: The intake step only checks whether the materials were uploaded, without verifying the signature block and receipt fields.

## How to verify the setup

Acceptance for this feature: ask a question with documentary evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Record the array length, check the citation text budget with `quoteMaxToken`, check the node return structure with `responseData`, and expand details with `quoteList`.

Business test: submit a question missing key information, and see whether it asks a follow-up question before answering.

- In the conversation, open the citation markers and compare them one by one against the source documents to confirm that each citation can point back to the original paragraph.
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and separately record the number of array entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
