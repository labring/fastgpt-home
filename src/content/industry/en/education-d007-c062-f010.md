---
title: Citations and Source Traceability for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Review
meta_description: Research Ethics: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the research ethics review scenario, with materials including ethics review applications, informed consent form templates, and risk assessment forms. These materials enter in batches at each node: acceptance, initial review, re-review, and project closure. The application provides basic research information and the responsible person; the consent form template carries the elements of subject notification and signature; the risk assessment form records the risk level and prevention and control measures. Field characteristics center on names, quantities, dates, signatures, and receipts: the same subject or the same project may appear in two materials with different name spellings, inconsistent sample quantities, unsynchronized version dates, or blank signature or receipt fields. After the materials enter this function, each serves as a searchable source, used to trace abnormal entries back to the original record paragraphs, supporting subsequent manual review and handling by the responsible person.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. Even if no content is found, the output chain still completes. The abnormal list and review conclusions are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The project name, sample quantity, date, and signature in the application must correspond item by item with the consent form template and risk assessment form | Open the source document under the citation superscript, check whether the application fields match the names, quantities, dates, and signatures in the other two materials, and record inconsistent entries |
| Informed consent form template | The template version number, signing date, subject signature, and receipt field must be synchronized with the application and risk form | Check against the source identifier whether the template version is the latest, verify whether the signature and receipt are complete, and list missing items in the abnormal list |
| Risk assessment form | The risk level, prevention and control measures, assessment date, and responsible person's signature must match the application and consent form template | Open the search parameter panel to check the values, and compare the dates, signatures, and quantities in the risk form with the other two materials item by item |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; record the array length and the `quoteMaxToken` budget, and do not compare the two for equality |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the application and the consent form template. Cause: The two materials are filled in at different stages, and no field-level comparison was performed.
- Phenomenon: The version of the risk assessment form is not synchronized, and the date is earlier than the application version. Cause: Materials enter in batches, and the old version is still hit by retrieval.
- Phenomenon: The consent form template lacks a signature or the receipt field is blank. Cause: The signing process is not closed-loop, and signatures and receipts were not verified when the materials were archived.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: create an abnormal record, see whether it can be traced to the source material, and check whether the abnormality is supported by original records and whether the reviewer has signed.

- In the node, check whether the selected knowledge bases and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation superscript, check against the source document whether each citation can trace back to the original text paragraph, and record the array length and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
